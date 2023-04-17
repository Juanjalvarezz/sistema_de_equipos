var express = require('express');
var router = express.Router();
var usuariosController = require("../controllers/usuarios");

/* listar. */
router.get('/', function(req, res, next) {
  res.render('home', {});
});  

/* Login. */
router.post('/login', function(req, res, next) {
  usuariosController.Login(req.body)
  .then((respuesta)=>{ 
    res.send(respuesta)
  })
});  

/* Registro */
router.post('/registro', function(req, res, next) {
  usuariosController.Registro(req.body)
  .then((respuesta)=>{ 
    res.send(respuesta)
  })
});

module.exports = router;
