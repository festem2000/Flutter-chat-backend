//=====================IMPORTANCIONES=====================================================


/// IMPORTACION INDICADOR PARA EXPONER LAS RESPUESTA DE LAS RUTAS
const { response } = require('express');

/// IMPORTACION DEL MODELO usuario
const Usuario = require('../models/usuario');

/// IMPORTACION PAQUETE PARA ENCRIPTAR LAS CONSTRASENIAS
const bcrypt = require('bcryptjs');

/// IMPORTACION PAQUETE PARA GENERAR EL JWT
const { generarJWT } = require('../helpers/jwt');

//=====================FIN IMPORTACIONES===================================================


/// Metodo que permite conectar el modelo con la ruta para crear un usaurio
const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Valida en la BD si existe el correo
        const existeEmail = await Usuario.findOne({ email });

        // Retorna y no continua con el codigo si este correo se encuentra registrado
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        // Si todo esta bien se crear el Usuario con sus diferentes atributos
        const usuario = new Usuario(req.body);


        // Encriptar contrasenia
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guarda el usaurio en la BD
        await usuario.save();


        //GENERAR EL JWT
        const token = await generarJWT(usuario.id);

        //  
        res.json({
            ok: true,
            msg: 'Crear usuario!!!!!!!',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Validar que el correo exista en la BD
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Validar que las contrasenias sean iguales
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'La contrasenia no es valida'
            });
        }


        // Si todo va bien se debe de generar el JWT
        const token = await generarJWT(usuarioDB.id);


        //  Respuesta que se envia del login
        res.json({
            ok: true,
            usuarioDB,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Si todo va bien se debe de generar el JWT
    const token = await generarJWT(uid);

    //Buscar el usuario por el id
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token
    });

}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}