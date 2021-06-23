/*

    path: api/login

*/

//=====================IMPORTANCIONES=====================================================

/// IMPORTACION INDICADOR PARA EXPONER LAS RUTAS
const { Router } = require('express');

/// IMPORTACION PARA VALIDAR LOS PARAMETROS QUE VIENEN EN LAS RUTAS
const { check } = require('express-validator');

// IMPORTACION DEL CONTROLADOR CREAR UN USUARIO Y ACCEDER AL LOGIN
const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth_controller');


// IMPORTACION DEL MIDDLEWARE VALIDAR EL CAMPO
const { validarCampos } = require('../middlewares/validar-campos');

// IMPORTACION DEL MIDDLEWARE VALIDAR EL TOKEN
const { validarJWT } = require('../middlewares/validar-jwt');


//=====================FIN IMPORTACIONES===================================================


//CONTANTE DE LAS RUTAS
const router = Router();



// Exponer la ruta crear usuario
router.post('/new', [

    check('nombre', 'El campo es obligatorio').not().isEmpty(),
    check('email', 'El campo es obligatorio').isEmail(),
    check('password', 'El campo es obligatorio').not().isEmpty(),
    validarCampos

], crearUsuario);


//Exponer la ruta para acceder al aplicativo LOGIN
router.post('/', [
        check('email', 'El correo es obligatorio o invalido').isEmail(),
        check('password', 'La contrasenia es obligatoria').not().isEmpty(),
    ],
    loginUsuario
);


// Validar JWT
router.get('/renew', validarJWT, renewToken);


module.exports = router;