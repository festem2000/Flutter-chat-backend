//=====================IMPORTANCIONES=====================================================

/// IMPORTACION DEL INDEX  PARA EL PARAMETRO IO
const { io } = require('../index.js');

/// IMPORTACION DEL JWT PARA VALIDACION
const { comprobarJWT } = require('../helpers/jwt.js');

/// IMPORTACION DE LOS METODOS PARA MODIFICAR LA BD
const { usuarioConectado, usuarioDesonectado, grabarMensaje } = require('../controllers/sockets_controller');


//=====================FIN IMPORTACIONES===================================================


// MENSAJES DE SOCKETS
io.on('connection', client => {
    console.log('Cliente conectado');

    console.log(client.handshake.headers['x-token']);

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);


    //Verificar la autenticacion del JWT 
    if (!valido) {
        return client.disconnect();
    }

    /// Continua si el cliente ha sido autenticado
    usuarioConectado(uid);

    // Ingresar al usuario a una sala en particular a traves del UID del usuario al que se la va enviar el mensaje
    client.join(uid);

    ///Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async(payload) => {

        //Grabar Mensaje en la BD
        await grabarMensaje(payload);
        // Emitir una notificacion a un cliente
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    // SE DISPARA CUANDO EL CLIENTE SE DESCONECTA
    client.on('disconnect', () => {
        usuarioDesonectado(uid);
    });

    // //Escuchar un mensaje 
    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje!!!!', payload);

    //     io.emit('mensaje', { admin: 'Nuevo mensaje' });
    // });
});