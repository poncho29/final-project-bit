const express = require("express");
const cors = require('cors');

const app = express();

/* Requerimos la base de datos, para que se ejecute cuando empiece a correr el servidor */
const conectarDB = require("./config/database");
conectarDB();

/* Este modulo agrega unas cabeceras a la peticion para poder ser pasado a este servidor, es decir, cuando piden datos de un
    servidor externo por cuestiones de seguridad el necesita que yo agregue unas cuantas cabeceras (algo mas de informacion) y para
    yo no tener que agregarlo manualmente, el modulo cors lo hace por nosotros. En otras palabras es decirle a mi servidor que se puede
    comunicar con otros servidores, esto es solo para desarrollo
*/
app.use(cors());

/* Hacemos uso de un metodo de express, el cual nos va a ayudar a convertir los datos que nos envien desde el front,
    a un formato JSON.
*/
app.use(express.json());

/* Importamos el index.js de routes, para empezar hacer uso de las rutas,
    todas las rutas vas a empezar con /api, por ejemplo http://localhost:3000/api/.....
*/
app.use('/api',require('./routes/index'));

app.listen(3000, ()=>{
    console.log("Server on port",3000);
});

