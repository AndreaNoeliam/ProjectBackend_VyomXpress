const { sequelize } = require('../config/db');
const User = require('./user.model');
const Service = require('./service.model');



const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('🔄 All database models synchronized successfully.');
    } catch (error) {
        console.error('❌ Error synchronizing database models:', error.message);
    }
};

module.exports = {
    User,
    Service,
    syncModels
};