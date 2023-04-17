var express = require('express');
var router = express.Router();
var equiposController = require("../controllers/equipos");

/* GET equipos listing. */
router.get('/', function(req, res, next) {
    equiposController.Listar()
    .then((respuesta)=>{
        res.render('equipos', {respuesta: respuesta});
    })  
});
  
/* POST equipos create. */
router.post('/', function(req, res, next) {
    equiposController.Agregar(req.body)
    .then((respuesta)=>{ 
        res.send(respuesta)
    })
});
  
/* GET equipos search. */
router.get("/:id", function(req, res, next) {
    equiposController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* PATCH equipos update. */
router.patch("/:id", function(req, res, next) {
    equiposController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* DELETE equipos delete. */
router.delete("/:id", function(req, res, next) {
    equiposController.Eliminar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

module.exports = router;
  