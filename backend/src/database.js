const mongoose = require('mongoose');

//Le pasamos la ruta donde esta la base de datos, si no existe la crea

mongoose.connect('mongodb://localhost/ecommerce')
.then(db => console.log('Base de datos conectada'))
.catch(err => console.log(err));