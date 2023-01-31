// importar express
const express = require('express');

// importamos las cors para permitir el acceso a la API
const cors = require('cors');

// importamos la rutas que vienen de routes
const { usersRouter } = require('../routes/users.routes');
const { transferRouter } = require('../routes/transfer.routes');

// importamos la database
const { db } = require('../database/db');
const morgan = require('morgan');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../helpers/appError');

// importamos las rutas que vienen de routes

// creamos la clase
class Server {
  constructor() {
    // definimos la aplicación express y se la asignamos a la propiedad App
    this.app = express();

    // definimos el puerto que tenemos en .env
    this.port = process.env.PORT || 5000;

    // definimos los paths o rutas de nuestra aplicación
    this.paths = {
      users: '/api/v1/users',
      transfers: '/api/v1/transfers',
    };

    // invocamos los middlewares
    this.middlewares();

    // invocamos las rutas
    this.routes();

    // llamos el metodo de conexión a la base de datos
    this.database();
  }

  // middlewares
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }

    // ejecutamos las cors en los middlewares
    this.app.use(cors());
    // ejecutamos express.json para parsear el body de la req
    this.app.use(express.json());
  }

  // rutas
  routes() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.transfers, transferRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });
    this.app.use(globalErrorHandler);
  }

  // conexión a la base de datos
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch((error) => console.log(error));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch((error) => console.log(error));
  }

  // metodo para escuchar las solicitudes del puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

// exportamos el servidor
module.exports = Server;
