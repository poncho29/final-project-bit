/* Actividades del servidor:
    responder tareas, listar usuarios, agregar usuarios, etc.
*/

/* Requerimos desde express la funcion de Router, y ejecutamos la funcion y  guardamos ese objeto en router y la exportamos la exportacion
    esta al final, este objeto router me va a servir para poder definir URLS
*/
const {Router} = require('express');
const router = Router();

/* Requerimos el modelo del usuario, ya que aca en este archivo voy a estar utilizando la interaccion con la base de datos
    para guardar usuario dentro de la base de datos, para consultar si existe etc etc.
*/
const user = require('../models/user');

/* Requerimos del modulo JSONWEBTOKEN, que ya se instalo mediante el npm y es para crear los token */
const jwt = require('jsonwebtoken');

/* Requerimos del modulo bcryptjs, que ya se instalo mediante el npm y es para encryptar el password */
const bcrypt = require('bcryptjs');

/* Ruta inicial */
router.get('/',(req,res)=>{
    res.send("Hola desde el servidor");
}); 

/* Ruta registrar usuario */
router.post('/registro',async(req,res)=>{
    
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
    res.status(200).json({token:token});

});

/* Ruta login usuario */
router.post('/login', async(req,res)=>{

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
        return res.status(401).send('La contraseña es incorrecta');
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

});

/* Ruta Tareas - ejemplo de como se enviarian otras cosas - Datos publicos, ya que no necesitan autenticarsen para verlos */
router.get('/tareas',(req,res)=>{

    res.json([
        {
            _id: 1,
            name: 'Tarea uno',
            description: 'Lorem ipsum',
            date: "2021-11-27T03:25:41.931+00:00"
        },
        {
            _id: 2,
            name: 'Tarea dos',
            description: 'Lorem ipsum',
            date: "2021-11-27T03:25:41.931+00:00"
        },
        {
            _id: 3,
            name: 'Tarea tres',
            description: 'Lorem ipsum',
            date: "2021-11-27T03:25:41.931+00:00"
        }
    ]);

});

/* Ruta de prueba - Simular datos privados haciendo uso de la funcion verifyToken declarada en la parte inferior */
router.get('/tareas-privadas', verifyToken, (req,res) => {
    res.json([
        {
            _id: 1,
            name: 'Tarea privada uno',
            description: 'Lorem ipsum',
            date: "2021-11-27T03:25:41.931+00:00"
        },
        {
            _id: 2,
            name: 'Tarea privada dos',
            description: 'Lorem ipsum',
            date: "2021-11-27T03:25:41.931+00:00"
        },
        {
            _id: 3,
            name: 'Tarea privada tres',
            description: 'Lorem ipsum',
            date: "2021-11-27T03:25:41.931+00:00"
        }
    ]);
});

/* Otra Ruta de prueba - simular otras urls privadas haciendo uso de la funcion verifyToken */
router.get('/perfil',verifyToken,(req,res)=>{
    /* envia el id del usuario */
    res.send(req.userId);
});



module.exports = router;


/* Funcion que se va a encargar de verificar en cada ruta el token, si existe el token va a continuar con el proceso tipico de la ruta
    y si no existe el token va a enviar un error va a decirle que no esta autorizado el usuario a solicitar esos datos
*/
function verifyToken(req,res,next){

    /* Si no tienes una cabecera, no puedes obtener los datos de la ruta que estas visitando */
    if(!req.headers.authorization){
        return res.status(401).send("Solicitud rechazada");
    }

    /* Si tiene una cabecera entonces,  vamos a partir esa cabecera y le vamos a quitar el Bearer que viene antes del token
        y el metodo split, nos va a devolver un arreglo particionado por palabras, y como eso trae 2 posiciones 0 y 1 y la 1 es donde esta el token
        entonces la accedemos de una vez
    */
    const token  = req.headers.authorization.split(" ")[1];

    /* Si en esa posicion no viene nada */
    if(token === 'null'){
        return res.status(401).send("Solicitud rechazada");
    }

    /* Si viene algun token, vamos a verificar el token que me estan pasando, haciendo uso de jwt declarado al cominzo */
    const payload = jwt.verify(token,'secretkey');
    
    /* Crear una propiedad al objeto req llamada userId, donde va a guardar el id del usuario */
    req.userId = payload._id;

    /* Una vez creado, continuamos */
    next();

}