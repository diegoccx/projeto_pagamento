// models/Log.js
const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Log = sequelize.define('Log', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  message: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  level: { 
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'error'
  },
  timestamp: { 
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'logs'
});

module.exports = Log;
