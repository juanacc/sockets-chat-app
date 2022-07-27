const {Socket} = require('socket.io');

exports.socketController = (socket = new Socket()) => {//socket = new Socket se configura para obtener la ayuda de los metodos de socket. SOLO PARA DESARROLLO, para prod hay que sacarlo
    console.log('Connected client', socket.id);
}