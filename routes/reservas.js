var express = require('express');
var router = express.Router();
var reservasController = require("../controllers/reservas");

router.get('/', function(req, res, next) {
    reservasController.Listar()
    .then((respuesta)=>{
        res.render('reservas', {respuesta: respuesta});
    })  
});

router.post('/', function(req, res, next) {
    reservasController.Agregar(req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

router.get('/:fecha', function(req, res, next){
    reservasController.Buscar(req.params.fecha)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

router.get('/:fecha1/:fecha2', function(req, res, next){
    reservasController.mostrar_varias(req.params.fecha1,req.params.fecha2)
    .then((respuesta)=>{
        res.send(respuesta)
    })

})

router.patch("/:id", function(req, res, next) {
    reservasController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

router.delete("/:id", function(req, res, next) {
    reservasController.Eliminar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

module.exports = router;
