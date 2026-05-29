const express = require('express');
const { connectDB } = require('./config/db.js');
const { syncModels } = require('./models/index.js'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'VyomXpress Backend API is running' });
});

const startServer = async () => {
    await connectDB();
    await syncModels(); 
    app.listen(PORT, () => {
        console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
};

startServer();