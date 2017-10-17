/*
conexión con la base de datos
*/
var sequelize = require('./configDB.js')
var Sequelize = require('sequelize')
/*
Se importan los modelos
*/
var TipoUsuario = sequelize.import('./models/tipo_usuario'),
	UsuarioEquipo = sequelize.import('./models/usuario_equipo'),
	Equipo = sequelize.import('./models/equipo'),
	MensajeDestinatario = sequelize.import('./models/mensaje_destinatario'),
	Alumno = sequelize.import('./models/alumno'),
	Usuario = sequelize.import('./models/usuario.js'),
	Log = sequelize.import('./models/log'),
	Respuesta = sequelize.import('./models/respuesta.js'),
	Pregunta = sequelize.import('./models/pregunta'),
	TipoEstimulo = sequelize.import('./models/tipo_estimulo'),
	Asignacion = sequelize.import('./models/asignacion.js'),
	ThreadAsignacion = sequelize.import('./models/thread_asignacion.js'),
	Thread = sequelize.import('./models/thread.js'),
	AsignacionCodigo = sequelize.import('./models/asignacion_codigo.js'),
	Prueba = sequelize.import('./models/prueba'),
	Estado = sequelize.import('./models/estado'),
	Forma = sequelize.import('./models/forma'),
	Mensaje = sequelize.import('./models/mensaje'),
	FormaPregunta = sequelize.import('./models/forma_pregunta'),
	Tipo = sequelize.import('./models/tipo'),
	Codigo = sequelize.import('./models/codigo'),
	Filtro = sequelize.import('./models/filtro'),
	Familia = sequelize.import('./models/familia')


/*
Asociaciones de las tablas
*/

//asociaciones "asignacion"

Asignacion.hasMany(Usuario, {as: 'asignaciones', foreignKey: 'id_usuario', sourceKey: 'id_usuario'});
Usuario.belongsTo(Asignacion, {as: 'corrector', foreignKey: 'id_usuario', targetKey: 'id_usuario'});

Asignacion.hasMany(Estado, {as: 'estadoActual', foreignKey: 'id_estado', sourceKey: 'id_estado'});
Estado.belongsTo(Asignacion, {as: 'asignacionesEstado', foreignKey: 'id_estado', targetKey: 'id_estado'});
	
Asignacion.hasMany(Respuesta, {as: 'answer', foreignKey: 'id_respuesta', sourceKey: 'id_respuesta'});
Respuesta.belongsTo(Asignacion, {as: 'asignacionAnswer', foreignKey: 'id_respuesta', targetKey: 'id_respuesta'});


//asociaciones "usuario"

Usuario.hasMany(TipoUsuario, {as: 'rol', foreignKey: 'id_tipo_usuario', sourceKey: 'id_tipo_usuario'});
TipoUsuario.belongsTo(Usuario, {as: 'usuariosRol', foreignKey: 'id_tipo_usuario', targetKey: 'id_tipo_usuario'});


//asociaciones "usuario_equipo"

UsuarioEquipo.hasMany(Usuario, {as: 'userEquipo', foreignKey: 'id_usuario', sourceKey: 'id_usuario'});
Usuario.belongsTo(UsuarioEquipo, {as: 'teamUser', foreignKey: 'id_usuario', targetKey: 'id_usuario'});

UsuarioEquipo.hasMany(Equipo, {as: 'team', foreignKey: 'id_equipo', sourceKey: 'id_equipo'});
Equipo.belongsTo(UsuarioEquipo, {as: 'teamUE', foreignKey: 'id_equipo', targetKey: 'id_equipo'});


//asociaciones "mensaje_destinatario"

MensajeDestinatario.hasMany(Usuario, {as: 'usuarioDestino', foreignKey: 'id_usuario_destino', sourceKey: 'id_usuario'});
Usuario.belongsTo(MensajeDestinatario, {as: 'userMD', foreignKey: 'id_usuario', targetKey: 'id_usuario_destino'});

MensajeDestinatario.hasMany(Thread, {as: 'MDThread', foreignKey: 'id_thread', sourceKey: 'id_thread'});
Thread.belongsTo(MensajeDestinatario, {as: 'threadMD', foreignKey: 'id_thread', targetKey: 'id_thread'});


//asociaciones "log"

Log.hasMany(Usuario, {as: 'logUsuario', foreignKey: 'id_usuario', sourceKey: 'id_usuario'});
Usuario.belongsTo(Log, {as: 'registro', foreignKey: 'id_usuario', targetKey: 'id_usuario'});


//asociaciones "pregunta"

Pregunta.hasMany(Prueba, {as: 'qPrueba', foreignKey: 'id_prueba', sourceKey: 'id_prueba'});
Prueba.belongsTo(Pregunta, {as: 'questions', foreignKey: 'id_prueba', targetKey: 'id_prueba'});

Pregunta.hasMany(Tipo, {as: 'qTipo', foreignKey: 'id_tipo', sourceKey: 'id_tipo'});
Tipo.belongsTo(Pregunta, {as: 'questionsTipo', foreignKey: 'id_tipo', targetKey: 'id_tipo'});

Pregunta.hasMany(TipoEstimulo, {as: 'qTipoE', foreignKey: 'id_tipo_estimulo', sourceKey: 'id_tipo_estimulo'});
TipoEstimulo.belongsTo(Pregunta, {as: 'questionsTipoE', foreignKey: 'id_tipo_estimulo', targetKey: 'id_tipo_estimulo'});


//asociaciones "respuesta"

Respuesta.hasMany(Alumno, {as: 'aAlumno', foreignKey: 'id_alumno', sourceKey: 'id_alumno'});
Alumno.belongsTo(Respuesta, {as: 'answerAlumno', foreignKey: 'id_alumno', targetKey: 'id_alumno'});

Respuesta.hasMany(Pregunta, {as: 'aPregunta', foreignKey: 'id_pregunta', sourceKey: 'id_pregunta'});
Pregunta.belongsTo(Respuesta, {as: 'answerQ', foreignKey: 'id_pregunta', targetKey: 'id_pregunta'});


//asociaciones "forma"

Forma.hasMany(Prueba, {as: 'fPrueba', foreignKey: 'id_prueba', sourceKey: 'id_prueba'});
Prueba.belongsTo(Forma, {as: 'formaPrueba', foreignKey: 'id_prueba', targetKey: 'id_prueba'});


//asociaciones "forma_pregunta"

FormaPregunta.hasMany(Forma, {as: 'fpForma', foreignKey: 'id_forma', sourceKey: 'id_forma'});
Forma.belongsTo(FormaPregunta, {as: 'fpf', foreignKey: 'id_forma', targetKey: 'id_forma'});

FormaPregunta.hasMany(Pregunta, {as: 'fpPregunta', foreignKey: 'id_pregunta', sourceKey: 'id_pregunta'});
Pregunta.belongsTo(FormaPregunta, {as: 'fpp', foreignKey: 'id_pregunta', targetKey: 'id_pregunta'});


//asociaciones "asignacion_codigo"

AsignacionCodigo.hasMany(Asignacion, {as: 'aCodigo', foreignKey: 'id_asignacion', sourceKey: 'id_asignacion'});
Asignacion.belongsTo(AsignacionCodigo, {as: 'aca', foreignKey: 'id_asignacion', targetKey: 'id_asignacion'});

AsignacionCodigo.hasMany(Codigo, {as: 'acCodigo', foreignKey: 'id_codigo', sourceKey: 'id_codigo'});
Codigo.belongsTo(AsignacionCodigo, {as: 'acc', foreignKey: 'id_codigo', targetKey: 'id_codigo'});


//asociaciones "filtro"

Filtro.hasMany(Codigo, {as: 'fCodigo', foreignKey: 'id_codigo', sourceKey: 'id_codigo'});
Codigo.belongsTo(Filtro, {as: 'fc', foreignKey: 'id_codigo', targetKey: 'id_codigo'});

Filtro.hasMany(Familia, {as: 'fFamilia', foreignKey: 'id_familia', sourceKey: 'id_familia'});
Familia.belongsTo(Filtro, {as: 'ff', foreignKey: 'id_familia', targetKey: 'id_familia'});


//asociaciones "mensaje"

Mensaje.hasMany(Thread, {as: 'mensajeThread', foreignKey: 'id_thread', sourceKey: 'id_thread'});
Thread.belongsTo(Mensaje, {as: 'mensajeT', foreignKey: 'id_thread', targetKey: 'id_thread'});

Mensaje.hasMany(Usuario, {as: 'mensajeUsuario', foreignKey: 'id_remitente', sourceKey: 'id_usuario'});
Usuario.belongsTo(Mensaje, {as: 'mensajeU', foreignKey: 'id_usuario', targetKey: 'id_remitente'});


//asociaciones "thread_asignacion"

ThreadAsignacion.hasMany(Asignacion, {as: 'atAsignacion', foreignKey: 'id_asignacion', sourceKey: 'id_asignacion'});
Asignacion.belongsTo(ThreadAsignacion, {as: 'taa', foreignKey: 'id_asignacion', targetKey: 'id_asignacion'});

ThreadAsignacion.hasMany(Thread, {as: 'ThreadT', foreignKey: 'id_thread', sourceKey: 'id_thread'});
Thread.belongsTo(ThreadAsignacion, {as: 'tat', foreignKey: 'id_thread', targetKey: 'id_thread'});





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