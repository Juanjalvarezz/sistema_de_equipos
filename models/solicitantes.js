const connection = require ("./conexion");
class solicitantesModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `solicitantes`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `solicitantes` WHERE `id_solicitante` = ?', [id], function (error, results, fields) {
                if(results==""){
                    console.log("No existe")
                    resolve("No existe el solicitante")
                }else{
                    let solicitantes=results,ids,cedula,nombreya,fechana,direccion,usuario,clave,telefono
                    solicitantes.forEach(r => { 
                        ids=r.id_solicitante
                        cedula=r.cedula
                        nombreya=r.nombre_y_apellido
                        fechana=r.fecha_de_nacimiento.toLocaleDateString()
                        direccion=r.direccion
                        usuario=r.usuario
                        clave=r.clave
                        telefono=r.telefono

                    });
                    let res="Id: " + ids + " // Cedula: " + cedula + " // Nombre y Apellido: "+ nombreya +" // Fecha de Nacimiento: " + fechana + " // Direccion: " + direccion + " // Usuario: " + usuario + " // Clave: " + clave + " // Telefono: " + telefono
                    resolve(res)
                }
            }); 
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO solicitantes SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                console.log("Agregado")
                resolve("Solicitante Agregado")
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let cedula,nombreya,fechana,direccion,usuario,clave,telefono
            cedula= req.cedula
            nombreya=req.nombre_y_apellido
            fechana= req.fecha_de_nacimiento
            direccion= req.direccion
            usuario= req.usuario
            clave= req.clave
            telefono= req.telefono
            
            var query = connection.query('UPDATE solicitantes SET cedula = ?, nombre_y_apellido = ?, fecha_de_nacimiento = ?, direccion = ?, usuario = ?, clave = ?, telefono = ? WHERE id_solicitante = ?', [cedula, nombreya, fechana, direccion, usuario, clave, telefono, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log("No se ha encontrado")
                    resolve("solicitantes no Existe")
                }else{
                    console.log("Se ha actualizado el solicitante con id "+id)
                    resolve("Solicitante Actualizado")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM solicitantes WHERE id_solicitante = "' + id + '"', function (error, results, fields) {
                if (error) throw error;
                if (results.affectedRows=="0"){
                    console.log("No se ha encontrado el solicitante")
                    resolve("Solicitante no Existe")
                }else{
                    console.log("Se ha eliminado el solicitante con id "+id)
                    resolve("Solicitante Eliminado")
                }
            })
        })
    }
}

module.exports = new solicitantesModelo();
