// JWT = JSON web token

//=====================IMPORTANCIONES=====================================================

/// IMPORTACION DEL PAQUETE PARA PODER GENERAR EL TOKEN
const jwt = require('jsonwebtoken');

//=====================FIN IMPORTACIONES===================================================

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        //LO QUE UNO QUIERE QUE SE ENVIE POR  EL TOKEN
        // SE RECOMIENDA NO ENVIAR INFORMACION SENSIBLE POR ESTA RUTA
        // EL PAYLOAD CONTIENE TODA LA INFORMACION QUE SE REQUIERA
        const payload = { uid };


        // PROCESS.ENV.JWT_KEY = Contiene la firma del token
        // NOTA: Si se ve compremetida cambiar la firma en .env
        jwt.sign(payload, process.env.JWT_KEY, {
                expiresIn: '24h',
            },
            (err, token) => {
                if (err) {
                    //no se pudo crear el TOKEN!!!!
                    reject('No se pudo generar el JWT');
                } else {
                    resolve(token);
                }
            }

        );
    });


}


module.exports = {
    generarJWT
}