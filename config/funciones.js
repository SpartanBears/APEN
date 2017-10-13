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
        return sequelize.transaction(function (t) {
			return Asignacion.find({where: {idUsuario: usuario, idRespuesta: respuesta }}).then(function(result){
				if(result==null){
					return AsignacionCodigo.create({idAsignacion: result.dataValues.idAsignacion, idCodigo: codigo},{transaction: t}).then(function(data){
						return Asignacion.update({idEstado: 2 }, {where: { idAsignacion: data.dataValues.idAsignacion}}, { transaction: t }).then(function(){
							io.to(sock).emit('Resultado Correccion',{ mensaje: 'ok' })
						}).catch(function(err){
							io.to(sock).emit('Resultado Correccion',{ mensaje: 'error' })
						})
					}).catch(function(err){
						io.to(sock).emit('Resultado Correccion',{ mensaje: 'error' })
					})
				}else{
					return AsignacionCodigo.update({idCodigo: codigo},{where:{idAsignacion: result.dataValues.idAsignacion}},{ transaction: t }).then(function(){
						io.to(sock).emit('Resultado Correccion', { mensaje: 'ok' })
					}).catch(function(err){
						io.to(sock).emit('Resultado Correccion', { mensaje: 'error' })
					})
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