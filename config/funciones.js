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
    guardarCorreccion: function (respuesta, codigo, usuario, carga, io, sock, fs) {

			Asignacion.find({where: {idUsuario: 1, idRespuesta: respuesta }}).then(function(result){
				AsignacionCodigo.findAll({where:{ idAsignacion: result.dataValues.idAsignacion }}).then(function(data){

						if(data.length>0){
							for(var i = 0; i<codigo.length; i++){
								updateCorreccion(data[i].idAsignacion,codigo[i].id_codigo,data[i].idAsignacionCodigo, carga, fs)
							}
						}else{							
								saveCorreccion(result, codigo, carga, usuario, fs)					
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

	agregarEquipo: function(name){
		return sequelize.transaction(function(t){
			return Equipo.create({nombre: name}, {transaction: t}).then(function(r){

			}).catch(function(){

			})
		})
	},
	editarEquipo: function(name, id){
		return sequelize.transaction(function(t){
			return Equipo.update({nombre: name},{where:{idEquipo: id}},{transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarEquipo: function(id){
		return sequelize.transaction(function(t){
			return Equipo.update({activo: 0}, {where: {idEquipo: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarUsuarioEquipo: function(idUser, idTeam){
		return sequelize.transaction(function(t){
			return UsuarioEquipo.create({idUsuario: idUser, idEquipo: idTeam}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarUsuarioEquipo: function(idUser, idTeam, id){
		return sequelize.transaction(function(t){
			return UsuarioEquipo.update({idUsuario: idUser, idEquipo: idTeam}, {where: {idUsuarioEquipo: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarUsuarioEquipo: function(id){
		return sequelize.transaction(function(t){
			return UsuarioEquipo.destroy({where: {idUsuarioEquipo: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){
			
		})
	},
	agregarInstrumento: function(cod, title){
		return sequelize.transaction(function(t){
			return Prueba.create({codigo: cod, titulo: title},{transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarInstrumento: function(cod, title, id){
		return sequelize.transaction(function(t){
			return Prueba.update({codigo: cod, titulo: title}, {where:{idPrueba: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarInstrumento: function(id){
		return sequelize.transaction(function(t){
			return Prueba.update({activo: 0}, {where: {idPrueba: id}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarAlumno: function(name, apeP, apeM, address, city, mail){
		return sequelize.transaction(function(t){
			return Alumno.create({nombre: name, apellidoPaterno: apeP, apellidoMaterno: apeM, direccion: address, 
				ciudad: city, email: mail},{transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarAlumno: function(name, apeP, apeM, address, city, mail, id){
		return sequelize.transaction(function(t){
			return Alumno.update({nombre: name, apellidoPaterno: apeP, apellidoMaterno: apeM, direccion: address, 
				ciudad: city, email: mail},{where: {idAlumno: id}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarAlumno: function(id){
		return sequelize.transaction(function(t){
			return Alumno.update({activo: 0}, {where:{idAlumno: id}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarUsuario: function(idTipo, user, pass, name, apeP, apeM, mail){
		return sequelize.transaction(function(t){
			return Usuario.create({idTipoUsuario: idTipo, usuario: user, contrasena: pass, nombre: name, apellidoPaterno: apeP,
				apellidoMaterno: apeM, email: mail}, {transaction: t});
		}).then(function(){

		}).catch(function(){

		})
	},
	editarUsuario: function(idTipo, user, pass, name, apeP, apeM, mail, id){
		return sequelize.transaction(function(t){
			return Usuario.update({idTipoUsuario: idTipo, usuario: user, contrasena: pass, nombre: name, apellidoPaterno: apeP,
				apellidoMaterno: apeM, email: mail}, {where: {idUsuario: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarUsuario: function(id){
		return sequelize.transaction(function(t){
			return Usuario.update({activo:0}, {where: {idUsuario: id}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarForma: function(idIns, form){
		return sequelize.transaction(function(t){
			return Forma.create({idPrueba: idIns, forma: form}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarForma: function(idIns, form, id){
		return sequelize.transaction(function(t){
			return Forma.update({idPrueba: idIns, forma: form},{where: {idForma: id}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarForma: function(id){
		return sequelize.transaction(function(t){
			return Forma.update({activo: 0},{where: {idForma: id}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarPreguntaForma: function(idForm, idQues){
		return sequelize.transaction(function(t){
			return FormaPregunta.create({idForma: idForm, idPregunta: idQues}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarPreguntaForma: function(idForm, idQues, id){
		return sequelize.transaction(function(t){
			return FormaPregunta.update({idForma: idForm, idPregunta: idQues}, {where: {idFormaPregunta: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarPreguntaForma: function(id){
		return sequelize.transaction(function(t){
			return FormaPregunta.destroy({where: {idFormaPregunta: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarPregunta: function(idType, idIns, enun, est, idTE){
		return sequelize.transaction(function(t){
			return Pregunta.create({idTipo: idType, idPrueba: idIns, enunciado: enun, estimulo: est, idTipoEstimulo: idTE}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarPregunta: function(idType, idIns, enun, est, idTE, id){
		return sequelize.transaction(function(t){
			return Pregunta.update({idTipo: idType, idPrueba: idIns, enunciado: enun, estimulo: est, idTipoEstimulo: idTE},
				{where:{idPregunta: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarPregunta: function(id){
		return sequelize.transaction(function(t){
			return Pregunta.update({activo: 0}, {where: {idPregunta: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarAsignacion: function(idUser, idAns, idE){
		return sequelize.transaction(function(t){
			return Asignacion.create({idUsuario: idUser, idRespuesta: idAns, idEstado: idE }, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarAsignacion: function(idUser, idAns, idE, id){
		return sequelize.transaction(function(t){
			return Asignacion.update({idUsuario: idUser, idRespuesta: idAns, idEstado: idE },{where:{idAsignacion: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarAsignacion: function(id){
		return sequelize.transaction(function(t){
			return Asignacion.update({activo: 0},{where: {idAsignacion: id}},{transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarCodigo: function(val, title, desc){
		return sequelize.transaction(function(t){
			return Codigo.create({valor: val, titulo: title, descripcion: desc}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarCodigo: function(val, title, desc, id){
		return sequelize.transaction(function(t){
			return Codigo.update({valor: val, titulo: title, descripcion: desc}, {where: {idCodigo: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarCodigo: function(id){
		return sequelize.transaction(function(t){
			return Codigo.update({activo: 0},{where: {idCodigo: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarFamilia: function(title, desc){
		return sequelize.transaction(function(t){
			return Familia.create({titulo: title, descripcion: desc}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarFamilia: function(title, desc, id){
		return sequelize.transaction(function(t){
			return Familia.update({titulo: title, descripcion: desc}, {where: {idFamilia: id}}, {transaction: t});
		}).then(function(){

		}).catch(function(){

		})
	},
	eliminarFamilia: function(id){
		return sequelize.transaction(function(t){
			return Familia.update({activo: 0},{where: {idFamilia: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarCodigoFiltro: function(idCod, idFam){
		return sequelize.transaction(function(t){
			return Filtro.create({idCodigo: idCod, idFamilia: idFam}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarCodigoFiltro: function(idCod, idFam, id){
		return sequelize.transaction(function(t){
			return Filtro.update({idCodigo: idCod, idFamilia: idFam},{where: {idFiltro: id}},{transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarCodigoFiltro: function(id){
		return sequelize.transaction(function(t){
			return Filtro.destroy({where:{idFiltro: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarRespuesta: function(idQues, idAlum, val){
		return sequelize.transaction(function(t){
			return Respuesta.create({idPregunta: idQues, idAlumno: idAlum, valor: val}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarRespuesta: function(idQues, idAlum, val, id){
		return sequelize.transaction(function(t){
			return Respuesta.update({idPregunta: idQues, idAlumno: idAlum, valor: val}, {where: {idRespuesta: id}}, {transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarRespuesta: function(id){
		return sequelize.transaction(function(t){
			return Respuesta.update({activo: 0},{where:{idRespuesta: id}},{transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	agregarTipoPregunta: function(desc){
		return sequelize.transaction(function(t){
			return Tipo.create({descripcion: desc},{transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	editarTipoPregunta: function(desc, id){
		return sequelize.transaction(function(t){
			return Tipo.update({descripcion: desc},{where: {idTipo: id}},{transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarTipoPregunta: function(id){
		return sequelize.transaction(function(t){
			return Tipo.update({activo: 0},{where: {idTipo: id}}, {transaction: t});
		}).then(function(){

		}).catch(function(err){

		})
	}
}


function saveCorreccion(asignacion, codigo, carga, usuario, fs){
	q = 'INSERT INTO asignacion_codigo(`id_asignacion`,`id_codigo`) VALUES '
	for (var i = 0; i < codigo.length; i++) {
			if(i>0){
				q+= ',('+asignacion.idAsignacion+','+codigo[i].id_codigo+')'	
			}else{
				q+= '('+asignacion.idAsignacion+','+codigo[i].id_codigo+')'
			}
		
		}
		q+= ';'
	return sequelize.transaction(function(t){
		return sequelize.query(q,{transaction: t}).then(function(){
			return sequelize.query ('UPDATE asignacion SET `id_estado`=2 WHERE `id_asignacion`='+asignacion.idAsignacion+';',{transaction: t});
		}).then(function(){
			fs.writeFile("./views/js/correctorEjemplo.json", JSON.stringify(carga)); 
		}).catch(function(err){
			console.log('fallo save')
		})	
	})	
}

function updateCorreccion(asignacion, codigo, codigoAsignacion, carga, fs){
	return sequelize.transaction(function(t){
		return AsignacionCodigo.update({idCodigo: codigo},{where:{idAsignacionCodigo: codigoAsignacion}}, { transaction: t });
	}).then(function(){
		fs.writeFile("./views/js/correctorEjemplo.json", JSON.stringify(carga)); 
	}).catch(function(err){
		console.log('fallo update')
	})
}

function actualizarCarga(nombre, carga, fs){
	console.log(JSON.stringify(carga))
	console.log('esta actualizando')
	fs.writeFile("./view/js/correctorEjemplo.json", JSON.stringify(carga), function(err){
		if(err) throw err;
		console.log('')
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

