const express = require('express');
const { connectDB } = require('./config/db.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares iniciales
app.use(express.json()); // Para poder recibir datos en formato JSON en las rutas [cite: 11]

// Ruta de prueba (Hola Mundo)
app.get('/', (req, res) => {
    res.json({ message: 'VyomXpress Backend API is running' });
});

// Arrancar el servidor y conectar la base de datos
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
};

startServer();