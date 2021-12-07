/* Requerimos desde express la funcion de Router, y ejecutamos la funcion y  guardamos ese objeto en router y la exportamos
    esta al final, este objeto router me va a servir para poder definir URLS
*/
const {Router} = require('express');
const router = Router();
const userController = require('../controllers/userController');
const productController = require("../controllers/productController");

/* Ruta para devolver el token, nombre y rol de usuario */
router.post('/inicio', verifyToken, userController.rutaInicial);

/* Ruta registrar usuario */
router.post('/registro', userController.registrarUsuario);

/* Ruta login usuario */
router.post('/login', userController.loginUsuario);

// Rutas de productos
router.get("/productos", productController.getProducts);
router.get("/productos/:id", productController.getProduct);
router.post("/productos", productController.addProduct);
router.put("/productos/:id", productController.updateProduct);
router.delete("/productos/:id", productController.deleteProduct);


module.exports = router;


/* Requerimos del modulo JSONWEBTOKEN, que ya se instalo mediante el npm y es para crear los token */
const jwt = require('jsonwebtoken');

/* Funcion que se va a encargar de verificar en cada ruta el token, si existe el token va a continuar con el proceso tipico de la ruta
    y si no existe el token va a enviar un error va a decirle que no esta autorizado el usuario a solicitar esos datos
*/
function verifyToken(req,res,next){

    try {
        
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

    } catch (error) {
        res.status(500).send(error.message);
    }

}