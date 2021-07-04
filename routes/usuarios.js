/*

    path: api/usuarios

*/

//=====================IMPORTANCIONES=====================================================

/// IMPORTACION INDICADOR PARA EXPONER LAS RUTAS
const { Router } = require('express');

/// IMPORTACIONES PARA OBTENER USUARIOS
const { getUsuarios } = require('../controllers/usuarios_controller');

// IMPORTACION DEL MIDDLEWARE VALIDAR EL TOKEN
const { validarJWT } = require('../middlewares/validar-jwt');


//=====================FIN IMPORTACIONES===================================================


//CONTANTE DE LAS RUTAS
const router = Router();



// Exponer la ruta crear usuario
router.get('/', validarJWT, getUsuarios);




module.exports = router;