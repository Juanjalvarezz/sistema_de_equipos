var express = require('express');
var router = express.Router();
var personalController = require("../controllers/personal_tecnico");

/* Listar */
router.get('/', function(req, res, next) {
    personalController.Listar()
    .then((respuesta)=>{
        res.render('personal_tecnicos', {respuesta: respuesta});
    })  
});
  
/* Agregar. */
router.post('/', function(req, res, next) {
    personalController.Agregar(req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});
  
/* Buscar */
router.get("/:id", function(req, res, next) {
    personalController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* Actualizar */
router.patch("/:id", function(req, res, next) {
    personalController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* Eliminar */
router.delete("/:id", function(req, res, next) {
    personalController.Eliminar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

module.exports = router;
