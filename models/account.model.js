const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Account = sequelize.define('Account', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    current_account: {
      type: DataTypes.STRING,
      allowNull: false
    },
    previous_account: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit_count: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reading_day: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

module.exports = Account;