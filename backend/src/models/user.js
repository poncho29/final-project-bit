/* Estructura que voy a estar guardando de los usuarios */

/* Requerimos los metodos Schema y model del modulo mongoose */
const {Schema,model}= require('mongoose');

/* Definir los datos que vamos a estar guardando de los usuarios, tipo dato, si es requerido o no, y con el trim elimina los espacios en blanco
    al cominenzo o final, y el unique es para que no se repitan correos en la base de datos.
*/
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastnameone: {
        type: String,
        required: true,
        trim: true
    },
    lastnametwo: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        trim: true
    }
},
{
    /* Crea automaticamente 2 campos mas  createdAt (fecha de creado) y el updatedAt (fecha de actualizado) */
    timestamps: true
}
);

/* Definimos el modelo, pasamos el nombre del modelo y le pasamos el Schema y ese modelo va a estar basado en ese schema,
    y gracias a esto, vamos a poder empezar a guardar datos, consultar datos, etc
    como voy a utilizar este modelo en otras partes de mi aplicacion lo tengo que exportar, y gracias a esto ya tengo una forma
    de consultar o interactuar con la base de datos.
*/
module.exports = model('user',userSchema);