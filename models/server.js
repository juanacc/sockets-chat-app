const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const {createServer} = require('http');
const { dbConnection } = require('../database/config');
const {socketController} = require('../sockets/controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app); //servidor de sockets
    this.io = require('socket.io')(this.server);

    this.paths = {
      users: '/api/users',
      auth : '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads',
    }

    // Database connection
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();

    // Sockets
    this.sockets()
  }

  async dbConnection() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Body Parser
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static('public'));

    // Carga de archivos
    // Note that this option available for versions 1.0.0 and newer. 
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true // esto permite que se cree una carpeta si la misma no existe
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.users, require('../routes/users'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
