const connection = require ("./conexion");

class trabajosModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `trabajos`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `trabajos` WHERE `id_trabajo` = ?', [id], function (error, results, fields) {
                if(results==""){
                    console.log("No existe un Trabajo con ese id " + id)
                    resolve("No existe un registro con el id que estas buscando")
                }else{
                    let trabajo=results,idtrabajo,fechac,fechai,pt,reserva,equipo,t
                    trabajo.forEach(r => { 
                        idtrabajo=r.id_trabajo
                        fechai=r.fecha_de_inicio.toLocaleDateString()
                        fechac=r.fecha_de_culminacion.toLocaleDateString()
                        pt=r.id_pt
                        reserva=r.id_reserva
                        equipo=r.id_equipo
                        t=r.trabajo
                    });
                    let res="Id: " + idtrabajo + " || Fecha de Inicio: " + fechai + " || Fecha de Culminacion: " + fechac + " || Personal Tecnico: " + pt + " || Reserva: " + reserva + " || Equipo: " + equipo +" || Trabajo: " + t
                    resolve(res)
                }
            }); 
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO trabajos SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                console.log(query.sql);
                console.log('insert ' + results.affectedRows + ' rows'); 
                console.log("Se ha agregado un nuevo registro")
                resolve("Registro Agregado")
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let fechac,fechai,pt,reserva,equipo,t
            fechai= req.fecha_de_inicio
            fechac= req.fecha_de_culminacion
            pt= req.id_pt
            reserva= req.id_reserva
            equipo= req.id_equipo
            t= req.trabajo
            
            var query = connection.query('UPDATE trabajos SET fecha_de_inicio = ?, fecha_de_culminacion = ?, id_pt = ?, id_reserva = ?, id_equipo = ?, trabajo = ? WHERE id_trabajo = ?', [fechai,fechac,pt,reserva,equipo,t, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado registro con id "+id+" para actualizar")
                    resolve("Registro no Existe")
                }else{
                    console.log(query.sql);
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("Se ha actualizado el registro con id "+id)
                    resolve("Registro Actualizado")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM trabajos WHERE id_trabajo = "'+id+'"', function (error, results, fields) {
                if (error) throw error;
                if (results.affectedRows=="0"){
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado registro con id "+id+" para eliminar")
                    resolve("Registro no Existe")
                }else{
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("Se ha eliminado el registro con id "+id)
                    resolve("Registro Eliminado")
                }
            })
        })
    }
}

module.exports = new trabajosModelo();
