/*
    
    Path: /api/mensajes

*/

//=====================IMPORTANCIONES=====================================================

/// IMPORTACION INDICADOR PARA EXPONER LAS RUTAS
const { Router } = require('express');

/// IMPORTACION DEL CONTROLADOR DEL CHAT
const { obtenerChat } = require('../controllers/mensajes');

// IMPORTACION DEL MIDDLEWARE VALIDAR EL TOKEN
const { validarJWT } = require('../middlewares/validar-jwt');


//=====================FIN IMPORTACIONES===================================================


//CONTANTE DE LAS RUTAS
const router = Router();



// Exponer la ruta crear usuario
router.get('/:de', validarJWT, obtenerChat);




module.exports = router;