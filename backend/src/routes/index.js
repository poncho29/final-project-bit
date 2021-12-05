/* Requerimos desde express la funcion de Router, y ejecutamos la funcion y  guardamos ese objeto en router y la exportamos
    esta al final, este objeto router me va a servir para poder definir URLS
*/
const { Router } = require("express");
const router = Router();
const indexController = require("../controllers/indexController");
const productController = require("../controllers/productController");

router.get("/", indexController.rutaInicial);

/* Ruta registrar usuario */
router.post("/registro", indexController.registrarUsuario);

/* Ruta login usuario */
router.post("/login", indexController.loginUsuario);

/* Ruta Tareas - ejemplo de como se enviarian otras cosas - Datos publicos, ya que no necesitan autenticarsen para verlos */
router.get("/tareas", indexController.tareas);

/* Ruta de prueba - Simular datos privados haciendo uso de la funcion verifyToken declarada en la parte inferior */
router.get("/tareas-privadas", verifyToken, indexController.tareasPrivadas);

/* Otra Ruta de prueba - simular otras urls privadas haciendo uso de la funcion verifyToken */
router.get("/perfil", verifyToken, indexController.perfil);

// Rutas de productos
router.post("/agregar-producto", productController.addProduct);

router.get("/productos", productController.products);

module.exports = router;

/* Requerimos del modulo JSONWEBTOKEN, que ya se instalo mediante el npm y es para crear los token */
const jwt = require("jsonwebtoken");

/* Funcion que se va a encargar de verificar en cada ruta el token, si existe el token va a continuar con el proceso tipico de la ruta
    y si no existe el token va a enviar un error va a decirle que no esta autorizado el usuario a solicitar esos datos
*/
function verifyToken(req, res, next) {
  /* Si no tienes una cabecera, no puedes obtener los datos de la ruta que estas visitando */
  if (!req.headers.authorization) {
    return res.status(401).send("Solicitud rechazada");
  }

  /* Si tiene una cabecera entonces,  vamos a partir esa cabecera y le vamos a quitar el Bearer que viene antes del token
        y el metodo split, nos va a devolver un arreglo particionado por palabras, y como eso trae 2 posiciones 0 y 1 y la 1 es donde esta el token
        entonces la accedemos de una vez
    */
  const token = req.headers.authorization.split(" ")[1];

  /* Si en esa posicion no viene nada */
  if (token === "null") {
    return res.status(401).send("Solicitud rechazada");
  }

  /* Si viene algun token, vamos a verificar el token que me estan pasando, haciendo uso de jwt declarado al cominzo */
  const payload = jwt.verify(token, "secretkey");

  /* Crear una propiedad al objeto req llamada userId, donde va a guardar el id del usuario */
  req.userId = payload._id;

  /* Una vez creado, continuamos */
  next();
}
