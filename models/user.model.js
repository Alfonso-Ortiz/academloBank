// importamos dataTypes para escoger los tipos de datos que queremos manejar en el modelo
const { DataTypes } = require('sequelize');

// importamos la base de datos
const { db } = require('../database/db');

// definimos como se van a crear en la base de datos
const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'enabled',
  },
});

// exportamos los modelos que se usarán en los controladores
module.exports = User;
