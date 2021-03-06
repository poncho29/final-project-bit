/* Actividades del servidor: responder tareas, listar usuarios, agregar usuarios, etc. */

/* Requerimos del modulo JSONWEBTOKEN, que ya se instalo mediante el npm y es para crear los token */
const jwt = require('jsonwebtoken');

/* Requerimos del modulo bcryptjs, que ya se instalo mediante el npm y es para encryptar el password */
const bcrypt = require('bcryptjs');

/* Requerimos el modelo del usuario, ya que aca en este archivo voy a estar utilizando la interaccion con la base de datos
    para guardar usuario dentro de la base de datos, para consultar si existe etc etc.
*/
const user = require('../models/user');

exports.rutaInicial = async (req,res) => {

    let usuario = await user.findById(req.userId,{_id:0,name:1,rol:1});

    res.json({name:usuario.name,rol:usuario.rol});
    
};

exports.registrarUsuario = async(req,res) => {
    
    try {
        
        /* Aca recibo independiente cada propiedad que nos enviaron desde el FRONTEND en el cuerpo de la peticion */
        const {name,lastnameone,lastnametwo,email,password} = req.body;
        
        /* Creamos un nuevo usuario, para eso hacemos uso del modelo del usuario,
            recibe un objeto el cual le enviamos tal cual las propiedades que el modelo tiene definidas y
            hacemos uso de un metodo de bcrypt llamado hashSync(password) el cual encripta el dato.
        */
        const newUser = new user({name:name,lastnameone:lastnameone,lastnametwo:lastnametwo,email:email,password:bcrypt.hashSync(password)});

        /* Guardamos el dato en la BD, y este metodo save(), es un metodo asincrono por ende puede tomar un poco de tiempo para poder guardarse,
            y no queremos esperar a que eso termine ya que seria codigo bloqueante y eso no es correcto, entonces por ende le debemos agregar
            la palabra await, por ende el metodo que lo contiene debe llevar el async, 
        */
        const user_exits =  await user.findOne({email:email});
        
        /* Si no encuentra el email, es porque no existe ese usuario y lo podemos registrar */
        if(!user_exits){
            await newUser.save();
        }else{
            return res.status(401).send('El email ya se encuetra registrado');
        }

        /* Luego de guardado en la BD queremos queremos devolverle un Token al usuario (id), y gracias a ese id va a poder seguir haciendo peticiones
            dentro del servidor.
            1. Creamos un token para ello usamos la constante jwt ya declara al comienzo.
            2. jwt tiene un metodo llamado sign(a,b,c) el cual recibe 3 parametros.
                a. dato a guardar --> guardamos el id del nuevo usuario.
                b. palabra secreta --> una palabra secreta que queramos 
                c. opciones ---> cuanto quiero que dure el token, si quiero que tenga una especie de validacion o algo por el estilo. este parametro es opcional
            3. Luego almacenamos ese token en un constante, llamada token.
        */
        const token =  jwt.sign({_id:newUser._id},'secretkey');

        /* Respondo a mi Frontend con un JSON, le damos un nombre a la propiedad y le asignamos el token, ademas de eso tambien le podemos establecer
            el codigo de estado 200,404, etc etc...
        */
        res.status(200).json({token:token,name:newUser.name});

    } catch (error) {
        console.log(error);
        res.status(500).send("Upss... hubo un error en el servidor. "+error);
    }

};

exports.loginUsuario = async(req,res) => {

    try {
        
        /* Aca recibo independiente cada propiedad que nos enviaron desde el FRONTEND en el cuerpo de la peticion */
        const {email,password} = req.body;
        
        /* Buscamos si ese email ya existe en la BD por medio del modelo user, y filtramos por email
            si lo encuentra, quiero que guarde ese email en una constante user_find, el metodo findOne() es un proceso asincrono ya
            que estoy consultando en la base de datos, por ende tendo que usar el async-await
        */
        const user_find =  await user.findOne({email:email});

        /* Si no encuentra el email, termina el proceso y retorna que el email no esta registrado */
        if(!user_find){
            return res.status(401).send('El email no esta registrado');
        }

        /* Si encuentra el email, lo siguiente que voy a validar es el password, usamos el metodo compareSync(pass_front_pura,pass_bd_encryp) 
            del modulo bcrypt, para saber que ambos password encriptados son los mismos.
        */
        if(!bcrypt.compareSync(password,user_find.password)){
            return res.status(401).send('La contrase??a es incorrecta');
        }

        /* Luego devolvermos un Token al usuario (id), y gracias a ese id va a poder seguir haciendo peticiones
            dentro del servidor.
            1. Creamos un token para ello usamos la constante jwt ya declara al comienzo.
            2. jwt tiene un metodo llamado sign(a,b,c) el cual recibe 3 parametros.
                a. dato a guardar --> guardamos el id del nuevo usuario.
                b. palabra secreta --> una palabra secreta que queramos 
                c. opciones ---> cuanto quiero que dure el token, si quiero que tenga una especie de validacion o algo por el estilo. este parametro es opcional
            3. Luego almacenamos ese token en un constante, llamada token.
        */
        const token =  jwt.sign({_id:user_find._id},'secretkey');

        /* Respondo a mi Frontend con un JSON, le damos un nombre a la propiedad y le asignamos el token, ademas de eso tambien le podemos establecer
            el codigo de estado 200,404, etc etc...
        */
        return res.status(200).json({token:token,name:user_find.name});

    } catch (error) {
        console.log(error);
        res.status(500).send("Upss... hubo un error en el servidor. "+error);
    }

};
