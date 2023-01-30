// importamos sequelize para trabajar con la base de datos
const { Sequelize } = require('sequelize');

// igualamos db a sequelize
const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'academloBank',
  logging: false,
});

// exportamos la configuración
module.exports = { db };
