const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Status = sequelize.define('Status', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    status_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
  });

module.exports = Status;