const Mensaje = require('../models/mensajes');

const obtenerChat = async(req, res) => {

    const miId = req.uid;

    const mensajeDe = req.params.de;


    const last30 = await Mensaje.find({
            /// CONDICION
            /// SE DEBE DE CUMPLIAR LAS SIGUIENTES DOS CONDICIONES
            /// 1- de sea igual a miID
            /// 2- de sea igual a mensajesDe
            $or: [{ de: miId, para: mensajeDe }, { de: mensajeDe, para: miId }]
        })
        .sort({ createdAt: 'desc' })
        .limit(30);

    res.json({

        ok: true,
        mensajes: last30

    });

}

module.exports = {
    obtenerChat
}