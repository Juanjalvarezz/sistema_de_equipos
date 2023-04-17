const connection = require ("./conexion");
class reservasModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `reservas`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(fecha){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `reservas` WHERE `fecha_de_inicio` = ? || `fecha_de_culminacion` = ?', [fecha,fecha], function (error, results, fields) {
                if(results==""){
                    resolve("No existe")
                }else{
                    let res=[]
                    let reserva=results,idr,ids,fechai,fechac,motivo,idp,ideq,ides
                    reserva.forEach(r => { 
                        idr=r.id_reserva
                        ids=r.id_solicitante
                        fechai=r.fecha_de_inicio.toLocaleDateString()
                        fechac=r.fecha_de_culminacion.toLocaleDateString()
                        motivo=r.motivo
                        idp=r.id_pt
                        ideq=r.id_equipo
                        ides=r.id_espacio
                        res[r.id_reserva]="Id Reserva: " + idr + " // Id Solicitante: " + ids + " // Fecha de Inicio: "+ fechai +" // Fecha de Culminacion: " + fechac + " // motivo: " + motivo + " // Id Personal Tecnico: " + idp + " // Id Equipo: " + ideq + " // Id Espacio: " + ides + "------"
                    
                    });
                    resolve(res)
                }
            }); 
        })
    }

    mostrar_varias(fecha1,fecha2){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `reservas`', function (error, results, fields){
                let res=[]
                let reserva=results,idr,ids,fechai,fechac,motivo,idp,ideq,ides
                let f1=new Date(String(fecha1+'T04:00:00.000Z'))
                let f2=new Date(String(fecha2+'T04:00:00.000Z'))
                reserva.forEach(r => {
                    if ((r.fecha_de_inicio.toLocaleDateString() >= f1.toLocaleDateString()) && (r.fecha_de_culminacion.toLocaleDateString() <= f2.toLocaleDateString())) { 
                        idr=r.id_reserva
                        ids=r.id_solicitante
                        fechai=r.fecha_de_inicio.toLocaleDateString()
                        fechac=r.fecha_de_culminacion.toLocaleDateString()
                        motivo=r.motivo
                        idp=r.id_pt
                        ideq=r.id_equipo
                        ides=r.id_espacio
                        res[r.id_reserva]="Id Reserva: " + idr + " // Id Solicitante: " + ids + " // Fecha de Inicio: "+ fechai +" // Fecha de Culminacion: " + fechac + " // motivo: " + motivo + " // Id Personal Tecnico: " + idp + " // Id Equipo: " + ideq + " // Id Espacio: " + ides + "------"
                    }
                });
                if(res==""){
                    resolve("No hay reservas en el rango de fechas")
                }else{
                    resolve(res)
                }
            });
        })
    }


    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO reservas SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                resolve("Reserva Agregada")
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let ids,fechai,fechac,motivo,idp,ideq,ides
            ids= req.id_solicitante
            fechai=req.fecha_de_inicio
            fechac= req.fecha_de_culminacion
            motivo= req.motivo
            idp= req.id_pt
            ideq= req.id_equipo
            ides= req.id_espacio
            
            var query = connection.query('UPDATE reservas SET id_solicitante = ?, fecha_de_inicio = ?, fecha_de_culminacion = ?, motivo = ?, id_pt = ?, id_equipo = ?, id_espacio = ? WHERE id_reserva = ?', [ids, fechai, fechac, motivo, idp, ideq, ides, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    resolve("Reserva no Existe")
                }else{
                    resolve("Reserva Actualizada")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM reservas WHERE id_reserva = "' + id + '"', function (error, results, fields) {
                if (error) throw error;
                if (results.affectedRows=="0"){
                    resolve("Reserva no Existe")
                }else{
                    resolve("Reserva Eliminada")
                }
            })
        })
    }
}

module.exports = new reservasModelo();
