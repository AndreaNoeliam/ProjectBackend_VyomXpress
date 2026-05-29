const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// User Registration (Signup)
const signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Validate that the required fields are present
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        // 1. Validate duplicates
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken.' });
        }

        // 2. Create the user (The model hook handles hashing with bcrypt)
        const newUser = await User.create({ username, password });

        // 3. Generate JWT token to be returned after registration
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            message: 'User registered successfully.',
            token
        });

    } catch (error) {
        next(error); 
    }
};

// Login
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        // 1. Check if the user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // 2. Verify the password using bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // 3. Generate and return the JWT token 
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: 'Login successful.',
            token
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    signup,
    login
};