/*
conexión con la base de datos
*/
var sequelize = require('./configDB.js')
var Sequelize = require('sequelize')
/*
Se importan los modelos
*/
var TipoUsuario = sequelize.import('./models/tipo_usuario.js'),
	UsuarioEquipo = sequelize.import('./models/usuario_equipo.js'),
	Equipo = sequelize.import('./models/equipo.js'),
	MensajeDestinatario = sequelize.import('./models/mensaje_destinatario.js'),
	Alumno = sequelize.import('./models/alumno.js'),
	Usuario = sequelize.import('./models/usuario.js'),
	Log = sequelize.import('./models/log.js'),
	Respuesta = sequelize.import('./models/respuesta.js'),
	Pregunta = sequelize.import('./models/pregunta.js'),
	TipoEstimulo = sequelize.import('./models/tipo_estimulo.js'),
	Asignacion = sequelize.import('./models/asignacion.js'),
	ThreadAsignacion = sequelize.import('./models/thread_asignacion.js'),
	Thread = sequelize.import('./models/thread.js'),
	AsignacionCodigo = sequelize.import('./models/asignacion_codigo.js'),
	Prueba = sequelize.import('./models/prueba.js'),
	Estado = sequelize.import('./models/estado.js'),
	Forma = sequelize.import('./models/forma.js'),
	Mensaje = sequelize.import('./models/mensaje.js'),
	FormaPregunta = sequelize.import('./models/forma_pregunta.js'),
	Tipo = sequelize.import('./models/tipo.js'),
	Codigo = sequelize.import('./models/codigo.js'),
	Filtro = sequelize.import('./models/filtro.js'),
	Familia = sequelize.import('./models/familia.js');


/*
Asociaciones de las tablas
*/

//asociaciones "asignacion"

Usuario.hasMany(Asignacion, {as: 'asignaciones', foreignKey: 'fk_asignacion_usuario', sourceKey: 'idUsuario'});
Asignacion.belongsTo(Usuario, {as: 'corrector', foreignKey: 'fk_usuario_asignacion', targetKey: 'idUsuario'});

Asignacion.hasMany(Estado, {as: 'estadoActual', foreignKey: 'fk_estado_asignacion', sourceKey: 'idEstado'});
Estado.belongsTo(Asignacion, {as: 'asignacionesEstado', foreignKey: 'fk_asignacion_estado', targetKey: 'idEstado'});
	
Asignacion.hasMany(Respuesta, {as: 'answer', foreignKey: 'fk_respuesta_asignacion', sourceKey: 'idRespuesta'});
Respuesta.belongsTo(Asignacion, {as: 'asignacionAnswer', foreignKey: 'fk_asignacion_respuesta', targetKey: 'idRespuesta'});


//asociaciones "usuario"

Usuario.hasMany(TipoUsuario, {as: 'rol', foreignKey: 'fk_tipo_usuario_usuario', sourceKey: 'idTipoUsuario'});
TipoUsuario.belongsTo(Usuario, {as: 'usuariosRol', foreignKey: 'fk_usuario_tipo_usuario', targetKey: 'idTipoUsuario'});


//asociaciones "usuario_equipo"

UsuarioEquipo.hasMany(Usuario, {as: 'userEquipo', foreignKey: 'fk_usuario_usuario_equipo', sourceKey: 'idUsuario'});
Usuario.belongsTo(UsuarioEquipo, {as: 'teamUser', foreignKey: 'fk_usuario_equipo_usuario', targetKey: 'idUsuario'});

UsuarioEquipo.hasMany(Equipo, {as: 'team', foreignKey: 'fk_equipo_usuario_equipo', sourceKey: 'idEquipo'});
Equipo.belongsTo(UsuarioEquipo, {as: 'teamUE', foreignKey: 'fk_usuario_equipo_equipo', targetKey: 'idEquipo'});


//asociaciones "mensaje_destinatario"

MensajeDestinatario.hasMany(Usuario, {as: 'usuarioDestino', foreignKey: 'fk_usuario_mensaje_destinatario', sourceKey: 'idUsuarioDestino'});
Usuario.belongsTo(MensajeDestinatario, {as: 'userMD', foreignKey: 'fk_mensaje_destinatario_usuario', targetKey: 'idUsuarioDestino'});

MensajeDestinatario.hasMany(Thread, {as: 'MDThread', foreignKey: 'fk_thread_mensaje_destinatario', sourceKey: 'idThread'});
Thread.belongsTo(MensajeDestinatario, {as: 'threadMD', foreignKey: 'fk_mensaje_destinatario_thread', targetKey: 'idThread'});


//asociaciones "log"

Log.hasMany(Usuario, {as: 'logUsuario', foreignKey: 'fk_usuario_log', sourceKey: 'idUsuario'});
Usuario.belongsTo(Log, {as: 'registro', foreignKey: 'fk_log_usuario', targetKey: 'idUsuario'});


//asociaciones "pregunta"

Pregunta.hasMany(Prueba, {as: 'qPrueba', foreignKey: 'fk_prueba_pregunta', sourceKey: 'idPrueba'});
Prueba.belongsTo(Pregunta, {as: 'questions', foreignKey: 'fk_pregunta_prueba', targetKey: 'idPrueba'});

Pregunta.hasMany(Tipo, {as: 'qTipo', foreignKey: 'fk_tipo_pregunta', sourceKey: 'idTipo'});
Tipo.belongsTo(Pregunta, {as: 'questionsTipo', foreignKey: 'fk_pregunta_tipo', targetKey: 'idTipo'});

Pregunta.hasMany(TipoEstimulo, {as: 'qTipoE', foreignKey: 'fk_tipo_estimulo_pregunta', sourceKey: 'idTipoEstimulo'});
TipoEstimulo.belongsTo(Pregunta, {as: 'questionsTipoE', foreignKey: 'fk_pregunta_tipo_estimulo', targetKey: 'idTipoEstimulo'});


//asociaciones "respuesta"

Respuesta.hasMany(Alumno, {as: 'aAlumno', foreignKey: 'fk_alumno_respuesta', sourceKey: 'idAlumno'});
Alumno.belongsTo(Respuesta, {as: 'answerAlumno', foreignKey: 'fk_respuesta_alumno', targetKey: 'idAlumno'});

Respuesta.hasMany(Pregunta, {as: 'aPregunta', foreignKey: 'fk_pregunta_respuesta', sourceKey: 'idPregunta'});
Pregunta.belongsTo(Respuesta, {as: 'answerQ', foreignKey: 'fk_respuesta_pregunta', targetKey: 'idPregunta'});


//asociaciones "forma"

Forma.hasMany(Prueba, {as: 'fPrueba', foreignKey: 'fk_prueba_forma', sourceKey: 'idPrueba'});
Prueba.belongsTo(Forma, {as: 'formaPrueba', foreignKey: 'fk_forma_prueba', targetKey: 'idPrueba'});


//asociaciones "forma_pregunta"

FormaPregunta.hasMany(Forma, {as: 'fpForma', foreignKey: 'fk_forma_forma_pregunta', sourceKey: 'idForma'});
Forma.belongsTo(FormaPregunta, {as: 'fpf', foreignKey: 'fk_forma_pregunta_forma', targetKey: 'idForma'});

FormaPregunta.hasMany(Pregunta, {as: 'fpPregunta', foreignKey: 'fk_pregunta_forma_pregunta', sourceKey: 'idPregunta'});
Pregunta.belongsTo(FormaPregunta, {as: 'fpp', foreignKey: 'fk_forma_pregunta_pregunta', targetKey: 'idPregunta'});


//asociaciones "asignacion_codigo"

AsignacionCodigo.hasMany(Asignacion, {as: 'aCodigo', foreignKey: 'fk_asignacion_asignacion_codigo', sourceKey: 'idAsignacion'});
Asignacion.belongsTo(AsignacionCodigo, {as: 'aca', foreignKey: 'fk_asignacion_codigo_asignacion', targetKey: 'idAsignacion'});

AsignacionCodigo.hasMany(Codigo, {as: 'acCodigo', foreignKey: 'fk_codigo_asignacion_codigo', sourceKey: 'idCodigo'});
Codigo.belongsTo(AsignacionCodigo, {as: 'acc', foreignKey: 'fk_asignacion_codigo_codigo', targetKey: 'idCodigo'});


//asociaciones "filtro"

Filtro.hasMany(Codigo, {as: 'fCodigo', foreignKey: 'fk_codigo_filtro', sourceKey: 'idCodigo'});
Codigo.belongsTo(Filtro, {as: 'fc', foreignKey: 'fk_filtro_codigo', targetKey: 'idCodigo'});

Filtro.hasMany(Familia, {as: 'fFamilia', foreignKey: 'fk_familia_filtro', sourceKey: 'idFamilia'});
Familia.belongsTo(Filtro, {as: 'ff', foreignKey: 'fk_filtro_familia', targetKey: 'idFamilia'});


//asociaciones "mensaje"

Mensaje.hasMany(Thread, {as: 'mensajeThread', foreignKey: 'fk_thread_mensaje', sourceKey: 'idThread'});
Thread.belongsTo(Mensaje, {as: 'mensajeT', foreignKey: 'fk_mensaje_thread', targetKey: 'idThread'});

Mensaje.hasMany(Usuario, {as: 'mensajeUsuario', foreignKey: 'fk_usuario_mensaje', sourceKey: 'idRemitente'});
Usuario.belongsTo(Mensaje, {as: 'mensajeU', foreignKey: 'fk_mensaje_usuario', targetKey: 'idRemitente'});


//asociaciones "thread_asignacion"

ThreadAsignacion.hasMany(Asignacion, {as: 'atAsignacion', foreignKey: 'fk_asignacion_thread_asignacion', sourceKey: 'idAsignacion'});
Asignacion.belongsTo(ThreadAsignacion, {as: 'taa', foreignKey: 'fk_thread_asignacion_asignacion', targetKey: 'idAsignacion'});

ThreadAsignacion.hasMany(Thread, {as: 'ThreadT', foreignKey: 'fk_thread_thread_asignacion', sourceKey: 'idThread'});
Thread.belongsTo(ThreadAsignacion, {as: 'tat', foreignKey: 'fk_thread_asignacion_thread', targetKey: 'idThread'});





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
    },
	pruebaInclude: function(fs){
		Asignacion.findAll({
			include:[{
				model: Usuario,
				as: 'corrector',
				where: {idUsuario: Sequelize.col('asignacion.id_usuario')}
			}]
		}).then(function(d){
			fs.writeFile("./config/carga/deita.json", JSON.stringify(d)); 
		})
	},
	rawIn: function rawInsert(codigo){
		var q = 'INSERT INTO asignacion_codigo(`id_asignacion`,`id_codigo`) VALUES ';

		for (var i = 0; i < codigo.length; i++) {
			if(i>0){
				q+= ',('+1+','+codigo[i].id_codigo+')'	
			}else{
				q+= '('+1+','+codigo[i].id_codigo+')'
			}
		
		}
		q+= ';'

		console.log(q)

		return sequelize.transaction(function(t){
			return sequelize.query(q,{transaction: t}).then(function(){
				return sequelize.query ('UPDATE asignacion SET `id_estado`=2 WHERE `id_asignacion`=1;',{transaction: t});
			})

			}).then(function(){
				console.log('todo guardado')

			}).catch(function(){
				console.log('algun error')
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

