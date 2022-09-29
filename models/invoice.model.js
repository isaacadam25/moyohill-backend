const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Invoice = sequelize.define("Invoice", {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  invoice_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reading_day: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  unit_count: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPaid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  paid_amount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Invoice;