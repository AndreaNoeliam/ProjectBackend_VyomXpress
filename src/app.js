const express = require('express');
const { connectDB } = require('./config/db.js');
const { syncModels } = require('./models/index.js');
const authRouter = require('./routes/auth.router.js'); 
const errorHandler = require('./middlewares/error.middleware.js'); 
const { startBot } = require('./bot/index.js');
const deployCommands = require('./bot/deploy-commands.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/auth', authRouter); 

app.get('/', (req, res) => {
    res.json({ message: 'VyomXpress Backend API is running' });
});

app.use(errorHandler);

const startServer = async () => {
    await connectDB();
    await syncModels();

    await deployCommands(); 
    await startBot();
    
    app.listen(PORT, () => {
        console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
};

startServer();