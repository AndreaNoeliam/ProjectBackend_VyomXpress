const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/auth.controller');
const { authLimiter } = require('../middlewares/rateLimit.middleware'); 
const { verifyToken } = require('../middlewares/auth.middleware'); 

router.post('/signup', authLimiter, signup); 
router.post('/login', authLimiter, login);   
router.get('/me', verifyToken, getMe); 

module.exports = router;