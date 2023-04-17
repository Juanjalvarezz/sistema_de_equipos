const connection = require ("./conexion");

class espaciosModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `espacios`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `espacios` WHERE `id_espacio` = ?', [id], function (error, results, fields) {
                if(results==""){
                    console.log("No existe un espacio con el id:" + id)
                    resolve("No existe un registro con el id que estas buscando")
                }else{
                    let espacio=results,id_espacio,nombre,descripcion,direccion,estatus
                    espacio.forEach(r => { 
                        id_espacio=r.id_espacio
                        nombre=r.nombre
                        descripcion=r.descripcion
                        direccion=r.direccion
                        estatus=r.estatus
                    });
                    let res="Id: " + id_espacio + " || Nombre: " + nombre + " || Descripcion: " + descripcion + " || Direccion: " + direccion + " || Estatus: " + estatus 
                    resolve(res)
                }
            }); 
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO espacios SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                console.log(query.sql);
                console.log('insert ' + results.affectedRows + ' rows'); 
                console.log("Se ha agregado un nuevo espacio")
                resolve("Espacio Agregado")
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let nombre,descripcion,direccion,estatus
            nombre=req.nombre
            descripcion=req.descripcion
            direccion=req.direccion
            estatus=req.estatus
            
            var query = connection.query('UPDATE espacios SET nombre = ?, descripcion = ?, direccion = ?, estatus = ? WHERE id_espacio = ?', [nombre,descripcion,direccion,estatus, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado espacio con id "+id+" para actualizar")
                    resolve("Espacio no Existe")
                }else{
                    console.log(query.sql);
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("Se ha actualizado el espacio con id "+id)
                    resolve("Espacios Actualizado")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM espacios WHERE id_espacio = "'+id+'"', function (error, results, fields) {
                if (error) throw error;
                if (results.affectedRows=="0"){
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado espacio con id "+id+" para eliminar")
                    resolve("Espacio no Existe")
                }else{
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("Se ha eliminado el espacio con id "+id)
                    resolve("Espacio Eliminado")
                }
            })
        })
    }
}
module.exports = new espaciosModelo();
