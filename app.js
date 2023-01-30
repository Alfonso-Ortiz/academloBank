// importamos para manejar variables de entorno
require('dotenv').config();

// importamos el modelo, el servidor
const Server = require('./models/server');

// instanciamos o igualamos el servidor a una variable
const server = new Server();

// pongo a esucuchar al servidor
server.listen();
