const connection = require ("./conexion");

class equiposModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `equipos`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `equipos` WHERE `id_equipo` = ?', [id], function (error, results, fields) {
                if(results==""){
                    console.log("No existe un equipo con el id:" + id)
                    resolve("No existe un registro con el id que estas buscando")
                }else{
                    let equipo=results,idequipo,serial,nombre,descripcion,fechaad,estatus
                    equipo.forEach(r => { 
                        idequipo=r.id_equipo
                        serial=r.serial
                        nombre=r.nombre
                        descripcion=r.descripcion
                        fechaad=r.fecha_de_adquisicion.toLocaleDateString()
                        estatus=r.estatus
                    });
                    let res="Id: " + idequipo + " || Serial: " + serial + " || Nombre: " + nombre + " || Descripcion: " + descripcion + " || Fecha de Adquisicion: " + fechaad + " || Estatus: " + estatus 
                    resolve(res)
                }
            }); 
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO equipos SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                console.log(query.sql);
                console.log('insert ' + results.affectedRows + ' rows'); 
                console.log("Se ha agregado un nuevo equipo")
                resolve("Equipo Agregado")
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let serial,nombre,descripcion,fechaad,estatus
            serial=req.serial
            nombre=req.nombre
            descripcion=req.descripcion
            fechaad=req.fecha_de_adquisicion
            estatus=req.estatus
            
            var query = connection.query('UPDATE equipos SET serial = ?, nombre = ?, descripcion = ?, fecha_de_adquisicion = ?, estatus = ? WHERE id_equipo = ?', [serial,nombre,descripcion,fechaad,estatus, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado equipo con id "+id+" para actualizar")
                    resolve("Equipo no Existe")
                }else{
                    console.log(query.sql);
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("Se ha actualizado el equipo con id "+id)
                    resolve("Equipos Actualizado")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM equipos WHERE id_equipo = "'+id+'"', function (error, results, fields) {
                if (error) throw error;
                if (results.affectedRows=="0"){
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado equipo con id "+id+" para eliminar")
                    resolve("Equipo no Existe")
                }else{
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("Se ha eliminado el equipo con id "+id)
                    resolve("Equipo Eliminado")
                }
            })
        })
    }
}
module.exports = new equiposModelo();
