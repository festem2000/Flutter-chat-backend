//=====================IMPORTANCIONES=====================================================

/// IMPORTACION INDICADOR PARA EXPONER LAS RUTAS
const { response } = require("express");

/// IMPORTACION DEL MODELO usuario
const Usuario = require('../models/usuario');

//=====================FIN IMPORTACIONES===================================================


/// Obtener todos los usuarios excepto el usuario que se esta conectando
const getUsuarios = async(req, res = response) => {

    // Permitir hacer la paginacion de los usuarios
    const desde = Number(req.query.desde)

    const usuarios = await Usuario
        //  $ne permite hacer una validacion para no retornan el usuario actual
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .skip(desde)
        .limit(2);

    res.json({
        'ok': true,
        usuarios,
        desde
    });
}



module.exports = {
    getUsuarios
}