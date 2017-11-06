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

Usuario.hasMany(Asignacion, {as: 'asignaciones', foreignKey: 'idUsuario', sourceKey: 'idUsuario'});
Asignacion.belongsTo(Usuario, {as: 'corrector', foreignKey: 'idUsuario', targetKey: 'idUsuario'});

Asignacion.hasMany(Estado, {as: 'estadoActual', foreignKey: 'idEstado', sourceKey: 'idEstado'});
Estado.belongsTo(Asignacion, {as: 'asignacionesEstado', foreignKey: 'idEstado', targetKey: 'idEstado'});
	
Asignacion.hasMany(Respuesta, {as: 'answer', foreignKey: 'idRespuesta', sourceKey: 'idRespuesta'});
Respuesta.belongsTo(Asignacion, {as: 'asignacionAnswer', foreignKey: 'idRespuesta', targetKey: 'idRespuesta'});


//asociaciones "usuario"

Usuario.hasMany(TipoUsuario, {as: 'rol', foreignKey: 'idTipoUsuario', sourceKey: 'idTipoUsuario'});
TipoUsuario.belongsTo(Usuario, {as: 'usuariosRol', foreignKey: 'idTipoUsuario', targetKey: 'idTipoUsuario'});


//asociaciones "usuario_equipo"

UsuarioEquipo.hasMany(Usuario, {as: 'userEquipo', foreignKey: 'idUsuario', sourceKey: 'idUsuario'});
Usuario.belongsTo(UsuarioEquipo, {as: 'teamUser', foreignKey: 'idUsuario', targetKey: 'idUsuario'});

UsuarioEquipo.hasMany(Equipo, {as: 'team', foreignKey: 'idEquipo', sourceKey: 'idEquipo'});
Equipo.belongsTo(UsuarioEquipo, {as: 'teamUE', foreignKey: 'idEquipo', targetKey: 'idEquipo'});


//asociaciones "mensaje_destinatario"

MensajeDestinatario.hasMany(Usuario, {as: 'usuarioDestino', foreignKey: 'idUsuario', sourceKey: 'idUsuarioDestino'});
Usuario.belongsTo(MensajeDestinatario, {as: 'userMD', foreignKey: 'idUsuario', targetKey: 'idUsuarioDestino'});

MensajeDestinatario.hasMany(Thread, {as: 'MDThread', foreignKey: 'idThread', sourceKey: 'idThread'});
Thread.belongsTo(MensajeDestinatario, {as: 'threadMD', foreignKey: 'idThread', targetKey: 'idThread'});


//asociaciones "log"

Log.hasMany(Usuario, {as: 'logUsuario', foreignKey: 'idUsuario', sourceKey: 'idUsuario'});
Usuario.belongsTo(Log, {as: 'registro', foreignKey: 'idUsuario', targetKey: 'idUsuario'});


//asociaciones "pregunta"

Pregunta.hasMany(Prueba, {as: 'qPrueba', foreignKey: 'idPrueba', sourceKey: 'idPrueba'});
Prueba.belongsTo(Pregunta, {as: 'questions', foreignKey: 'idPrueba', targetKey: 'idPrueba'});

Pregunta.hasMany(Tipo, {as: 'qTipo', foreignKey: 'idTipo', sourceKey: 'idTipo'});
Tipo.belongsTo(Pregunta, {as: 'questionsTipo', foreignKey: 'idtipo', targetKey: 'idTipo'});

Pregunta.hasMany(TipoEstimulo, {as: 'qTipoE', foreignKey: 'idTipoEstimulo', sourceKey: 'idTipoEstimulo'});
TipoEstimulo.belongsTo(Pregunta, {as: 'questionsTipoE', foreignKey: 'idTipoEstimulo', targetKey: 'idTipoEstimulo'});


//asociaciones "respuesta"

Respuesta.hasMany(Alumno, {as: 'aAlumno', foreignKey: 'idAlumno', sourceKey: 'idAlumno'});
Alumno.belongsTo(Respuesta, {as: 'answerAlumno', foreignKey: 'idAlumno', targetKey: 'idAlumno'});

Respuesta.hasMany(Pregunta, {as: 'aPregunta', foreignKey: 'idPregunta', sourceKey: 'idPregunta'});
Pregunta.belongsTo(Respuesta, {as: 'answerQ', foreignKey: 'idPregunta', targetKey: 'idPregunta'});


//asociaciones "forma"

Forma.hasMany(Prueba, {as: 'fPrueba', foreignKey: 'idPrueba', sourceKey: 'idPrueba'});
Prueba.belongsTo(Forma, {as: 'formaPrueba', foreignKey: 'idPrueba', targetKey: 'idPrueba'});


//asociaciones "forma_pregunta"

FormaPregunta.hasMany(Forma, {as: 'fpForma', foreignKey: 'idForma', sourceKey: 'idForma'});
Forma.belongsTo(FormaPregunta, {as: 'fpf', foreignKey: 'idForma', targetKey: 'idForma'});

FormaPregunta.hasMany(Pregunta, {as: 'fpPregunta', foreignKey: 'idPregunta', sourceKey: 'idPregunta'});
Pregunta.belongsTo(FormaPregunta, {as: 'fpp', foreignKey: 'idPregunta', targetKey: 'idPregunta'});


//asociaciones "asignacion_codigo"

AsignacionCodigo.hasMany(Asignacion, {as: 'aCodigo', foreignKey: 'idAsignacion', sourceKey: 'idAsignacion'});
Asignacion.belongsTo(AsignacionCodigo, {as: 'aca', foreignKey: 'idAsignacion', targetKey: 'idAsignacion'});

AsignacionCodigo.hasMany(Codigo, {as: 'acCodigo', foreignKey: 'idCodigo', sourceKey: 'idCodigo'});
Codigo.belongsTo(AsignacionCodigo, {as: 'acc', foreignKey: 'idCodigo', targetKey: 'idCodigo'});


//asociaciones "filtro"

Filtro.hasMany(Codigo, {as: 'fCodigo', foreignKey: 'idCodigo', sourceKey: 'idCodigo'});
Codigo.belongsTo(Filtro, {as: 'fc', foreignKey: 'idCodigo', targetKey: 'idCodigo'});

Filtro.hasMany(Familia, {as: 'fFamilia', foreignKey: 'idFamilia', sourceKey: 'idFamilia'});
Familia.belongsTo(Filtro, {as: 'ff', foreignKey: 'idFamilia', targetKey: 'idFamilia'});


//asociaciones "mensaje"

Mensaje.hasMany(Thread, {as: 'mensajeThread', foreignKey: 'idThread', sourceKey: 'idThread'});
Thread.belongsTo(Mensaje, {as: 'mensajeT', foreignKey: 'idThread', targetKey: 'idThread'});

Mensaje.hasMany(Usuario, {as: 'mensajeUsuario', foreignKey: 'idUsuario', sourceKey: 'idRemitente'});
Usuario.belongsTo(Mensaje, {as: 'mensajeU', foreignKey: 'idUsuario', targetKey: 'idRemitente'});


//asociaciones "thread_asignacion"

ThreadAsignacion.hasMany(Asignacion, {as: 'atAsignacion', foreignKey: 'idAsignacion', sourceKey: 'idAsignacion'});
Asignacion.belongsTo(ThreadAsignacion, {as: 'taa', foreignKey: 'idAsignacion', targetKey: 'idAsignacion'});

ThreadAsignacion.hasMany(Thread, {as: 'ThreadT', foreignKey: 'idThread', sourceKey: 'idThread'});
Thread.belongsTo(ThreadAsignacion, {as: 'tat', foreignKey: 'idThread', targetKey: 'idThread'});





module.exports = {

    /*
    función login, inicia sesion en la aplicación
    */
    login: function (useru, passu, io, sock) {
        Usuario.find({ where: { usuario: useru, contrasena: passu } }).then(function (result) {
            if (result != null) {
            	console.log(result)
                io.to(sock).emit('login exitoso', { nombre: result.dataValues.nombre, apellidop: result.dataValues.apellidoPaterno, apellidom: result.dataValues.apellidMaterno, tipousuario: result.dataValues.idTipoUsuario })
            } else {
                io.to(sock).emit('login fallido', {mensaje: 'datos incorrectos'})
            }
        }).catch(function(){
        	io.to(sock).emit('fallo sql',{mensaje: 'fallo'})
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
	rawIn: function (codigo){
		var q = 'INSERT INTO asignacion_codigo(`id_asignacion`,`id_codigo`) VALUES ';

		for (var i = 0; i < codigo.length; i++) {
			if(i>0){
				q+= ',('+1+','+codigo[i].id_codigo+')'	
			}else{
				q+= '('+1+','+codigo[i].id_codigo+')'
			}
		
		}
		q+= ';'


		return sequelize.transaction(function(t){
			return sequelize.query(q,{transaction: t}).then(function(){
				return sequelize.query ('UPDATE asignacion SET `id_estado`=2 WHERE `id_asignacion`=1;',{transaction: t});
			})

			}).then(function(){
		
			}).catch(function(){
				
			})
	},
	crearEquipo: function(name){
		return sequelize.transaction(function(t){
			return Equipo.create({nombre: name}, {transaction: t}).then(function(r){

			}).catch(function(){

			})
		})
	},
	editarEquipo: function(team){
		return sequelize.transaction(function(t){
			return Equipo.update({nombre: team.nombre},{where:{idEquipo: team.id}},{transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarEquipo: function(team){
		return sequelize.transaction(function(t){
			return Equipo.update({activo: 0}, {where: {idEquipo: team.id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarUsuarioEquipo: function(data){
		return sequelize.transaction(function(t){
			return UsuarioEquipo.create({idUsuario: data.idUsuario, idEquipo: data.idEquipo}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarUsuarioEquipo: function(data){
		return sequelize.transaction(function(t){
			return UsuarioEquipo.update({idUsuario: data.idUsuario, idEquipo: data.idEquipo}, {where: {idUsuarioEquipo: data.id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarUsuarioEquipo: function(data){
		return sequelize.transaction(function(t){
			return UsuarioEquipo.destroy({where: {idUsuarioEquipo: data.idUsuarioEquipo}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){
			
		})
	},
	crearInstrumento: function(prueba){
		return sequelize.transaction(function(t){
			return Prueba.create({{codigo: prueba.codigo, titulo: prueba.titulo}},{transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarInstrumento: function(prueba){
		return sequelize.transaction(function(t){
			return Prueba.update({codigo: prueba.codigo, titulo: prueba.titulo}, {where:{idPrueba: prueba.id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarInstrumento: function(prueba){
		return sequelize.transaction(function(t){
			return Prueba.update({activo: 0}, {where: {idPrueba: prueba.id}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarAlumno: function(alumno){
		return sequelize.transaction(function(t){
			return Alumno.create({nombre: alumno.nombre, apellidoPaterno: alumno.apellido_paterno, apellidoMaterno: alumno.apellido_materno, direccion: alumno.direccion, 
				ciudad: alumno.ciudad, email: alumno.email},{transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarAlumno: function(alumno){
		return sequelize.transaction(function(t){
			return Alumno.update({nombre: alumno.nombre, apellidoPaterno: alumno.apellido_paterno, apellidoMaterno: alumno.apellido_materno, direccion: alumno.direccion, 
				ciudad: alumno.ciudad, email: alumno.email},{where: {idAlumno: alumno.id}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarAlumno: function(alumno){
		return sequelize.transaction(function(t){
			return Alumno.update({activo: 0}, {where:{idAlumno: alumno.id}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarUsuario: function(user){
		return sequelize.transaction(function(t){
			return Usuario.create({idTipoUsuario: user.tipo_usuario, usuario: user.usuario, contrasena: user.pass, nombre: user.nombre, apellidoPaterno: user.apellido_paterno,
				apellidoMaterno: user.apellido_materno, email: user.email}, {transaction: t});
		}).then(function(){

		}).catch(function(){

		})
	},
	editarUsuario: function(user){
		return sequelize.transaction(function(t){
			return Usuario.update({idTipoUsuario: user.tipo_usuario, usuario: user.usuario, contrasena: user.pass, nombre: user.nombre, apellidoPaterno: user.apellido_paterno,
				apellidoMaterno: user.apellido_materno, email: user.email}, {where: {idUsuario: user.id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarUsuario: function(user){
		return sequelize.transaction(function(t){
			return Usuario.update({activo:0}, {where: {idUsuario: user.id}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarForma: function(form){
		return sequelize.transaction(function(t){
			return Forma.create({idPrueba: form.idPrueba, forma: form.forma}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarForma: function(form){
		return sequelize.transaction(function(t){
			return Forma.update({idPrueba: form.idPrueba, forma: form.forma},{where: {idForma: form.idForma}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarForma: function(form){
		return sequelize.transaction(function(t){
			return Forma.update({activo: 0},{where: {idForma: form.idForma}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarPreguntaForma: function(data){
		return sequelize.transaction(function(t){
			return FormaPregunta.create({idForma: data.idForma, idPregunta: data.idPregunta}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarPreguntaForma: function(data){
		return sequelize.transaction(function(t){
			return FormaPregunta.update({idForma: data.idForma, idPregunta: data.idPregunta}, {where: {idFormaPregunta: data.idFormaPregunta}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarPreguntaForma: function(data){
		return sequelize.transaction(function(t){
			return FormaPregunta.destroy({where: {idFormaPregunta: data.idFormaPregunta}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarPregunta: function(q){
		return sequelize.transaction(function(t){
			return Pregunta.create({idTipo: q.idTipo, idPrueba: q.idPrueba, enunciado: q.enunciado, estimulo: q.estimulo, idTipoEstimulo: q.tipoEstimulo}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarPregunta: function(q){
		return sequelize.transaction(function(t){
			return Pregunta.update({idTipo: q.idTipo, idPrueba: q.idPrueba, enunciado: q.enunciado, estimulo: q.estimulo, idTipoEstimulo: q.tipoEstimulo},
				{where:{idPregunta: q.idPregunta}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarPregunta: function(q){
		return sequelize.transaction(function(t){
			return Pregunta.update({activo: 0}, {where: {idPregunta: q.idPregunta}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarAsignacion: function(asignacion){
		return sequelize.transaction(function(t){
			return Asignacion.create({idUsuario: asignacion.idUsuario, idRespuesta: asignacion.idRespuesta, idEstado: asignacion.idEstado }, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarAsignacion: function(asignacion){
		return sequelize.transaction(function(t){
			return Asignacion.update({idUsuario: asignacion.idUsuario, idRespuesta: asignacion.idRespuesta, idEstado: asignacion.idEstado },{where:{idAsignacion: asignacion.idAsignacion}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarAsignacion: function(asignacion){
		return sequelize.transaction(function(t){
			return Asignacion.update({activo: 0},{where: {idAsignacion: asignacion.idAsignacion}},{transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarCodigo: function(cod){
		return sequelize.transaction(function(t){
			return Codigo.create({valor: cod.valor, titulo: cod.titulo, descripcion: cod.descripcion}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarCodigo: function(cod){
		return sequelize.transaction(function(t){
			return Codigo.update({valor: cod.valor, titulo: cod.titulo, descripcion: cod.descripcion}, {where: {idCodigo: cod.idCodigo}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarCodigo: function(cod){
		return sequelize.transaction(function(t){
			return Codigo.update({activo: 0},{where: {idCodigo: cod.idCodigo}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarFamilia: function(fam){
		return sequelize.transaction(function(t){
			return Familia.create({titulo: fam.titulo, descripcion: fam.descripcion}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarFamilia: function(fam){
		return sequelize.transaction(function(t){
			return Familia.update({titulo: fam.titulo, descripcion: fam.descripcion},{where: {idFamilia: fam.idFamilia}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarCodigoFiltro: function(data){
		return sequelize.transaction(function(t){
			return Filtro.create({idCodigo: data.idCodigo, idFamilia: data.idFamilia}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarCodigoFiltro: function(data){
		return sequelize.transaction(function(t){
			return Filtro.update({idCodigo: data.idCodigo, idFamilia: data.idFamilia},{transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarCodigoFiltro: function(data){
		return sequelize.transaction(function(t){
			return Filtro.destroy({where:{idFiltro: data.idFiltro}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

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

