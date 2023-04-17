const connection = require ("./conexion");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class usuariostesModelo {

  Login(req){
    let username= req.username, password= req.password
    
    return new Promise ((resolve,reject)=>{
      connection.query('SELECT password FROM  `usuarios` WHERE `username` = ?', [username], function (error, results, fields) {
        if (error) throw error;
        //comparando
        var hash = results[0].password
        bcrypt.compare(password, hash, function(err, result) {
          console.log(result)
          //iniciando
          if (result) {
            jwt.sign ({usuario : username}, process.env.secreto, {}, function(err, token) {
            console.log (token);
              console.log (err);
              console.log ('Usuario y contrasena correctos');
              resolve(token);
            })
          } else {
            resolve('Usuario o contrasena incorrectos')
          }
        });
      });
    });
  }

  Registro(req){
    let nombre,username,password,rol
    nombre = req.nombre_y_apellido
    username=req.username
    password= req.password
    rol=req.rol

    return new Promise ((resolve,reject)=>{
      //encryptando
      var saltRounds = 5
      bcrypt.hash(password, saltRounds, function(err, hash) {
        connection.query('INSERT INTO `usuarios`(`nombre_y_apellido`, `username`, `password`, `rol`) VALUES ("'+nombre+'","'+username+'","'+hash+'","'+rol+'")', function (error, results, fields) {
          if (error) throw error;
          jwt.sign ({roles: ["User"], usuario : username }, process.env.secreto , {}, function(err, token) {
            console.log (token);
          })
          resolve("El usuario ha sido creado");
        });
      });
    });  
  }

  Listar(req){
    return new Promise ((resolve,reject)=>{
      var payload = jwt.decode(req.headers.authorization.replace('Bearer ', ''))
      
      if (payload.roles.includes("Root")) {
        console.log('Paso a Root...')
        connection.query('SELECT * FROM  `usuarios`', function (error, results, fields) {
          if (error) throw error;
          resolve(results)
        });

      }else if (payload.roles.includes("Admin")) {
        console.log('Paso a Admin...')
        connection.query('SELECT * FROM  `usuarios` WHERE `rol` = "User"', function (error, results, fields) {
          if (error) throw error;
          resolve(results)
        });

      } else if (payload.roles.includes("User")){
        console.log('Paso a User...')
        let username=payload.usuario
        connection.query('SELECT * FROM  `usuarios` WHERE `username` = ?', [username], function (error, results, fields) {
          if (error) throw error;
          resolve(results)
        });

      } else {
        resolve("No estas autorizado")
      }

    });
  }
  
}

module.exports = new usuariostesModelo();
