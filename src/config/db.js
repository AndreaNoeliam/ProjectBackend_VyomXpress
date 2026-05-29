const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false, // Para que no llene la consola de consultas SQL SQL
        define: {
            timestamps: true // Nos crea automáticamente las columnas createdAt y updatedAt
        }
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('📦 Database connected successfully.');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1); // Corta la ejecución de la app si no se puede conectar
    }
};

module.exports = { sequelize, connectDB };