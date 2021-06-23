const { io } = require('../index.js');

// MENSAJES DE SOCKETS
io.on('connection', client => {
    console.log('Cliente conectado');
    // SE DISPARA CUANDO EL CLIENTE SE DESCONECTA
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // //Escuchar un mensaje 
    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje!!!!', payload);

    //     io.emit('mensaje', { admin: 'Nuevo mensaje' });
    // });
});