//=====================IMPORTANCIONES=====================================================

// IMPORTACION DEL MODELO DEL USUARIO
const Usuario = require('../models/usuario');

// IMPORTACION DEL MODELO DEL MENSAJE
const Mensaje = require('../models/mensajes');

//=====================FIN IMPORTACIONES===================================================



/// Modificar en la base de datos que el usuario se ha conectado
const usuarioConectado = async(uid = '') => {

    const usuario = await Usuario.findById(uid);

    usuario.online = true;

    await usuario.save();

    return usuario;

}

/// Modificar en la base de datos que el usuario se ha desconectado
const usuarioDesonectado = async(uid = '') => {

    const usuario = await Usuario.findById(uid);

    usuario.online = false;

    await usuario.save();

    return usuario;

}


const grabarMensaje = async(payload) => {

    try {

        /*
            {
                de: '',
                para:'',
                mensaje: ''
            }
        */
        const mensaje = new Mensaje(payload);
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }

}

module.exports = {
    usuarioConectado,
    usuarioDesonectado,
    grabarMensaje
}