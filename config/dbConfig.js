const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('invoice_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;