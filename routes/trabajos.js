var express = require('express');
var router = express.Router();
var trabajosController = require("../controllers/trabajos");

/* GET trabajos listing. */
router.get('/', function(req, res, next) {
    trabajosController.Listar()
    .then((respuesta)=>{
        res.render('trabajos', {respuesta: respuesta});
    })  
});
  
/* POST trabajos create. */
router.post('/', function(req, res, next) {
    trabajosController.Agregar(req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});
  
/* GET trabajos search. */
router.get("/:id", function(req, res, next) {
    trabajosController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* PATCH trabajos update. */
router.patch("/:id", function(req, res, next) {
    trabajosController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* DELETE trabajos delete. */
router.delete("/:id", function(req, res, next) {
    trabajosController.Eliminar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

module.exports = router;
  
