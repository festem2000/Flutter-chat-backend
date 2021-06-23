//=====================IMPORTANCIONES=====================================================


/// IMPORTACION PARA VALIDAR LOS PARAMETROS QUE VIENEN EN LAS RUTAS
const { validationResult } = require('express-validator');

//=====================FIN IMPORTACIONES===================================================


///Validar los campos que vienen de las rutas
// El parametro next es el que va a validar si puede pasar a validar el siguiente middleware
const validarCampos = (req, res, next) => {

    //Objeto para validar los campos
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();

}


module.exports = {
    validarCampos
}