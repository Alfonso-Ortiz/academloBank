// importamos dataTypes para escoger los tipos de datos que queremos manejar en el modelo
const { DataTypes } = require('sequelize');

// importamos la base de datos
const { db } = require('../database/db');

// definimos como se van a crear en la base de datos
const Transfer = db.define('transfer', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    // defaultValue: 0,
  },
  senderUserAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reciverUserAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// exportamos los modelos que se usarán en los controladores
module.exports = Transfer;
