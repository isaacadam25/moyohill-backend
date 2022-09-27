const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Transaction = sequelize.define('Transaction', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    reference_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

module.exports = Transaction;