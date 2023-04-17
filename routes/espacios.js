var express = require('express');
var router = express.Router();
var espaciosController = require("../controllers/espacios");

/* GET equipos listing. */
router.get('/', function(req, res, next) {
    espaciosController.Listar()
    .then((respuesta)=>{
        res.render('espacios', {respuesta: respuesta});
    })  
});
  
/* POST equipos create. */
router.post('/', function(req, res, next) {
    espaciosController.Agregar(req.body)
    .then((respuesta)=>{ 
        res.send(respuesta)
    })
});
  
/* GET equipos search. */
router.get("/:id", function(req, res, next) {
    espaciosController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* PATCH equipos update. */
router.patch("/:id", function(req, res, next) {
    espaciosController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* DELETE equipos delete. */
router.delete("/:id", function(req, res, next) {
    espaciosController.Eliminar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

module.exports = router;
  