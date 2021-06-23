//=====================IMPORTANCIONES=====================================================

/// IMPORTACION DEL PAQUETE PARA PODER GENERAR EL TOKEN
const jwt = require('jsonwebtoken');


/// IMPORTACION INDICADOR PARA EXPONER LAS RESPUESTA DE LAS RUTAS
const { response } = require('express');

//=====================FIN IMPORTACIONES===================================================


const validarJWT = (req, res, next) => {

    //LEER TOKEN
    const token = req.header('x-token');

    if (!token) {
        // 401 = not foraices
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY)

        req.uid = uid;

        next();

    } catch (e) {
        // 401 = not foraices
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }


}


module.exports = {
    validarJWT
}