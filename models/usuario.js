//=====================IMPORTANCIONES=====================================================

/// IMPORTA 
/// - EL SCHEMA QUE PERMITE CREAR EL MODELO
/// - EL MODEL QUE PERMITE EXPONER EL MODELO 
const { Schema, model } = require('mongoose');


//=====================FIN IMPORTACIONES===================================================


const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    online: {
        type: Boolean,
        default: false,

    }
});

UsuarioSchema.method('toJSON', function() {
    //INSTANCIA DEL OBJECTO QUE SE ESTA USANDO
    // El object es un objeto que contiene los demas parametros del Usuario
    // Lo que se realizo es extraer la informacion que no se quiere enviar como 
    //       => _v (Es un parametro propio de BD)
    //       => _id Se le quiere cambiar el nombre para que se mire diferente al momento de enviar la informacion
    //       => ... Los tres puntos es para indicar que tome el resto de parametros y los guarde en un objeto
    const { __v, _id, password, ...object } = this.toObject();

    // Se crea como una nueva propiedad dentro del JSON y se enviar el valor del id
    object.uid = _id;
    return object;
});


module.exports = model('Usuario', UsuarioSchema);