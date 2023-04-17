const connection = require ("./conexion");
class personalModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `personal_tecnico`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `personal_tecnico` WHERE `id_pt` = ?', [id], function (error, results, fields) {
                if(results==""){
                    console.log("No existe")
                    resolve("No existe el personal tecnico")
                }else{
                    let pt=results,id,cedula,nombreya,cargo,usuario,clave,especialidad
                    pt.forEach(r => { 
                        id=r.id_pt
                        cedula=r.cedula
                        nombreya=r.nombre_y_apellido
                        cargo=r.cargo
                        usuario=r.usuario
                        clave=r.clave
                        especialidad=r.especialidad
                    });
                    let res="Id: " + id + " // Cedula: " + cedula + " // Nombre y Apellido: "+ nombreya +" // Cargo: " + cargo + " // Usuario: " + usuario + " // Clave: " + clave + " // Especialidad: " + especialidad
                    resolve(res)
                }
            }); 
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO personal_tecnico SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                console.log("Agregado")
                resolve("Personal tecnico Agregado")
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let cedula,nombreya,cargo,usuario,clave,especialidad
            cedula= req.cedula
            nombreya=req.nombre_y_apellido
            cargo= req.cargo
            usuario= req.usuario
            clave= req.clave
            especialidad= req.especialidad
            
            var query = connection.query('UPDATE personal_tecnico SET cedula = ?, nombre_y_apellido = ?, cargo = ?, usuario = ?, clave = ?, especialidad = ? WHERE id_pt = ?', [cedula, nombreya, cargo, usuario, clave, especialidad, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log("No se ha encontrado")
                    resolve("personal tecnico no Existe")
                }else{
                    console.log("Se ha actualizado el personal tecnico con id "+id)
                    resolve("Personal tecnico Actualizado")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM personal_tecnico WHERE id_pt = "' + id + '"', function (error, results, fields) {
                if (error) throw error;
                if (results.affectedRows=="0"){
                    console.log("No se ha encontrado el personal tecnico")
                    resolve("Personal tecnico no Existe")
                }else{
                    console.log("Se ha eliminado el personal tecnico con id "+id)
                    resolve("Personal tecnico Eliminado")
                }
            })
        })
    }
}

module.exports = new personalModelo();
