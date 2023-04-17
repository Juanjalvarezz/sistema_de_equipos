var express = require('express');
var router = express.Router();
var solicitantesController = require("../controllers/solicitantes");

/* Listar */
router.get('/', function(req, res, next) {
    solicitantesController.Listar()
    .then((respuesta)=>{
        res.render('solicitantes', {respuesta: respuesta});
    })  
});
  
/* Agregar. */
router.post('/', function(req, res, next) {
    solicitantesController.Agregar(req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});
  
/* Buscar */
router.get("/:id", function(req, res, next) {
    solicitantesController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* Actualizar */
router.patch("/:id", function(req, res, next) {
    solicitantesController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* Eliminar */
router.delete("/:id", function(req, res, next) {
    solicitantesController.Eliminar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

module.exports = router;
