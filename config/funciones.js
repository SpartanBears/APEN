/*
conexión con la base de datos
*/
var sequelize = require('./configDB.js')

/*
Se importa el modelo de la tabla usuario
*/
var Usuario = sequelize.import('./models/usuario.js')
var AsignacionCodigo = sequelize.import('./models/asignacion_codigo.js')
var Asignacion = sequelize.import('./models/asignacion.js')
var Thread = sequelize.import('./models/thread.js')
var ThreadAsignacion = sequelize.import('./models/thread_asignacion.js')



module.exports = {

    /*
    función login, inicia sesion en la aplicación
    */
    login: function (useru, passu, io, sock) {
        Usuario.find({ where: { usuario: useru, contrasena: passu } }).then(function (result) {
            if (result != null) {
                io.to(sock).emit('login exitoso', { nombre: result.dataValues.nombre, apellidop: result.dataValues.apellidoPaterno, apellidom: result.dataValues.apellidMaterno, tipousuario: result.dataValues.idTipoUsuario })
            } else {
                io.to(sock).emit('login fallido', {mensaje: 'datos incorrectos'})
            }
        })
    },

    /*
    funcion asignar codigo a la correción de una pregunta
    */
    guardarCorreccion: function (respuesta, codigo, usuario, io, sock) {

			Asignacion.find({where: {idUsuario: usuario, idRespuesta: respuesta }}).then(function(result){
				AsignacionCodigo.findAll({where:{ idAsignacion: result.dataValues.idAsignacion }}).then(function(data){

						if(data.length>0){
							for(var i = 0; i<codigo.length; i++){
								updateCorreccion(data[i].idAsignacion,codigo[i].id_codigo,data[i].idAsignacionCodigo)
							}
						}else{
							for(var i = 0; i<codigo.length; i++){
								saveCorreccion(result.idAsignacion, codigo[i].id_codigo)
							}					
						}
				})				
			})
        
    },
    registrarDuda: function (respuesta, duda, usuario, io, sock) {
        return sequelize.transaction(function (t) {
			return Thread.create({idRemitente: usuario, mensaje: duda})
            return Asignacion.update({ idEstado: 2 }, { where: { idAsignacion: 1 } }, { transaction: t }).then(function () {
                io.to(sock).emit('Estado Duda', { mensaje: 'ok' })
            }).catch(function (err) {
                io.to(sock).emit('Estado Duda', { mensaje: 'error' })
            })
        })
    }
}


function saveCorreccion(asignacion, codigo){
	return sequelize.transaction(function(t){
		return AsignacionCodigo.create({idAsignacion: asignacion, idCodigo: codigo}, { transaction: t }).then(function(r){
			
		}).then(function(){
			updateEstado(2,asignacion)								
		}).catch(function(err){
											
		})
	})
}

function updateEstado(estado, asignacion){
	return sequelize.transaction(function(t){
		return Asignacion.update({idEstado: estado}, {where: { idAsignacion: asignacion }},{transaction: t}).then(function(){
			
		}).catch(function(err){
			
		})
	})
	
}

function updateCorreccion(asignacion, codigo, codigoAsignacion){
	return sequelize.transaction(function(t){
		return AsignacionCodigo.update({idCodigo: codigo},{where:{idAsignacionCodigo: codigoAsignacion}}, { transaction: t }).then(function(r){
		}).then(function(){
			updateEstado(2, asignacion)								
		}).catch(function(err){
											
		})
	})
}
/*
función que obtiene los datos actualizados de la tabla
*/
function crearCarga(fs, id) {
    /*
    var q = 'SELECT re.id_respuesta, re.titulo, re.descripcion, pr.titulo, pr.enunciado' +
        ' FROM respuesta re JOIN pregunta pr ON re.id_pregunta = pr.id_pregunta JOIN asignacion asi ON asi.id_respuesta = re.id_respuesta' +
        ' WHERE asi.id_usuario=' + id
    */
    //var q = 'SELECT * FROM respuesta re JOIN pregunta pr ON re.id_pregunta = pr.id_pregunta JOIN asignacion asi ON asi.id_respuesta = re.id_respuesta WHERE asi.id_usuario=' + id;
    sequelize.query('SELECT id_respuesta, titulo, descripcion FROM respuesta', { type: sequelize.QueryTypes.SELECT, raw: true }).then(result => {
        fs.writeFile("./config/carga/prueba.json", JSON.stringify(result));    
    })
    /*
    var prueba = { "mensaje": "prueba" }
     
   */
}