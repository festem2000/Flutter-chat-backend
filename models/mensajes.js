//=====================IMPORTANCIONES=====================================================

/// IMPORTA 
/// - EL SCHEMA QUE PERMITE CREAR EL MODELO
/// - EL MODEL QUE PERMITE EXPONER EL MODELO 
const { Schema, model } = require('mongoose');


//=====================FIN IMPORTACIONES===================================================


const MensajeSchema = Schema({

    de: {
        //OBJETO QUE VIENE DE BD
        type: Schema.Types.ObjectId,
        // COLLECCION A LA CUAL VA DIRIGIDO
        ref: 'Usuario',
        required: true
    },
    para: {
        //OBJETO QUE VIENE DE BD
        type: Schema.Types.ObjectId,
        // COLLECCION A LA CUAL VA DIRIGIDO
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
});

MensajeSchema.method('toJSON', function() {
    //INSTANCIA DEL OBJECTO QUE SE ESTA USANDO
    // El object es un objeto que contiene los demas parametros del Usuario
    // Lo que se realizo es extraer la informacion que no se quiere enviar como 
    //       => _v (Es un parametro propio de BD)
    //       => _id Se le quiere cambiar el nombre para que se mire diferente al momento de enviar la informacion
    //       => ... Los tres puntos es para indicar que tome el resto de parametros y los guarde en un objeto
    const { __v, _id, ...object } = this.toObject();
    return object;
});


module.exports = model('Mensaje', MensajeSchema);