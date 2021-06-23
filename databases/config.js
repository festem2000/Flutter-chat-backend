// IMPORTACION DEL PAQUETE MONGO
const mongoose = require('mongoose');


/// CONEXION A LA BASE DE DATOS CONFIGURACION
const dbConnection = async() => {

    try {
        // CONEXION A LA BD
        await mongoose.connect(process.env.DB_CNN, {
            //CONFIGURACIONES DE LA CONEXION A LA BD
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB ONLINE');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Comuniquese con soporte tecnico');
    }


}


/// Exportar los metodos
module.exports = {
    dbConnection
}