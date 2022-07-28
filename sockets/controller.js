const {Socket} = require('socket.io');
const {validateJWT} = require('../helpers');
const {ChatMessage} = require('../models');

const chatMessage = new ChatMessage(); //se ejecuta solo una vez cuando el servidor se levanta

//io es todo el servidor de socket
exports.socketController = async (socket = new Socket(), io) => {//socket = new Socket se configura para obtener la ayuda de los metodos de socket. SOLO PARA DESARROLLO, para prod hay que sacarlo
    //console.log('Connected client', socket.handshake.headers['x-token']);
    const user = await validateJWT(socket.handshake.headers['x-token']);
    if(!user)
        return socket.disconnect();
    console.log(`${user.name} connected`);
    // io.emit es lo mismo que hacer socket.emit y luego socket.broadcast
    // socket.emit--> emite al socket actual
    // socket.broadcast--> emite a todos menos el actual
    // io.emit --> emite a todos :)
    chatMessage.connectUser(user);
    io.emit('server-active-users', chatMessage.usersArr);
    socket.emit('server-receive-message', chatMessage.last10Messages);

    //Conectar usuario a una sala especial. Envio de mensajes privados
    // Tambien se podria enviar un mensaje privado a un determinado socket id, pero esto es muy volatil ya que si un usuario esta conectado y recarga el browser, el socket id cambia
    // socket.to(socket.id) --> no es recomendable ya que si recargo el browser el socket id cambia
    socket.join(user.id);

    // limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        chatMessage.disconnectUser(user.id);
        io.emit('server-active-users', chatMessage.usersArr);
    })

    socket.on('client-send-message', ({uid, message}) => {
        if(uid){ //si viene el uid significa que es una mensaje privado
            socket.to(uid).emit('server-private-message', {from: user.name, message});
        }
        else{
            chatMessage.sendMessage(user.id, user.name, message);
            io.emit('server-receive-message', chatMessage.last10Messages)
        }
    })
}