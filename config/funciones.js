/*
conexión con la base de datos
*/
var sequelize = require('./configDB.js')
var Sequelize = require('sequelize')
var xls = require('xls-to-json')
const Op = Sequelize.Op;
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
	Familia = sequelize.import('./models/familia.js'),
	Sesion = sequelize.import('./models/sesion.js'),
	CorrectorSesion = sequelize.import('./models/corrector_sesion.js'),
	RespuestaSesion = sequelize.import('./models/respuesta_sesion.js');


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
            	if(result.dataValues.idTipoUsuario!=3){
            		UsuarioEquipo.findAll({where:{idUsuario: result.dataValues.idUsuario}},{raw:true}).then(function(ue){
            			if(result.dataValues.especialidad.indexOf("Lenguaje")!= -1){
            				io.to(sock).emit('login exitoso', {nombre: result.dataValues.nombre, apellidop: result.dataValues.apellidoPaterno, apellidom: result.dataValues.apellidoMaterno, tipousuario: result.dataValues.idTipoUsuario, idUsuario:result.dataValues.idUsuario, idTeam:ue[0].dataValues.idEquipo, isLenguaje: true})
            			}else{
            				io.to(sock).emit('login exitoso', {nombre: result.dataValues.nombre, apellidop: result.dataValues.apellidoPaterno, apellidom: result.dataValues.apellidoMaterno, tipousuario: result.dataValues.idTipoUsuario, idUsuario:result.dataValues.idUsuario, idTeam:ue[0].dataValues.idEquipo, isLenguaje: false})
            			}
            		})
            	}else{
                io.to(sock).emit('login exitoso', {nombre: result.dataValues.nombre, apellidop: result.dataValues.apellidoPaterno, apellidom: result.dataValues.apellidoMaterno, tipousuario: result.dataValues.idTipoUsuario, idUsuario:result.dataValues.idUsuario, idTeam: 0 })
            	}
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
    guardarCorreccion: function (id,respuesta, usuario, carga,preg,sesion, io, equipo, fs) {
    	console.log("llega")
    	if(respuesta.id_estado==2){
			Asignacion.findAll({where: {idUsuario: id, idRespuesta: respuesta.id_respuesta }},{raw:true}).then(function(result){
				AsignacionCodigo.findAll({where:{ idAsignacion: result[0].dataValues.idAsignacion }},{raw:true}).then(function(data){
						if(data.length>0){
							if(data[0].idCodigo!=respuesta.correccion[0].idcodigo){
								updateCorreccion(usuario, result[0].dataValues.idAsignacion,respuesta.correccion[0].idcodigo,data.idAsignacionCodigo, carga, preg, sesion, fs, io, equipo)
							}
						}else{
							if(result[0].idEstado==1){
								saveCorreccion(result[0].dataValues.idAsignacion, respuesta.correccion[0].idcodigo, carga, usuario, sesion, preg, fs, io, equipo, 1)
							}else{
								saveCorreccion(result[0].dataValues.idAsignacion, respuesta.correccion[0].idcodigo, carga, usuario, sesion, preg, fs, io, equipo, 3)
							}
						}
				})				
			})
        }else{
        	Asignacion.findAll({where: {idUsuario: id, idRespuesta: respuesta.id_respuesta }},{raw:true}).then(function(res){
        		if(res[0].dataValues.idEstado==1){

        			dudaNueva(res[0].dataValues.idAsignacion, usuario, preg, sesion, fs, io, 1,respuesta.duda, carga, equipo, respuesta.valor, id)
        		}else if(res[0].dataValues.idEstado==2){
        			dudaNueva(res[0].dataValues.idAsignacion, usuario, preg, sesion, fs, io, 2,respuesta.duda, carga, equipo, respuesta.valor, id)
        		}else{
        			updateDuda(res[0].dataValues.idAsignacion,respuesta, usuario, preg, sesion, fs, io,respuesta.duda, carga, equipo, respuesta.valor, id)
        		}
        	})
        }
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
	agregarEquipo: function(name,fs){
		return sequelize.transaction(function(t){
			return Equipo.create({nombre: name}, {transaction: t}).then(function(r){
				
			}).catch(function(){

			})
		})
	},
	editarEquipo: function(name, id,fs){
		return sequelize.transaction(function(t){
			return Equipo.update({nombre: name},{where:{idEquipo: id}},{transaction : t});
		}).then(function(){

		}).catch(function(err){

		})
	},
	eliminarEquipo: function(id,fs){
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
	editarUsuario: function(idTipo,idUser, user,pass, name, apeP, apeM, mail){
		return sequelize.transaction(function(t){
			return Usuario.update({idTipoUsuario: idTipo, usuario: user, nombre: name,contrasena:pass, apellidoPaterno: apeP,
				apellidoMaterno: apeM, email: mail}, {where: {idUsuario: idUser}}, {transaction : t});
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
	},
	guardarAlaMala: function(fs, carga){
		fs.writeFile("./views/persistence/Corrector-Especial-A-1-1.json", JSON.stringify(carga));
	},
	crearLenguaje: function(fs){
		var cont = 0;
		var id = 1;
		var resp = [];
		var plantillaTotal = [];
		var paqe = require("../views/persistence/plantillaPaquetes.json");

		let pregunta = function(idCiclar){
			return new Promise(function(resolve, reject){
				sequelize.query("Select * from `respuesta` where `id_pregunta`="+idCiclar+" limit 10",{model: Respuesta}).then(function(r){
					r.forEach(function(respuesta){
						Asignacion.create({idUsuario:80, idRespuesta: respuesta.dataValues.id_respuesta, idEstado:1}).then(function(){
							Asignacion.create({idUsuario:81, idRespuesta: respuesta.dataValues.id_respuesta, idEstado:1}).then(function(){
								resp.push({id_respuesta: respuesta.dataValues.id_respuesta, valor: respuesta.dataValues.valor, id_estado: 1,duda:'Sin duda', correccion: []})
								cont++;
								if(cont==r.length){
									Pregunta.findAll({where:{idPregunta: id}},{raw:true}).then(function(pr){
										var plantilla = require("../views/persistence/carga.json");
										plantilla.enunciado = pr[0].dataValues.situacionPedagogica;
										plantilla.alternativaElaboracion = pr[0].dataValues.alterResolucionPedagogica;
										plantilla.respuestas = resp;
										plantillaTotal.push(plantilla);
										plantilla = null;
										cont = 0;
										console.log("Resolve pregunta")
										
									})
									resolve(idCiclar);
								}
							})
						})
					})
				})
			})
		}

		function ciclar(idCiclar){
			return new Promise(function(resolve,reject){
				return pregunta(idCiclar)
			}).then(function(ide){
				console.log("id Ciclar "+ide)
				ide =ide+2;
				if(ide>7){
					fs.writeFile("./views/persistence/Corrector-Lenguaje-A-1-1.json",JSON.stringify(plantillaTotal));
					fs.writeFile("./views/persistence/Corrector-Lenguaje-A-paquetes.json", JSON.stringify(paqe));
					fs.writeFile("./views/persistence/Corrector_2-Lenguaje-A-1-1.json",JSON.stringify(plantillaTotal));
					fs.writeFile("./views/persistence/Corrector_2-Lenguaje-A-paquetes.json", JSON.stringify(paqe));
				}else{
					console.log("Vuelve a hacer el ciclo")
					ciclar(ide);
				}
			})
		}

		ciclar(id);
	},
	crearSesionIndi: function(fs){
		var cont = 0;
		var resp = [];
		var paqe = require("../views/persistence/plantillaPaquetes.json");
		sequelize.query("Select * from `respuesta` where `id_pregunta`= 8 limit 40",{model: Respuesta}).then(function(r){
			r.forEach(function(respuesta){
				Asignacion.create({idUsuario:84, idRespuesta: respuesta.dataValues.id_respuesta, idEstado: 1}).then(function(){
					resp.push({id_respuesta: respuesta.dataValues.id_respuesta, valor: respuesta.dataValues.valor, id_estado: 1,duda:'Sin duda',isEC: 0, tipoEC:{docente: -1, estudiante: -1, escuela: -1, otros: -1}, nivelFundamento:{fund: -1, parcial: -1, no_fund: -1, estereotipo: -1}, correccion: []})
					cont++;
					if(cont==r.length){
							Pregunta.findAll({where:{idPregunta: 8}},{raw:true}).then(function(pr){
								var plantilla = require("../views/persistence/carga.json");
								plantilla.enunciado = pr[0].dataValues.situacionPedagogica;
								plantilla.alternativaElaboracion = pr[0].dataValues.alterResolucionPedagogica;
								plantilla.respuestas = resp
								fs.writeFile("./views/persistence/Lenguaje_1-1234-1234-1-1.json",JSON.stringify(plantilla));
								fs.writeFile("./views/persistence/Lenguaje_1-1234-1234-paquetes.json", JSON.stringify(paqe));
							})
								
						}
				})
			})
		})

	},
	crearSesion: function(fs){
		var cont = 0;
		var resp = [];
		var paqe = require("../views/persistence/plantillaPaquetes.json");
		sequelize.query("Select * from `respuesta` where `id_pregunta`= 4 limit 40",{model: Respuesta}).then(function(r){
			r.forEach(function(respuesta){
				Asignacion.create({idUsuario:103, idRespuesta: respuesta.dataValues.id_respuesta, idEstado: 1}).then(function(){
					Asignacion.create({idUsuario:104, idRespuesta: respuesta.dataValues.id_respuesta, idEstado:1}).then(function(){
						resp.push({id_respuesta: respuesta.dataValues.id_respuesta, valor: respuesta.dataValues.valor, id_estado: 1,duda:'Sin duda',isEC: 0, tipoEC:{docente: -1, estudiante: -1, escuela: -1, otros: -1}, nivelFundamento:{fund: -1, parcial: -1, no_fund: -1, estereotipo: -1}, correccion: []})
						cont++;
						if(cont==r.length){
							Pregunta.findAll({where:{idPregunta: 4}},{raw:true}).then(function(pr){
								var plantilla = require("../views/persistence/carga.json");
								plantilla.enunciado = pr[0].dataValues.situacionPedagogica;
								plantilla.alternativaElaboracion = pr[0].dataValues.alterResolucionPedagogica;
								plantilla.respuestas = resp
								fs.writeFile("./views/persistence/Roberto-Novoa-1-1-1.json",JSON.stringify(plantilla));
								fs.writeFile("./views/persistence/Roberto-Novoa-1-paquetes.json", JSON.stringify(paqe));
								fs.writeFile("./views/persistence/Roberto-Novoa-2-1-1.json",JSON.stringify(plantilla));
								fs.writeFile("./views/persistence/Roberto-Novoa-2-paquetes.json", JSON.stringify(paqe));
							})
								
						}					
					})
				})
			})
		})

	},
	repetirAsignacionesPedagogia:function(idSesion, team, fs){
		var asignaciones = [];
		var sesion = 0;
		var correctores = [];
		var cargaTotal;
		var forma = "";
		var nombreSesion = "";
		var sesionAntigua = 0;
		let DatosSesion = function(){
			return new Promise(function(resolve,reject){
				console.log("LLEGA A DatosSesion")
				var cont = 0;
			xls({
    			input: "./config/PRPRESPUESTAS.xlsx",  // input xls 
    			output: null, // output json 
    			sheet: "PRP"  // specific sheetname 
  			}, function(err, result) {
    			if(err) {
    				console.log("error archivo")
  					console.error(err);
    			} else {
    				result.forEach(function(per){
    					if(per.Sesion_P==idSesion && per.Nivel.indexOf(team)!=-1){
    						asignaciones.push(per);
    						cont++;
    						if(cont==result.length){
    							resolve();
    						}
    					}else{
    						cont++;
    						if(cont==result.length){
    							resolve();
    						}
    					}
   					})
   				}
  			});	
			})
			
		}
		let borrarSesionAntigua = function(){
			return new Promise(function(resolve,reject){
				sequelize.query("SELECT * FROM `sesion` WHERE `nombre` LIKE '%Sesíon "+idSesion+" Equipo "+team+"%' AND `activo`=1",{model:Sesion}).then(function(sa){
					console.log(sa)
					sesionAntigua=sa[0].dataValues.id_sesion;
					Sesion.update({activo:0},{where:{idSesion:sa[0].dataValues.id_sesion}}).then(function(){
						Asignacion.update({activo:0},{where:{idSesion:sa[0].dataValues.id_sesion}}).then(function(){
							resolve();
						})
					})
				})	
			})
			
		}
		let crearSesion = function(){
			return new Promise(function(resolve,reject){
				UsuarioEquipo.findAll({where:{idUsuario: asignaciones[0].Sup_P}},{raw:true}).then(function(ue){
				return sequelize.transaction(function(t){
					Sesion.create({idEquipo: ue[0].dataValues.idEquipo, nombre: 'Sesión '+idSesion+' Equipo '+team}).then(function(s){
						sesion = s.dataValues.idSesion;
						nombreSesion = s.dataValues.nombre;
						resolve(s.dataValues.idEquipo);
					})
				})	
			})	
			})
			
		}


		let buscarCorrectores = function(eq){
			var c = 0;
			return new Promise(function(resolve,reject){
				UsuarioEquipo.findAll({where:{idEquipo: eq}},{raw:true}).then(function(users){
					users.forEach(function(usuario){
						if(usuario.dataValues.idUsuario!=asignaciones[0].Sup_P){
							correctores.push(usuario.dataValues.idUsuario)
							c++;
							if(c==users.length){
								resolve();
							}
						}else{
							c++;
							if(c==users.length){
								resolve();
							}
						}
					})
				})	
			})	
		}

		DatosSesion().then(function(){
			return borrarSesionAntigua();			
		}).then(function(){
			return crearSesion();
		}).then(function(e){
			return buscarCorrectores(e);
		}).then(function(){
			guardarDatos(0);
		})

		function guardarDatos(ai){
			return new Promise(function(resolve,reject){
				asignarCorrector(ai).then(function(coa){
					return creaData(coa);
				}).then(function(){
					return guardarArchivos(ai);
				}).then(function(){
					if(ai!=correctores.length-1){
						guardarDatos(ai+1);
					}
				})
			})
		}
		let asignarCorrector = function(id){
			var ua = 0;
			var correctorAsignaciones = [];
			return new Promise(function(resolve,reject){
				asignaciones.forEach(function(asi){
					if(correctores[id]==asi.C_Ped1){
						return sequelize.transaction(function(t){
							return Asignacion.create({idRespuesta:asi.id,idUsuario:asi.C_Ped1, valor: asi.Respuesta, idEstado:1,duda:'Sin duda', idSesion: sesion},{transaction:t}); 
						}).then(function(){
							correctorAsignaciones.push({id_respuesta:asi.id, valor: asi.Respuesta, id_estado:1, duda:'Sin duda', isEC: 0, tipoEC:{docente:-1, estudiante:-1, escuela:-1, otros:-1}, nivelFundamento:{ fund:-1, parcial:-1, no_fund:-1, estereotipo:-1},correccion:[]})
							ua++;
							if(ua==asignaciones.length){
								console.log("LLEGA AL RESOLVE");
								resolve(correctorAsignaciones);
							}
						})	
					}else if(correctores[id]==asi.C_Ped2){
						return sequelize.transaction(function(t){
							return Asignacion.create({idRespuesta:asi.id,idUsuario:asi.C_Ped2, valor: asi.Respuesta, idEstado:1,duda:'Sin duda', idSesion: sesion},{transaction:t}); 
						}).then(function(){
							correctorAsignaciones.push({id_respuesta:asi.id, valor: asi.Respuesta, id_estado:1, duda:'Sin duda', isEC: 0, tipoEC:{docente:-1, estudiante:-1, escuela:-1, otros:-1}, nivelFundamento:{ fund:-1, parcial:-1, no_fund:-1, estereotipo:-1},correccion:[]})
							ua++;
							if(ua==asignaciones.length){
								console.log("LLEGA AL RESOLVE");
								resolve(correctorAsignaciones);
							}
						})
					}else{
						ua++;
						if(ua==asignaciones.length){
							console.log("LLEGA AL RESOLVE");
							resolve(correctorAsignaciones);
						}
					}
				})
			})
		}


		let creaData = function(ca){
			console.log("LLEGA AL CREADATA")
			return new Promise(function(resolve,reject){
				Respuesta.findAll({where:{idRespuesta:ca[0].id_respuesta}},{raw:true}).then(function(r){
					Pregunta.findAll({where:{idPregunta: r[0].dataValues.idPregunta}},{raw:true}).then(function(p){
						forma = p[0].dataValues.forma;
						var cods= [{idcodigo:1,valor:"A",descripcion:"Nam placerat dignissim convallis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sed nunc bibendum, aliquet purus sit amet, volutpat magna. Cras gravida turpis et mauris porta, non congue lorem egestas. Maecenas eget justo elementum, hendrerit dui sed, cursus felis. Morbi eu mauris quis elit pharetra dapibus. Nam at tellus commodo, imperdiet lectus in, suscipit mi. Nullam accumsan dui sed suscipit euismod. Ut quis odio eu erat pretium luctus quis vel leo. Curabitur nec vestibulum sem. Vivamus pulvinar pellentesque neque, quis cursus urna scelerisque eu. Aenean congue hendrerit purus vel pellentesque. Nunc sit amet diam non lectus volutpat dictum. Vestibulum dignissim, tortor eget bibendum aliquam, enim diam porttitor nibh, et pretium tortor orci sed velit. Nam ut pretium metus, vel tincidunt nibh."},{idcodigo:2,valor:"B",descripcion:"Suspendisse a pulvinar ligula. Integer in varius lectus. Nulla eu metus justo. Pellentesque eu purus pharetra, feugiat lorem ut, fermentum nisl. Cras facilisis convallis sem, ac gravida metus volutpat eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum tortor nec lectus interdum viverra. In hac habitasse platea dictumst. Maecenas ornare, lorem eget elementum posuere, dui neque feugiat massa, sit amet molestie tortor leo eget libero. Donec sodales libero in quam hendrerit, ac dignissim leo dictum. Donec aliquet dolor est, et iaculis ipsum pretium a. Etiam ac libero ac erat lobortis molestie. Aliquam ac lorem id lorem sollicitudin tincidunt hendrerit faucibus ex. Curabitur interdum risus vitae odio pulvinar, sed elementum odio semper."},{idcodigo:3,valor:"C",descripcion:"Suspendisse ornare, purus at lacinia pretium, velit tortor venenatis nisi, at dapibus neque augue a ligula. Donec a fringilla nisl. Aenean convallis bibendum urna, sed euismod turpis rutrum non. Quisque id feugiat magna, tempus tincidunt augue. Sed sed finibus metus, id ultricies turpis. Duis eu sapien quis purus facilisis faucibus vel ut turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce a lorem suscipit lectus tincidunt pharetra sit amet id ex. Pellentesque et massa eget turpis viverra mollis. Etiam vitae congue lectus. Fusce vel ornare magna. Fusce pulvinar tempus neque. Donec porttitor dictum elit eget rutrum. Duis sit amet lacus sed nisl mattis aliquam."},{idcodigo:4,valor:"D",descripcion:"Donec imperdiet orci nunc, at cursus libero ultricies ut. Vestibulum aliquet accumsan lacinia. Etiam mollis non velit ac scelerisque. Vestibulum rutrum vel quam dignissim vulputate. Pellentesque placerat urna ut purus tempus tincidunt. Suspendisse velit nibh, pulvinar eu maximus quis, ullamcorper et ligula. Donec tristique laoreet semper. Curabitur tincidunt pellentesque lobortis. Nulla congue dictum felis, a euismod odio commodo non. Vivamus tristique cursus orci, id laoreet nunc rhoncus vitae. Aenean ullamcorper fringilla lorem a pellentesque."}]
						var cargaPlantilla = {id_pregunta: p[0].dataValues.idPregunta, enunciado: p[0].dataValues.situacionPedagogica, alternativaElaboracion: p[0].dataValues.resSituacionPedagogica, id_tipo_estimulo: 1,codigos:cods, respuestas:ca};
						cargaTotal = cargaPlantilla;
						resolve();
					})
				})	
			})
		}

		let guardarArchivos = function(id){
			var t = 0;
			return new Promise(function(resolve,reject){
				Usuario.findAll({where:{idUsuario:correctores[id]}},{raw:true}).then(function(us){
					fs.access("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", function(err){
						if(!err){
							var paquete = require("../views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json");	
							paquete.forEach(function(pq){
								if(pq.id_pregunta==cargaTotal.id_pregunta){
									pq.sesion.forEach(function(sesiones){
										if(sesiones.id_sesion==sesionAntigua){
											sesiones.id_sesion=sesion;
											sesiones.nombre= nombreSesion;
											sesiones.respuestas= {contestadas:0,duda:0,noContestadas:cargaTotal.respuestas.length};
											fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", JSON.stringify(paquete));
											fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-"+pq.id_pregunta+"-"+sesion+".json", JSON.stringify(cargaTotal));
											resolve();
											cargaTotal=null;
											paquete = null;
										}
									})
								}
							})
						}else{
							console.log("NO HAY ARCHIVO")
						}
					})
				})
			})
		}

	},
	crearAsignacionesPedagogia: function(idSesion, team, fs){
		var asignaciones = [];
		var sesion = 0;
		var correctores = [];
		var cargaTotal;
		var forma = "";
		var nombreSesion = "";
		let DatosSesion = function(){
			return new Promise(function(resolve,reject){
				console.log("LLEGA A DatosSesion")
				var cont = 0;
			xls({
    			input: "./config/PRPRESPUESTAS.xlsx",  // input xls 
    			output: null, // output json 
    			sheet: "PRP"  // specific sheetname 
  			}, function(err, result) {
    			if(err) {
    				console.log("error archivo")
  					console.error(err);
    			} else {
    				result.forEach(function(per){
    					if(per.Sesion_P==idSesion && per.Nivel.indexOf(team)!=-1){
    						asignaciones.push(per);
    						cont++;
    						if(cont==result.length){
    							resolve();
    						}
    					}else{
    						cont++;
    						if(cont==result.length){
    							resolve();
    						}
    					}
   					})
   				}
  			});	
			})
			
		}

		let crearSesion = function(){
			return new Promise(function(resolve,reject){
				UsuarioEquipo.findAll({where:{idUsuario: asignaciones[0].Sup_P}},{raw:true}).then(function(ue){
				return sequelize.transaction(function(t){
					Sesion.create({idEquipo: ue[0].dataValues.idEquipo, nombre: 'Sesión '+idSesion+' Equipo '+team}).then(function(s){
						sesion = s.dataValues.idSesion;
						nombreSesion = s.dataValues.nombre;
						resolve(s.dataValues.idEquipo);
					})
				})	
			})	
			})
			
		}


		let buscarCorrectores = function(eq){
			var c = 0;
			return new Promise(function(resolve,reject){
				UsuarioEquipo.findAll({where:{idEquipo: eq}},{raw:true}).then(function(users){
					users.forEach(function(usuario){
						if(usuario.dataValues.idUsuario!=asignaciones[0].Sup_P){
							correctores.push(usuario.dataValues.idUsuario)
							c++;
							if(c==users.length){
								resolve();
							}
						}else{
							c++;
							if(c==users.length){
								resolve();
							}
						}
					})
				})	
			})	
		}

		DatosSesion().then(function(){
			return crearSesion();
		}).then(function(e){
			return buscarCorrectores(e);
		}).then(function(){
			guardarDatos(0);
		})

		function guardarDatos(ai){
			return new Promise(function(resolve,reject){
				asignarCorrector(ai).then(function(coa){
					return creaData(coa);
				}).then(function(){
					return guardarArchivos(ai);
				}).then(function(){
					if(ai!=correctores.length-1){
						guardarDatos(ai+1);
					}
				})
			})
		}
		let asignarCorrector = function(id){
			var ua = 0;
			var correctorAsignaciones = [];
			return new Promise(function(resolve,reject){
				asignaciones.forEach(function(asi){
					if(correctores[id]==asi.C_Ped1){
						return sequelize.transaction(function(t){
							return Asignacion.create({idRespuesta:asi.id,idUsuario:asi.C_Ped1, valor: asi.Respuesta, idEstado:1,duda:'Sin duda', idSesion: sesion},{transaction:t}); 
						}).then(function(){
							correctorAsignaciones.push({id_respuesta:asi.id, valor: asi.Respuesta, id_estado:1, duda:'Sin duda', isEC: 0, tipoEC:{docente:-1, estudiante:-1, escuela:-1, otros:-1}, nivelFundamento:{ fund:-1, parcial:-1, no_fund:-1, estereotipo:-1},correccion:[]})
							ua++;
							if(ua==asignaciones.length){
								console.log("LLEGA AL RESOLVE");
								resolve(correctorAsignaciones);
							}
						})	
					}else if(correctores[id]==asi.C_Ped2){
						return sequelize.transaction(function(t){
							return Asignacion.create({idRespuesta:asi.id,idUsuario:asi.C_Ped2, valor: asi.Respuesta, idEstado:1,duda:'Sin duda', idSesion: sesion},{transaction:t}); 
						}).then(function(){
							correctorAsignaciones.push({id_respuesta:asi.id, valor: asi.Respuesta, id_estado:1, duda:'Sin duda', isEC: 0, tipoEC:{docente:-1, estudiante:-1, escuela:-1, otros:-1}, nivelFundamento:{ fund:-1, parcial:-1, no_fund:-1, estereotipo:-1},correccion:[]})
							ua++;
							if(ua==asignaciones.length){
								console.log("LLEGA AL RESOLVE");
								resolve(correctorAsignaciones);
							}
						})
					}else{
						ua++;
						if(ua==asignaciones.length){
							console.log("LLEGA AL RESOLVE");
							resolve(correctorAsignaciones);
						}
					}
				})
			})
		}


		let creaData = function(ca){
			console.log("LLEGA AL CREADATA")
			return new Promise(function(resolve,reject){
				Respuesta.findAll({where:{idRespuesta:ca[0].id_respuesta}},{raw:true}).then(function(r){
					Pregunta.findAll({where:{idPregunta: r[0].dataValues.idPregunta}},{raw:true}).then(function(p){
						forma = p[0].dataValues.forma;
						var cods= [{idcodigo:1,valor:"A",descripcion:"Nam placerat dignissim convallis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sed nunc bibendum, aliquet purus sit amet, volutpat magna. Cras gravida turpis et mauris porta, non congue lorem egestas. Maecenas eget justo elementum, hendrerit dui sed, cursus felis. Morbi eu mauris quis elit pharetra dapibus. Nam at tellus commodo, imperdiet lectus in, suscipit mi. Nullam accumsan dui sed suscipit euismod. Ut quis odio eu erat pretium luctus quis vel leo. Curabitur nec vestibulum sem. Vivamus pulvinar pellentesque neque, quis cursus urna scelerisque eu. Aenean congue hendrerit purus vel pellentesque. Nunc sit amet diam non lectus volutpat dictum. Vestibulum dignissim, tortor eget bibendum aliquam, enim diam porttitor nibh, et pretium tortor orci sed velit. Nam ut pretium metus, vel tincidunt nibh."},{idcodigo:2,valor:"B",descripcion:"Suspendisse a pulvinar ligula. Integer in varius lectus. Nulla eu metus justo. Pellentesque eu purus pharetra, feugiat lorem ut, fermentum nisl. Cras facilisis convallis sem, ac gravida metus volutpat eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum tortor nec lectus interdum viverra. In hac habitasse platea dictumst. Maecenas ornare, lorem eget elementum posuere, dui neque feugiat massa, sit amet molestie tortor leo eget libero. Donec sodales libero in quam hendrerit, ac dignissim leo dictum. Donec aliquet dolor est, et iaculis ipsum pretium a. Etiam ac libero ac erat lobortis molestie. Aliquam ac lorem id lorem sollicitudin tincidunt hendrerit faucibus ex. Curabitur interdum risus vitae odio pulvinar, sed elementum odio semper."},{idcodigo:3,valor:"C",descripcion:"Suspendisse ornare, purus at lacinia pretium, velit tortor venenatis nisi, at dapibus neque augue a ligula. Donec a fringilla nisl. Aenean convallis bibendum urna, sed euismod turpis rutrum non. Quisque id feugiat magna, tempus tincidunt augue. Sed sed finibus metus, id ultricies turpis. Duis eu sapien quis purus facilisis faucibus vel ut turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce a lorem suscipit lectus tincidunt pharetra sit amet id ex. Pellentesque et massa eget turpis viverra mollis. Etiam vitae congue lectus. Fusce vel ornare magna. Fusce pulvinar tempus neque. Donec porttitor dictum elit eget rutrum. Duis sit amet lacus sed nisl mattis aliquam."},{idcodigo:4,valor:"D",descripcion:"Donec imperdiet orci nunc, at cursus libero ultricies ut. Vestibulum aliquet accumsan lacinia. Etiam mollis non velit ac scelerisque. Vestibulum rutrum vel quam dignissim vulputate. Pellentesque placerat urna ut purus tempus tincidunt. Suspendisse velit nibh, pulvinar eu maximus quis, ullamcorper et ligula. Donec tristique laoreet semper. Curabitur tincidunt pellentesque lobortis. Nulla congue dictum felis, a euismod odio commodo non. Vivamus tristique cursus orci, id laoreet nunc rhoncus vitae. Aenean ullamcorper fringilla lorem a pellentesque."}]
						var cargaPlantilla = {id_pregunta: p[0].dataValues.idPregunta, enunciado: p[0].dataValues.situacionPedagogica, alternativaElaboracion: p[0].dataValues.resSituacionPedagogica, id_tipo_estimulo: 1,codigos:cods, respuestas:ca};
						cargaTotal = cargaPlantilla;
						resolve();
					})
				})	
			})
		}

		let guardarArchivos = function(id){
			var t = 0;
			return new Promise(function(resolve,reject){
				Usuario.findAll({where:{idUsuario:correctores[id]}},{raw:true}).then(function(us){
					fs.access("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", function(err){
						if(!err){
							var paquete = require("../views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json");	
							paquete.forEach(function(pq){
								if(pq.id_pregunta==cargaTotal.id_pregunta){
									pq.sesion.push({id_sesion:sesion, nombre: nombreSesion, activo:1, respuestas:{contestadas:0,duda:0,noContestadas:cargaTotal.respuestas.length}});
									fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", JSON.stringify(paquete));
									fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-"+pq.id_pregunta+"-"+sesion+".json", JSON.stringify(cargaTotal));
									resolve();
									cargaTotal=null;
									paquete = null;
								}else{
									t++;
									if(t==paquete.length){
										paquete.push({id_pregunta: cargaTotal.id_pregunta, title: forma, sesion:[{id_sesion:sesion, nombre: nombreSesion, activo:1, respuestas:{contestadas:0,duda:0,noContestadas:cargaTotal.respuestas.length}}]});
										fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", JSON.stringify(paquete));
										fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-"+pq.id_pregunta+"-"+sesion+".json", JSON.stringify(cargaTotal));
										resolve();
										t=0;
										cargaTotal=null;
										paquete = null;
									}
								}
							})
						}else{
							var paquete = [{id_pregunta: cargaTotal.id_pregunta, title: forma, sesion:[{id_sesion:sesion, nombre: nombreSesion, activo:1, respuestas:{contestadas:0,duda:0,noContestadas:cargaTotal.respuestas.length}}]}]
							fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", JSON.stringify(paquete));
							fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-"+cargaTotal.id_pregunta+"-"+sesion+".json", JSON.stringify(cargaTotal));
							resolve();
							paquete = null;
							cargaTotal = null;
						}
					})
				})
			})
		}

	},
	crearAsignacionesLenguaje: function(idSesion, team,id, fs){
		var asignaciones = [];
		var sesion = 0;
		var correctores = [];
		var cargaTotal;
		var forma = "";
		var nombreSesion = "";
		let DatosSesion = function(){
			return new Promise(function(resolve,reject){
				console.log("LLEGA A DatosSesion")
				var cont = 0;
			xls({
    			input: "./config/PRPRESPUESTAS.xlsx",  // input xls 
    			output: null, // output json 
    			sheet: "PRP"  // specific sheetname 
  			}, function(err, result) {
    			if(err) {
    				console.log("error archivo")
  					console.error(err);
    			} else {
    				result.forEach(function(per){
    					if(per.Sesion_L==idSesion  && per.Sup_L==id){
    						asignaciones.push(per);
    						cont++;
    						if(cont==result.length){
    							resolve();
    						}
    					}else{
    						cont++;
    						if(cont==result.length){
    							resolve();
    						}
    					}
   					})
   				}
  			});	
			})
			
		}

		let crearSesion = function(){
			return new Promise(function(resolve,reject){
				UsuarioEquipo.findAll({where:{idUsuario: asignaciones[0].Sup_L}},{raw:true}).then(function(ue){
					console.log(JSON.stringify(ue))
				return sequelize.transaction(function(t){
					Sesion.create({idEquipo: ue[0].dataValues.idEquipo, nombre: 'Sesión '+idSesion+' Equipo '+team}).then(function(s){
						sesion = s.dataValues.idSesion;
						nombreSesion = s.dataValues.nombre;
						resolve(s.dataValues.idEquipo);
					})
				})	
			})	
			})
			
		}


		let buscarCorrectores = function(eq){
			var c = 0;
			return new Promise(function(resolve,reject){
				UsuarioEquipo.findAll({where:{idEquipo: eq}},{raw:true}).then(function(users){
					users.forEach(function(usuario){
						if(usuario.dataValues.idUsuario!=asignaciones[0].Sup_L){
							correctores.push(usuario.dataValues.idUsuario)
							c++;
							if(c==users.length){
								resolve();
							}
						}else{
							c++;
							if(c==users.length){
								resolve();
							}
						}
					})
				})	
			})	
		}

		DatosSesion().then(function(){
			return crearSesion();
		}).then(function(e){
			return buscarCorrectores(e);
		}).then(function(){
			guardarDatos(0);
		})

		function guardarDatos(ai){
			return new Promise(function(resolve,reject){
				asignarCorrector(ai).then(function(coa){
					return creaData(coa);
				}).then(function(){
					return guardarArchivos(ai);
				}).then(function(){
					if(ai!=correctores.length-1){
						guardarDatos(ai+1);
					}
				})
			})
		}
		let asignarCorrector = function(id){
			console.log(correctores)
			var ua = 0;
			var correctorAsignaciones = [];
			return new Promise(function(resolve,reject){
				asignaciones.forEach(function(asi){
					if(correctores[id]==asi.C_Len1){
						return sequelize.transaction(function(t){
							return Asignacion.create({idRespuesta:asi.id,idUsuario:asi.C_Len1, valor: asi.Respuesta, idEstado:1,duda:'Sin duda', idSesion: sesion},{transaction:t}); 
						}).then(function(){
							correctorAsignaciones.push({id_respuesta:asi.id, valor: asi.Respuesta, id_estado:1, duda:'Sin duda', isEC: 0, tipoEC:{docente:-1, estudiante:-1, escuela:-1, otros:-1}, nivelFundamento:{ fund:-1, parcial:-1, no_fund:-1, estereotipo:-1},correccion:[]})
							ua++;
							if(ua==asignaciones.length){
								console.log("LLEGA AL RESOLVE");
								resolve(correctorAsignaciones);
							}
						})	
					}else if(correctores[id]==asi.C_Len2){
						return sequelize.transaction(function(t){
							return Asignacion.create({idRespuesta:asi.id,idUsuario:asi.C_Len2, valor: asi.Respuesta, idEstado:1,duda:'Sin duda', idSesion: sesion},{transaction:t}); 
						}).then(function(){
							correctorAsignaciones.push({id_respuesta:asi.id, valor: asi.Respuesta, id_estado:1, duda:'Sin duda', isEC: 0, tipoEC:{docente:-1, estudiante:-1, escuela:-1, otros:-1}, nivelFundamento:{ fund:-1, parcial:-1, no_fund:-1, estereotipo:-1},correccion:[]})
							ua++;
							if(ua==asignaciones.length){
								console.log("LLEGA AL RESOLVE");
								resolve(correctorAsignaciones);
							}
						})
					}else{
						ua++;
						if(ua==asignaciones.length){
							console.log("LLEGA AL RESOLVE");
							resolve(correctorAsignaciones);
						}
					}
				})
			})
		}


		let creaData = function(ca){
			console.log("LLEGA AL CREADATA")
			console.log(JSON.stringify(ca))
			return new Promise(function(resolve,reject){
				Respuesta.findAll({where:{idRespuesta:ca[0].id_respuesta}},{raw:true}).then(function(r){
					Pregunta.findAll({where:{idPregunta: r[0].dataValues.idPregunta}},{raw:true}).then(function(p){
						forma = p[0].dataValues.forma;
						var cods= [{idcodigo:1,valor:"A",descripcion:"Nam placerat dignissim convallis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sed nunc bibendum, aliquet purus sit amet, volutpat magna. Cras gravida turpis et mauris porta, non congue lorem egestas. Maecenas eget justo elementum, hendrerit dui sed, cursus felis. Morbi eu mauris quis elit pharetra dapibus. Nam at tellus commodo, imperdiet lectus in, suscipit mi. Nullam accumsan dui sed suscipit euismod. Ut quis odio eu erat pretium luctus quis vel leo. Curabitur nec vestibulum sem. Vivamus pulvinar pellentesque neque, quis cursus urna scelerisque eu. Aenean congue hendrerit purus vel pellentesque. Nunc sit amet diam non lectus volutpat dictum. Vestibulum dignissim, tortor eget bibendum aliquam, enim diam porttitor nibh, et pretium tortor orci sed velit. Nam ut pretium metus, vel tincidunt nibh."},{idcodigo:2,valor:"B",descripcion:"Suspendisse a pulvinar ligula. Integer in varius lectus. Nulla eu metus justo. Pellentesque eu purus pharetra, feugiat lorem ut, fermentum nisl. Cras facilisis convallis sem, ac gravida metus volutpat eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum tortor nec lectus interdum viverra. In hac habitasse platea dictumst. Maecenas ornare, lorem eget elementum posuere, dui neque feugiat massa, sit amet molestie tortor leo eget libero. Donec sodales libero in quam hendrerit, ac dignissim leo dictum. Donec aliquet dolor est, et iaculis ipsum pretium a. Etiam ac libero ac erat lobortis molestie. Aliquam ac lorem id lorem sollicitudin tincidunt hendrerit faucibus ex. Curabitur interdum risus vitae odio pulvinar, sed elementum odio semper."},{idcodigo:3,valor:"C",descripcion:"Suspendisse ornare, purus at lacinia pretium, velit tortor venenatis nisi, at dapibus neque augue a ligula. Donec a fringilla nisl. Aenean convallis bibendum urna, sed euismod turpis rutrum non. Quisque id feugiat magna, tempus tincidunt augue. Sed sed finibus metus, id ultricies turpis. Duis eu sapien quis purus facilisis faucibus vel ut turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce a lorem suscipit lectus tincidunt pharetra sit amet id ex. Pellentesque et massa eget turpis viverra mollis. Etiam vitae congue lectus. Fusce vel ornare magna. Fusce pulvinar tempus neque. Donec porttitor dictum elit eget rutrum. Duis sit amet lacus sed nisl mattis aliquam."},{idcodigo:4,valor:"D",descripcion:"Donec imperdiet orci nunc, at cursus libero ultricies ut. Vestibulum aliquet accumsan lacinia. Etiam mollis non velit ac scelerisque. Vestibulum rutrum vel quam dignissim vulputate. Pellentesque placerat urna ut purus tempus tincidunt. Suspendisse velit nibh, pulvinar eu maximus quis, ullamcorper et ligula. Donec tristique laoreet semper. Curabitur tincidunt pellentesque lobortis. Nulla congue dictum felis, a euismod odio commodo non. Vivamus tristique cursus orci, id laoreet nunc rhoncus vitae. Aenean ullamcorper fringilla lorem a pellentesque."}]
						var cargaPlantilla = [{id_pregunta: p[0].dataValues.idPregunta, enunciado: p[0].dataValues.situacionPedagogica, alternativaElaboracion: p[0].dataValues.resSituacionPedagogica, id_tipo_estimulo: 1,codigos:cods, respuestas:ca}];
						cargaTotal = cargaPlantilla;
						resolve();
					})
				})	
			})
		}

		let guardarArchivos = function(id){
			var t = 0;
			return new Promise(function(resolve,reject){
				Usuario.findAll({where:{idUsuario:correctores[id]}},{raw:true}).then(function(us){
					fs.access("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", function(err){
						if(!err){
							var paquete = require("../views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json");	
							paquete.forEach(function(pq){
								if(pq.id_pregunta==cargaTotal[0].id_pregunta){
									pq.sesion.push({id_sesion:sesion, nombre: nombreSesion, activo:1, respuestas:{contestadas:0,duda:0,noContestadas:cargaTotal[0].respuestas.length}});
									fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", JSON.stringify(paquete));
									fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-"+pq.id_pregunta+"-"+sesion+".json", JSON.stringify(cargaTotal));
									resolve();
									cargaTotal=null;
									paquete = null;
								}else{
									t++;
									if(t==paquete.length){
										paquete.push({id_pregunta: cargaTotal[0].id_pregunta, title: forma, sesion:[{id_sesion:sesion, nombre: nombreSesion, activo:1, respuestas:{contestadas:0,duda:0,noContestadas:cargaTotal[0].respuestas.length}}]});
										fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", JSON.stringify(paquete));
										fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-"+pq.id_pregunta+"-"+sesion+".json", JSON.stringify(cargaTotal));
										resolve();
										t=0;
										cargaTotal=null;
										paquete = null;
									}
								}
							})
						}else{
							var paquete = [{id_pregunta: cargaTotal[0].id_pregunta, title: forma, sesion:[{id_sesion:sesion, nombre: nombreSesion, activo:1, respuestas:{contestadas:0,duda:0,noContestadas:cargaTotal[0].respuestas.length}}]}]
							fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", JSON.stringify(paquete));
							fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-"+cargaTotal[0].id_pregunta+"-"+sesion+".json", JSON.stringify(cargaTotal));
							resolve();
							paquete = null;
							cargaTotal = null;
						}
					})
				})
			})
		}
		
	},
	repetirAsignacionesLenguaje: function(idSesion, team,id,fs){
		var asignaciones = [];
		var sesion = 0;
		var correctores = [];
		var cargaTotal;
		var forma = "";
		var nombreSesion = "";
		var sesionAntigua = 0;
		let DatosSesion = function(){
			return new Promise(function(resolve,reject){
				console.log("LLEGA A DatosSesion")
				var cont = 0;
			xls({
    			input: "./config/PRPRESPUESTAS.xlsx",  // input xls 
    			output: null, // output json 
    			sheet: "PRP"  // specific sheetname 
  			}, function(err, result) {
    			if(err) {
    				console.log("error archivo")
  					console.error(err);
    			} else {
    				result.forEach(function(per){
    					if(per.Sesion_L==idSesion  && per.Sup_L==id){
    						asignaciones.push(per);
    						cont++;
    						if(cont==result.length){
    							resolve();
    						}
    					}else{
    						cont++;
    						if(cont==result.length){
    							resolve();
    						}
    					}
   					})
   				}
  			});	
			})
			
		}

		let crearSesion = function(){
			return new Promise(function(resolve,reject){
				UsuarioEquipo.findAll({where:{idUsuario: asignaciones[0].Sup_L}},{raw:true}).then(function(ue){
					console.log(JSON.stringify(ue))
				return sequelize.transaction(function(t){
					Sesion.create({idEquipo: ue[0].dataValues.idEquipo, nombre: 'Sesión '+idSesion+' Equipo '+team}).then(function(s){
						sesion = s.dataValues.idSesion;
						nombreSesion = s.dataValues.nombre;
						resolve(s.dataValues.idEquipo);
					})
				})	
			})	
			})
			
		}

		let borrarSesionAntigua = function(){
			return new Promise(function(resolve,reject){
				sequelize.query("SELECT * FROM `sesion` WHERE `nombre` LIKE '%Sesíon "+idSesion+" Equipo "+team+"%' AND `activo`=1",{model:Sesion}).then(function(sa){
					console.log(sa)
					sesionAntigua=sa[0].dataValues.id_sesion;
					Sesion.update({activo:0},{where:{idSesion:sa[0].dataValues.id_sesion}}).then(function(){
						Asignacion.update({activo:0},{where:{idSesion:sa[0].dataValues.id_sesion}}).then(function(){
							resolve();
						})
					})
				})	
			})
			
		}

		let buscarCorrectores = function(eq){
			var c = 0;
			return new Promise(function(resolve,reject){
				UsuarioEquipo.findAll({where:{idEquipo: eq}},{raw:true}).then(function(users){
					users.forEach(function(usuario){
						if(usuario.dataValues.idUsuario!=asignaciones[0].Sup_L){
							correctores.push(usuario.dataValues.idUsuario)
							c++;
							if(c==users.length){
								resolve();
							}
						}else{
							c++;
							if(c==users.length){
								resolve();
							}
						}
					})
				})	
			})	
		}

		DatosSesion().then(function(){
			return borrarSesionAntigua();			
		}).then(function(){
			return crearSesion();
		}).then(function(e){
			return buscarCorrectores(e);
		}).then(function(){
			guardarDatos(0);
		})

		function guardarDatos(ai){
			return new Promise(function(resolve,reject){
				asignarCorrector(ai).then(function(coa){
					return creaData(coa);
				}).then(function(){
					return guardarArchivos(ai);
				}).then(function(){
					if(ai!=correctores.length-1){
						guardarDatos(ai+1);
					}
				})
			})
		}
		let asignarCorrector = function(id){
			console.log(correctores)
			var ua = 0;
			var correctorAsignaciones = [];
			return new Promise(function(resolve,reject){
				asignaciones.forEach(function(asi){
					if(correctores[id]==asi.C_Len1){
						return sequelize.transaction(function(t){
							return Asignacion.create({idRespuesta:asi.id,idUsuario:asi.C_Len1, valor: asi.Respuesta, idEstado:1,duda:'Sin duda', idSesion: sesion},{transaction:t}); 
						}).then(function(){
							correctorAsignaciones.push({id_respuesta:asi.id, valor: asi.Respuesta, id_estado:1, duda:'Sin duda', isEC: 0, tipoEC:{docente:-1, estudiante:-1, escuela:-1, otros:-1}, nivelFundamento:{ fund:-1, parcial:-1, no_fund:-1, estereotipo:-1},correccion:[]})
							ua++;
							if(ua==asignaciones.length){
								console.log("LLEGA AL RESOLVE");
								resolve(correctorAsignaciones);
							}
						})	
					}else if(correctores[id]==asi.C_Len2){
						return sequelize.transaction(function(t){
							return Asignacion.create({idRespuesta:asi.id,idUsuario:asi.C_Len2, valor: asi.Respuesta, idEstado:1,duda:'Sin duda', idSesion: sesion},{transaction:t}); 
						}).then(function(){
							correctorAsignaciones.push({id_respuesta:asi.id, valor: asi.Respuesta, id_estado:1, duda:'Sin duda', isEC: 0, tipoEC:{docente:-1, estudiante:-1, escuela:-1, otros:-1}, nivelFundamento:{ fund:-1, parcial:-1, no_fund:-1, estereotipo:-1},correccion:[]})
							ua++;
							if(ua==asignaciones.length){
								console.log("LLEGA AL RESOLVE");
								resolve(correctorAsignaciones);
							}
						})
					}else{
						ua++;
						if(ua==asignaciones.length){
							console.log("LLEGA AL RESOLVE");
							resolve(correctorAsignaciones);
						}
					}
				})
			})
		}


		let creaData = function(ca){
			console.log("LLEGA AL CREADATA")
			console.log(JSON.stringify(ca))
			return new Promise(function(resolve,reject){
				Respuesta.findAll({where:{idRespuesta:ca[0].id_respuesta}},{raw:true}).then(function(r){
					Pregunta.findAll({where:{idPregunta: r[0].dataValues.idPregunta}},{raw:true}).then(function(p){
						forma = p[0].dataValues.forma;
						var cods= [{idcodigo:1,valor:"A",descripcion:"Nam placerat dignissim convallis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sed nunc bibendum, aliquet purus sit amet, volutpat magna. Cras gravida turpis et mauris porta, non congue lorem egestas. Maecenas eget justo elementum, hendrerit dui sed, cursus felis. Morbi eu mauris quis elit pharetra dapibus. Nam at tellus commodo, imperdiet lectus in, suscipit mi. Nullam accumsan dui sed suscipit euismod. Ut quis odio eu erat pretium luctus quis vel leo. Curabitur nec vestibulum sem. Vivamus pulvinar pellentesque neque, quis cursus urna scelerisque eu. Aenean congue hendrerit purus vel pellentesque. Nunc sit amet diam non lectus volutpat dictum. Vestibulum dignissim, tortor eget bibendum aliquam, enim diam porttitor nibh, et pretium tortor orci sed velit. Nam ut pretium metus, vel tincidunt nibh."},{idcodigo:2,valor:"B",descripcion:"Suspendisse a pulvinar ligula. Integer in varius lectus. Nulla eu metus justo. Pellentesque eu purus pharetra, feugiat lorem ut, fermentum nisl. Cras facilisis convallis sem, ac gravida metus volutpat eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum tortor nec lectus interdum viverra. In hac habitasse platea dictumst. Maecenas ornare, lorem eget elementum posuere, dui neque feugiat massa, sit amet molestie tortor leo eget libero. Donec sodales libero in quam hendrerit, ac dignissim leo dictum. Donec aliquet dolor est, et iaculis ipsum pretium a. Etiam ac libero ac erat lobortis molestie. Aliquam ac lorem id lorem sollicitudin tincidunt hendrerit faucibus ex. Curabitur interdum risus vitae odio pulvinar, sed elementum odio semper."},{idcodigo:3,valor:"C",descripcion:"Suspendisse ornare, purus at lacinia pretium, velit tortor venenatis nisi, at dapibus neque augue a ligula. Donec a fringilla nisl. Aenean convallis bibendum urna, sed euismod turpis rutrum non. Quisque id feugiat magna, tempus tincidunt augue. Sed sed finibus metus, id ultricies turpis. Duis eu sapien quis purus facilisis faucibus vel ut turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce a lorem suscipit lectus tincidunt pharetra sit amet id ex. Pellentesque et massa eget turpis viverra mollis. Etiam vitae congue lectus. Fusce vel ornare magna. Fusce pulvinar tempus neque. Donec porttitor dictum elit eget rutrum. Duis sit amet lacus sed nisl mattis aliquam."},{idcodigo:4,valor:"D",descripcion:"Donec imperdiet orci nunc, at cursus libero ultricies ut. Vestibulum aliquet accumsan lacinia. Etiam mollis non velit ac scelerisque. Vestibulum rutrum vel quam dignissim vulputate. Pellentesque placerat urna ut purus tempus tincidunt. Suspendisse velit nibh, pulvinar eu maximus quis, ullamcorper et ligula. Donec tristique laoreet semper. Curabitur tincidunt pellentesque lobortis. Nulla congue dictum felis, a euismod odio commodo non. Vivamus tristique cursus orci, id laoreet nunc rhoncus vitae. Aenean ullamcorper fringilla lorem a pellentesque."}]
						var cargaPlantilla = [{id_pregunta: p[0].dataValues.idPregunta, enunciado: p[0].dataValues.situacionPedagogica, alternativaElaboracion: p[0].dataValues.resSituacionPedagogica, id_tipo_estimulo: 1,codigos:cods, respuestas:ca}];
						cargaTotal = cargaPlantilla;
						resolve();
					})
				})	
			})
		}

		let guardarArchivos = function(id){
			var t = 0;
			return new Promise(function(resolve,reject){
				Usuario.findAll({where:{idUsuario:correctores[id]}},{raw:true}).then(function(us){
					fs.access("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", function(err){
						if(!err){
							var paquete = require("../views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json");	
							paquete.forEach(function(pq){
								if(pq.id_pregunta==cargaTotal[0].id_pregunta){
									pq.sesion.forEach(function(sesiones){
										if(sesiones.id_sesion==sesionAntigua){
											sesiones.id_sesion=sesion;
											sesiones.nombre= nombreSesion;
											sesiones.respuestas= {contestadas:0,duda:0,noContestadas:cargaTotal[0].respuestas.length};
											fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-paquetes.json", JSON.stringify(paquete));
											fs.writeFile("./views/persistence/"+us[0].dataValues.nombre+"-"+us[0].dataValues.apellidoPaterno+"-"+us[0].dataValues.apellidoMaterno+"-"+pq.id_pregunta+"-"+sesion+".json", JSON.stringify(cargaTotal));
											resolve();
											cargaTotal=null;
											paquete = null;
										}
									})
								}
							})
						}else{
							console.log("NO HAY ARCHIVO")
						}
					})
				})
			})
		}
			
	},
	importarSupervisores: function(){
		xls({
    		input: "./config/supervisores.xlsx",  // input xls 
    		output: null, // output json 
    		sheet: "Supervisores_Pedagogia"  // specific sheetname 
  		}, function(err, result) {
    		if(err) {
    			console.log("error archivo")
  				console.error(err);
    		} else {
    			result.forEach(function(per){
    				if(per.Especialidad.indexOf("Lenguaje")!=-1){
    					if(per.id=53){
    						return sequelize.transaction(function(t){
    							return Usuario.create({idUsuario: per.id, idTipoUsuario:1, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.nombre, apellidoPaterno: per.paterno, apellidoMaterno: per.materno, email: per.Correo, especialidad: per.Especialidad}).then(function(){
    								return UsuarioEquipo.create({idUsuario: per.id, idEquipo:6})
    							})
    						})
    					}else{
    						return sequelize.transaction(function(t){
    							return Usuario.create({idUsuario: per.id, idTipoUsuario:1, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.nombre, apellidoPaterno: per.paterno, apellidoMaterno: per.materno, email: per.Correo, especialidad: per.Especialidad}).then(function(){
    								return UsuarioEquipo.create({idUsuario: per.id, idEquipo:7})
    							})
    						})
    					}
    				}else if(per.Especialidad.indexOf("Parvularia")!=-1){
    					return sequelize.transaction(function(t){
    						return Usuario.create({idUsuario: per.id, idTipoUsuario:1, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.nombre, apellidoPaterno: per.paterno, apellidoMaterno: per.materno, email: per.Correo, especialidad: per.Especialidad}).then(function(){
    							return UsuarioEquipo.create({idUsuario: per.id, idEquipo:4})
    						})
    					})
    				}else if(per.Especialidad.indexOf("Básica")!=-1){
    					return sequelize.transaction(function(t){
    						return Usuario.create({idUsuario: per.id, idTipoUsuario:1, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.nombre, apellidoPaterno: per.paterno, apellidoMaterno: per.materno, email: per.Correo, especialidad: per.Especialidad}).then(function(){
    							return UsuarioEquipo.create({idUsuario: per.id, idEquipo:2})
    						})
    					})
    				}else if(per.Especialidad.indexOf("Media")!=-1){
    					return sequelize.transaction(function(t){
    						return Usuario.create({idUsuario: per.id, idTipoUsuario:1, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.nombre, apellidoPaterno: per.paterno, apellidoMaterno: per.materno, email: per.Correo, especialidad: per.Especialidad}).then(function(){
    							return UsuarioEquipo.create({idUsuario: per.id, idEquipo:3})
    						})
    					})
    				}else if(per.Especialidad.indexOf("Especial")!=-1){
    					return sequelize.transaction(function(t){
    						return Usuario.create({idUsuario: per.id, idTipoUsuario:1, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.nombre, apellidoPaterno: per.paterno, apellidoMaterno: per.materno, email: per.Correo, especialidad: per.Especialidad}).then(function(){
    							return UsuarioEquipo.create({idUsuario: per.id, idEquipo:5})
    						})
    					})
    				}
    			})
    		}
  		});
	},
	importarCorrectores: function(){
		xls({
    		input: "./config/correctores.xlsx",  // input xls 
    		output: null, // output json 
    		sheet: "Correctores_Lenguaje"  // specific sheetname 
  		}, function(err, result) {
    		if(err) {
    			console.log("error archivo")
  				console.error(err);
    		} else {
    			result.forEach(function(per){
    				if(per.Especialidad.indexOf("Básica")!=-1){
    					return sequelize.transaction(function(t){
    						return Usuario.create({idUsuario: per.id, idTipoUsuario:2, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.Nombre, apellidoPaterno: per.Primer_apellido, apellidoMaterno: per.Segundo_apellido, email: per.Correo, especialidad: per.Especialidad}).then(function(u){
    							return UsuarioEquipo.create({idUsuario:per.id, idEquipo: 2})
    						})
    					})
    				}else if(per.Especialidad.indexOf("Parvularia")!=-1){
    					return sequelize.transaction(function(t){
    						return Usuario.create({idUsuario: per.id, idTipoUsuario:2, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.Nombre, apellidoPaterno: per.Primer_apellido, apellidoMaterno: per.Segundo_apellido, email: per.Correo, especialidad: per.Especialidad}).then(function(u){
    							return UsuarioEquipo.create({idUsuario:per.id, idEquipo: 4})
    						})
    					})
    				}else if(per.Especialidad.indexOf("Media")!=-1){
    					return sequelize.transaction(function(t){
    						return Usuario.create({idUsuario: per.id, idTipoUsuario:2, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.Nombre, apellidoPaterno: per.Primer_apellido, apellidoMaterno: per.Segundo_apellido, email: per.Correo, especialidad: per.Especialidad}).then(function(u){
    							return UsuarioEquipo.create({idUsuario:per.id, idEquipo: 3})
    						})
    					})
    				}else if(per.Especialidad.indexOf("Especial")!=-1){
    					return sequelize.transaction(function(t){
    						return Usuario.create({idUsuario: per.id, idTipoUsuario:2, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.Nombre, apellidoPaterno: per.Primer_apellido, apellidoMaterno: per.Segundo_apellido, email: per.Correo, especialidad: per.Especialidad}).then(function(u){
    							return UsuarioEquipo.create({idUsuario:per.id, idEquipo: 5})
    						})
    					})
    				}else if(per.Especialidad.indexOf("Lenguaje")!=-1){
    					if(per.Supervisor==53){
    						return sequelize.transaction(function(t){
    							return Usuario.create({idUsuario: per.id, idTipoUsuario:2, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.nombre, apellidoPaterno: per.paterno, apellidoMaterno: per.materno, email: per.Correo, especialidad: per.Especialidad}).then(function(u){
    								return UsuarioEquipo.create({idUsuario:per.id, idEquipo: 6})
    							})
    						})
    					}else{
    						return sequelize.transaction(function(t){
    							return Usuario.create({idUsuario: per.id, idTipoUsuario:2, usuario: per.Correo, contrasena:'codificacion2018', nombre: per.Nombre, apellidoPaterno: per.Primer_apellido, apellidoMaterno: per.Segundo_apellido, email: per.Correo, especialidad: per.Especialidad}).then(function(u){
    								return UsuarioEquipo.create({idUsuario:per.id, idEquipo: 7})
    							})
    						})
    					}
    				}
    				
   				})
   			}
  		});
	},
	importarExcelUsers: function(){
		var cod = 0;
		xls({
    		input: "./config/PRPRESPUESTAS.xlsx",  // input xls 
    		output: null, // output json 
    		sheet: "PRP"  // specific sheetname 
  		}, function(err, result) {
    		if(err) {
    			console.log("error archivo")
  				console.error(err);
    		} else {
    			result.forEach(function(per){
    				if(per.Nivel.indexOf("Básica")!=-1){
    					if(per.Forma.indexOf("A")!=-1){
    						return sequelize.transaction(function(t){
    							return Alumno.create({run:per.RUN},{transaction:t}).then(function(al){
    								return Respuesta.create({idRespuesta: per.id, idPregunta:3, idAlumno: al.dataValues.idAlumno, valor: per.Respuesta},{transaction:t})
    							})
    						})
    					}else{
    						return sequelize.transaction(function(t){
    							return Alumno.create({run:per.RUN},{transaction:t}).then(function(al){
    								return Respuesta.create({idRespuesta: per.id, idPregunta:4, idAlumno: al.dataValues.idAlumno, valor: per.Respuesta},{transaction:t})
    							})
    						})
    					}
    				}else if(per.Nivel.indexOf("Parvularia")!=-1){
    					if(per.Forma.indexOf("A")!=-1){
    						return sequelize.transaction(function(t){
    							return Alumno.create({run:per.RUN},{transaction:t}).then(function(al){
    								return Respuesta.create({idRespuesta: per.id, idPregunta:1, idAlumno: al.dataValues.idAlumno, valor: per.Respuesta},{transaction:t})
    							})
    						})
    					}else{
    						return sequelize.transaction(function(t){
    							return Alumno.create({run:per.RUN},{transaction:t}).then(function(al){
    								return Respuesta.create({idRespuesta: per.id, idPregunta:2, idAlumno: al.dataValues.idAlumno, valor: per.Respuesta},{transaction:t})
    							})
    						})
    					}
    				}else if(per.Nivel.indexOf("Media")!=-1){
    					if(per.Forma.indexOf("A")!=-1){
    						return sequelize.transaction(function(t){
    							return Alumno.create({run:per.RUN},{transaction:t}).then(function(al){
    								return Respuesta.create({idRespuesta: per.id, idPregunta:5, idAlumno: al.dataValues.idAlumno, valor: per.Respuesta},{transaction:t})
    							})
    						})
    					}else{
    						return sequelize.transaction(function(t){
    							return Alumno.create({run:per.RUN},{transaction:t}).then(function(al){
    								return Respuesta.create({idRespuesta: per.id, idPregunta:6, idAlumno: al.dataValues.idAlumno, valor: per.Respuesta},{transaction:t})
    							})
    						})
    					}
    				}else if(per.Nivel.indexOf("Especial")!=-1){
    					if(per.Forma.indexOf("A")!=-1){
    						return sequelize.transaction(function(t){
    							return Alumno.create({run:per.RUN},{transaction:t}).then(function(al){
    								return Respuesta.create({idRespuesta: per.id, idPregunta:7, idAlumno: al.dataValues.idAlumno, valor: per.Respuesta},{transaction:t})
    							})
    						})
    					}else{
    						return sequelize.transaction(function(t){
    							return Alumno.create({run:per.RUN},{transaction:t}).then(function(al){
    								return Respuesta.create({idRespuesta: per.id, idPregunta:8, idAlumno: al.dataValues.idAlumno, valor: per.Respuesta},{transaction:t})
    							})
    						})
    					}
    				}
    				
   				})
   			}
  		});
	},
	importarExcelUsuario: function(){
		var cod = 0;
		xls({
    		input: "./config/educacion especial.xlsx",  // input xls 
    		output: "./config/lista.json", // output json 
    		sheet: "hoja1"  // specific sheetname 
  		}, function(err, result) {
    		if(err) {
    			console.log("error archivo")
  				console.error(err);
    		} else {
    			result.forEach(function(per){
    				if(per!=undefined){
    					return sequelize.transaction(function(t){
    						return Alumno.create({nombre: per.Nombres, apellidos: per.Apellidos, run: per.RUN,email: per.Correo},{transaction: t}).then(function(re){
    							if(per.ALT_ELAB.indexOf("A")!= -1){
    								if(per.A.replace(" ","").length==0){
    									return Respuesta.create({idPregunta: 7, idAlumno: re.dataValues.idAlumno, valor:'Sin respuesta'},{transaction: t})
    								}else{
    									return Respuesta.create({idPregunta: 7, idAlumno: re.dataValues.idAlumno, valor: per.A},{transaction: t})
    								}
    							}else if(per.ALT_ELAB.indexOf("B")!= -1){
    								if(per.B.replace(" ","").length==0){
    									return Respuesta.create({idPregunta: 8, idAlumno: re.dataValues.idAlumno, valor: 'Sin respuesta'},{transaction: t})
    								}else{
    									return Respuesta.create({idPregunta: 8, idAlumno: re.dataValues.idAlumno, valor: per.B},{transaction: t})
    								}
    							}else{
    								return Respuesta.create({idPregunta: 12, idAlumno: re.dataValues.idAlumno, valor: 'No responde'},{transaction: t})
    							}
    						})
    					})
    				}
   				})
   			}
  		});
	},
	tablaPorRespuesta: function(idEquipo, nombre, fs, io, socket){
		var ses = [];
		var tabla = [];

		let obtenerSesiones = function(){
			var contS = 0;
			return new Promise(function(resolve,reject){
				Sesion.findAll({where:{idEquipo: idEquipo, activo: 1}},{raw:true}).then(function(s){
					s.forEach(function(se){
						ses.push(se.dataValues.idSesion);
						contS++;
						if(contS==s.length){
							console.log(ses)
							resolve();
						}
					})
				})
			})
		}


		obtenerSesiones().then(function(){
			crearTabla();
		})

		function crearTabla(){
			var dataSesion = null;
			var idPregunta = 0;
			
			let sesion = function(id){
				var conTabla = 0;
				var existe = false;
				return new Promise(function(resolve,reject){
					Sesion.findAll({where:{idSesion: ses[id]}},{raw:true}).then(function(sid){
						dataSesion = {id_sesion: ses[id], nombre: sid[0].dataValues.nombre, asignacion:[]}
					})
					sequelize.query('SELECT * from `asignacion` WHERE `id_sesion`='+ses[id]+' AND `activo`=1 ORDER BY `id_respuesta` ASC;',{model:Asignacion}).then(function(re){
						Respuesta.findAll({where:{idRespuesta:re[0].dataValues.id_respuesta}},{raw:true}).then(function(r){
							Pregunta.findAll({where:{idPregunta: r[0].dataValues.idPregunta}},{raw:true}).then(function(pr){
								if(tabla.length==0){
									idPregunta = pr[0].dataValues.idPregunta; 
									tabla.push({id_pregunta: pr[0].dataValues.idPregunta, pregunta: "AGREGAR DATO", sesiones:[]})
									resolve(re);
								}else{
									tabla.forEach(function(preguntas){
										if(preguntas.id_pregunta==pr[0].dataValues.idPregunta){
											asignaciones = null;
											asignaciones = re;
											existe = true;
											conTabla++;
											if(conTabla==tabla.length){
												if(existe==true){
													existe = false;
													conTabla = 0;
													idPregunta = pr[0].dataValues.idPregunta; 
													resolve(re)
												}else{
													idPregunta = pr[0].dataValues.idPregunta;
													existe = false;
													conTabla = 0;
													tabla.push({id_pregunta: pr[0].dataValues.idPregunta, pregunta: pr[0].dataValues.forma, sesiones:[]})
													resolve(re)
												}
												
											}
										}else{
											conTabla++;
											if(conTabla==tabla.length){
												if(existe==true){
													existe = false;
													conTabla = 0;
													idPregunta = pr[0].dataValues.idPregunta; 
													resolve(re)
												}else{
													idPregunta = pr[0].dataValues.idPregunta; 
													existe = false;
													conTabla = 0;
													tabla.push({id_pregunta: pr[0].dataValues.idPregunta, pregunta: pr[0].dataValues.forma, sesiones:[]})
													resolve(re)
												}	
											}
										}
									})
								}
							})
						})
					})
				})
			}

			let correccionSesion = function(asignaciones){
				return new Promise(function(resolve,reject){
					var dataCorrecciones = [];
					var contAsig = 0;
					asignaciones.forEach(function(asi, indi){
						if(indi<asignaciones.length-1 && (indi==0 || indi%2==0)){
						AsignacionCodigo.findAll({where:{idAsignacion: asi.dataValues.id_asignacion}},{raw:true}).then(function(au){
							AsignacionCodigo.findAll({where:{idAsignacion: asignaciones[indi+1].dataValues.id_asignacion}},{raw:true}).then(function(ad){
								if(au.length!=0 && ad.length!=0){
									dataCorrecciones.push({id_respuesta: asi.dataValues.id_respuesta, correcciones:[{id_usuario: asi.dataValues.id_usuario, codigo: au[0].dataValues.idCodigo},{id_usuario: asignaciones[indi+1].dataValues.id_usuario, codigo: ad[0].dataValues.idCodigo}]})
									contAsig = contAsig+2;
									if(contAsig==asignaciones.length){
										resolve(dataCorrecciones)
										dataCorrecciones = [];
										contAsig = 0;
									}
								}else if(au.length==0 && ad.length==0){
									dataCorrecciones.push({id_respuesta: asi.dataValues.id_respuesta, correcciones:[{id_usuario: asi.dataValues.id_usuario, codigo: 0},{id_usuario: asignaciones[indi+1].dataValues.id_usuario, codigo: 0}]})
									contAsig = contAsig+2;
									if(contAsig==asignaciones.length){
										resolve(dataCorrecciones)
										dataCorrecciones =null;
										contAsig = 0;
									}
								}else if(au.length!=0 && ad.length==0){
									dataCorrecciones.push({id_respuesta: asi.dataValues.id_respuesta, correcciones:[{id_usuario: asi.dataValues.id_usuario, codigo: au[0].dataValues.idCodigo},{id_usuario: asignaciones[indi+1].dataValues.id_usuario, codigo: 0}]})
									contAsig = contAsig+2;
									if(contAsig==asignaciones.length){
										resolve(dataCorrecciones)
										dataCorrecciones = null;
										contAsig = 0;
									}
								}else if(au.length==0 && ad.length!=0){
									dataCorrecciones.push({id_respuesta: asi.dataValues.id_respuesta, correcciones:[{id_usuario: asi.dataValues.id_usuario, codigo: 0},{id_usuario: asignaciones[indi+1].dataValues.id_usuario, codigo: ad[0].dataValues.idCodigo}]})
									contAsig = contAsig+2;
									if(contAsig==asignaciones.length){
										resolve(dataCorrecciones)
										dataCorrecciones = null;
										contAsig = 0;
									}
								}
							})
						})
						}
					})
				})
			}

			let asignarCodigo = function(coSe){

				var c = 0;
				return new Promise(function(resolve,reject){
					coSe.forEach(function(corr){
						if(corr.correcciones[0].codigo!=0  && corr.correcciones[1].codigo!=0){
							Codigo.findAll({where:{idCodigo: corr.correcciones[0].codigo}},{raw:true}).then(function(cu){
								Codigo.findAll({where:{idCodigo: corr.correcciones[1].codigo}},{raw:true}).then(function(cd){
									corr.correcciones[0].codigo = cu[0].dataValues.valor;
									corr.correcciones[1].codigo = cd[0].dataValues.valor;
									c++;
									if(c==coSe.length){
										resolve(coSe);
										c = 0;
									}
								})
							})
						}else if(corr.correcciones[0].codigo==0  && corr.correcciones[1].codigo==0){
							corr.correcciones[0].codigo = '-';
							corr.correcciones[1].codigo = '-';
							c++;
							if(c==coSe.length){
								resolve(coSe);
								c = 0;
							}
						}else if(corr.correcciones[0].codigo!=0  && corr.correcciones[1].codigo==0){
							Codigo.findAll({where:{idCodigo: corr.correcciones[0].codigo}},{raw:true}).then(function(cu){
								corr.correcciones[0].codigo = cu[0].dataValues.valor;
								corr.correcciones[1].codigo = '-';
								c++;
								if(c==coSe.length){
									resolve(coSe);
									c = 0;
								}
							})
						}else if(corr.correcciones[0].codigo==0  && corr.correcciones[1].codigo!=0){
							Codigo.findAll({where:{idCodigo: corr.correcciones[1].codigo}},{raw:true}).then(function(cd){
								corr.correcciones[0].codigo = '-';
								corr.correcciones[1].codigo = cd[0].dataValues.valor;
								c++;
								if(c==coSe.length){
									resolve(coSe);
									c = 0;
								}
							})
						}
					})
				})
			}

			let agregarSesion = function(correc){
				return new Promise(function(resolve,reject){
					dataSesion.asignacion = correc;
					tabla.forEach(function(t){
						if(idPregunta == t.id_pregunta){
							t.sesiones.push(dataSesion)
							resolve();
						}
					})
				})
			}

			function cicloTabla(id){
				return new Promise(function(resolve,reject){
					sesion(id).then(function(ret){
						return correccionSesion(ret);
					}).then(function(core){
						return asignarCodigo(core);
					}).then(function(cr){
						return agregarSesion(cr);
					}).then(function(){
						if(id==ses.length-1){
							fs.writeFile("./views/persistence/"+nombre+"-Respuesta.json", JSON.stringify(tabla))
							io.to(socket).emit('Archivos Creados',{estado:'ok'})
						}else{
							console.log("ID DEL CICLO "+id)
							var asignaciones = [];
							var dataSesion;
							var idPregunta = 0;
							var ide = id+1
							cicloTabla(ide)
						}
					})
				})
			}

			cicloTabla(0);
		}
	},
	matrizAsignaciones: function(idEquipo, nombre, fs, supervisor){

		var tablaCorrector = [];
		var matriz = [];
		var arreglo = [];
		var cont = 0;
		var sesiones = [];
		var arrayCorrector = [];
		var contM = 0;
		var contC = 0;
		var correctores = [];
		var se = 0;
		var idPreg = 0;


		let sesionesEquipo = function(team){
			var contSesion = 0;
			return new Promise(function(resolve,reject){
				Sesion.findAll({where:{idEquipo: team, activo:1}},{raw:true}).then(function(ses){
					ses.forEach(function(s){
						sesiones.push(s.dataValues.idSesion);
						contSesion++;
						if(contSesion==ses.length){
							resolve();
						}
					})
				})
			})
		}

		sesionesEquipo(idEquipo).then(function(){
			sesionesTeam(0);
		});


		function sesionesTeam(d){
			return new Promise(function(resolve,reject){
				porSesion(d).then(function(){
					return matrizSesion(0);
				}).then(function(){
					return tablaPregunta();
				}).then(function(){
					return consistenciaSesion();
				}).then(function(c){
					return codigosCorrector(c);
				}).then(function(cotor){
					return asignadasCorrector(cotor);
				}).then(function(s){
					return agregarSesionTabla(s);
				}).then(function(){
					if(d==sesiones.length-1){
						fs.writeFile("./views/persistence/"+nombre+"-Corrector.json",JSON.stringify(tablaCorrector))
					}else{
						console.log("HACE CICLO MATRIZ")
						matriz = [];
						arreglo = [];
					 	cont = 0;
						arrayCorrector = [];
						contM = 0;
						contC = 0;
						correctores =[];
						var ide = d+1;
						sesionesTeam(ide);
					}
				})
			})
		}

		function porSesion(id){
			return new Promise(function(resolve,reject){
				asigna(id).then(function(){
					return corrector();
				}).then(function(){
					resolve();
				})
			})
		}
		function matrizSesion(p){
			return new Promise(function(resolve,reject){
				prueba(p);
				function prueba(d){
					asignacionesCorrector(d).then(function(o){
						if(o==correctores.length-1){
							resolve();
						}else{
							prueba(o+1)
						}
					})
				}
			})	
		}

		let asigna = function(idSesion){
			arreglo = null;
			arreglo = [];
			return new Promise(function(resolve,reject){
				sequelize.query('SELECT * from `asignacion` WHERE `id_sesion`='+sesiones[idSesion]+' AND `activo`=1 GROUP BY `id_respuesta`;',{model:Asignacion}).then(function(a){
					se = sesiones[idSesion]
					a.forEach(function(asignacion){
						if(cont==0){
							arreglo.push(null)
							arreglo.push(asignacion.dataValues.id_respuesta)
							cont++;
						}else{
							arreglo.push(asignacion.dataValues.id_respuesta);
							cont++;
							if(cont==a.length){
								matriz.push(arreglo);
								cont=0;
								resolve();
							}
						}
					})
				})
			})
		}

		let corrector = function(){
			correctores = null;
			correctores = [];
			return new Promise(function(resolve,reject){
				sequelize.query('SELECT * from `asignacion` WHERE `id_sesion`='+se+' AND `activo`=1 GROUP BY `id_usuario`;',{model:Asignacion}).then(function(c){
					c.forEach(function(corrector){
						if(corrector.dataValues.id_usuario!=supervisor){
						correctores.push(corrector.dataValues.id_usuario)
						cont++;
						if(cont==c.length){
							cont=0;
							resolve();
						}
						}else{
						cont++;
						if(cont==c.length){
							cont=0;
							resolve();
						}	
						}							
					})
				})
			})
		}

		
				
		let asignacionesCorrector = function(id){
			arrayCorrector = null;
			arrayCorrector = [];
			return new Promise(function(resolve,reject){
				sequelize.query('SELECT * from `asignacion` WHERE `id_sesion`='+se+' AND `id_usuario`='+correctores[id]+' AND `id_estado`=2 AND `activo`=1;',{model:Asignacion}).then(function(ac){
					if(ac.length==0){
						resolve(id);
						arrayCorrector.push(correctores[id]);
						arrayCorrector[matriz[0].length] = null;
						matriz.push(arrayCorrector)
					}else{
					arrayCorrector.push(correctores[id]);
					ac.forEach(function(asCorrector){
						AsignacionCodigo.findAll({where:{idAsignacion: asCorrector.dataValues.id_asignacion}},{raw:true}).then(function(cod){
							matriz[0].forEach(function(resp){
								if(contM==0){
									contM++;
								}else{
									if(resp==asCorrector.dataValues.id_respuesta){
										arrayCorrector[contM]= cod[0].dataValues.idCodigo;
										contM++;
										if(contM==matriz[0].length){
											contM=0;
											contC++;
											if(contC==ac.length){
												matriz.push(arrayCorrector)
												arrayCorrector=[];
												resolve(id);
												contM=0;
												contC=0;
											}
										}
									}else{
									contM++;
										if(contM==matriz[0].length){
											contM=0;
											contC++;
											if(contC==ac.length){
												matriz.push(arrayCorrector)
												arrayCorrector=[];
												resolve(id);
												contM=0;
												contC=0;
											}
										}
									}
								}
							})
						})
					})
				}
				})
			})
		}

		let tablaPregunta = function(){
			console.log("PREGUNTA")
			var preCon = 0;
			return new Promise(function(resolve,reject){
				Respuesta.findAll({where:{idRespuesta: matriz[0][1]}},{raw:true}).then(function(r){
					Pregunta.findAll({where:{idPregunta: r[0].dataValues.idPregunta}},{raw:true}).then(function(p){
						console.log("TABLACORRECTOR.LENGTH")
						if(tablaCorrector.length==0){
							tablaCorrector.push({id_pregunta: p[0].dataValues.idPregunta, pregunta: p[0].dataValues.forma, sesion:[]})
							idPreg = p[0].dataValues.idPregunta;
							resolve();
						}else{
							tablaCorrector.forEach(function(tabla){
								if(tabla.id_pregunta==p[0].dataValues.idPregunta){
									idPreg = p[0].dataValues.idPregunta;
									resolve();
								}else{
									preCon++;
									if(preCon==tablaCorrector.length){
										tablaCorrector.push({id_pregunta: p[0].dataValues.idPregunta, pregunta: p[0].dataValues.forma, sesion:[]})
										idPreg = p[0].dataValues.idPregunta;
										resolve();
										preCon=0;
									}
								}
							})
						}
					})
				})
			})
		}

		let consistenciaSesion = function(){
			console.log("CONSISTENCIA SESION")
			var corrS = [];
			correccion = [];
			var conC = 0;
			var doble = 0;
			return new Promise(function(resolve,reject){
				for (var i = 1; i < matriz.length; i++) {
					for (var j = 0; j < matriz[0].length; j++) {
						if(j>0){
							if(matriz[i][j]!=null){
								for (var k = 1; k < matriz.length; k++) {
									if(matriz[k][j]!=null && k!=i){
										if(matriz[i][j]%2==0 && (matriz[k][j]-1==matriz[i][j] || matriz[k][j]==matriz[i][j])){
											correccion.push({idRespuesta:matriz[0][j], correccion1:{idUsuario:matriz[i][0],codigo:matriz[i][j]}, correccion2:{idUsuario:matriz[k][0],codigo:matriz[k][j]}})
											conC++;
											doble++;
										}else if(matriz[i][j]%2!=0 && (matriz[k][j]+1==matriz[i][j] || matriz[k][j]==matriz[i][j])){
											correccion.push({idRespuesta:matriz[0][j], correccion1:{idUsuario:matriz[i][0],codigo:matriz[i][j]}, correccion2:{idUsuario:matriz[k][0],codigo:matriz[k][j]}})
											conC++;
											doble++;
										}else{
											doble++;
										}
									}
								}
							}
						}
					}
					if(doble==0 && conC == 0){
						corrS.push({id_usuario: matriz[i][0], correcciones:correccion,asignadas:0, doble_corregidas:doble, consistencia:0})
						doble = 0;
						conC=0;
						correccion = [];
					}else{
					corrS.push({id_usuario: matriz[i][0], correcciones:correccion,asignadas:0, doble_corregidas:doble, consistencia:(((conC/doble)-0.2)/(1-0.2)).toFixed(2)})
					doble = 0;
					conC=0;
					correccion = [];
					}
				}
				resolve(corrS)
				corrS = null;
				doble = 0;
				conC =0;
				correccion = [];
			})
		}

		let codigosCorrector = function(cr){
			console.log("codigos corrector")
			var contr = 0;
			var conco = 0;
			return new Promise(function(resolve,reject){
				cr.forEach(function(corrector){
					if(corrector.correcciones.length!=0){
					corrector.correcciones.forEach(function(correccions){
						Codigo.findAll({where:{idCodigo:correccions.correccion1.codigo}},{raw:true}).then(function(codu){
							Codigo.findAll({where:{idCodigo:correccions.correccion2.codigo}},{raw:true}).then(function(codd){
								if(codu.length!=0 && codd!=0){
									correccions.correccion1.codigo = codu[0].dataValues.valor;
								correccions.correccion2.codigo = codd[0].dataValues.valor;
								conco++;
								if(conco==corrector.correcciones.length){
									conco = 0;
									contr++;
									if(contr==cr.length){
										conco=0;
										contr = 0;
										resolve(cr)
									}
								}	
								}else{
								conco++;
								if(conco==corrector.correcciones.length){
									conco = 0;
									contr++;
									if(contr==cr.length){
										conco=0;
										contr = 0;
										resolve(cr)
									}
								}
								}
								
							})
						})
					})
					}else{
						contr++;
						if(contr==cr.length){
										conco=0;
										contr = 0;
										resolve(cr)
									}
					}
				})
			})
		}

		let asignadasCorrector = function(c){
			var contable = 0;
			console.log("AsigandasCorrector")
			return new Promise(function(resolve,reject){
				c.forEach(function(ctor){
					Asignacion.findAll({where:{idUsuario: ctor.id_usuario, idSesion:se}},{raw:true}).then(function(ascion){
						ctor.asignadas = ascion.length;
						contable++;
						console.log(contable+" "+c.length)
						if(contable==c.length){
							contable = 0;
							resolve(c);
						}
					})
				})
			})
		}

		let agregarSesionTabla = function(sc){
			console.log("AGREGA A LA TABLA")
			return new Promise(function(resolve,reject){
				tablaCorrector.forEach(function(pregun){
					if(pregun.id_pregunta==idPreg){
						Sesion.findAll({where:{idSesion: se}},{raw:true}).then(function(sesionA){
							sesionActual = {id_sesion: sesionA[0].dataValues.idSesion, nombre: sesionA[0].dataValues.nombre, correctores: sc}
							pregun.sesion.push(sesionActual);
							sesionActual = null;
							resolve();
						})
					}
				})
			})
		}
	},
	tablaCorrectorAntigua:function(idEquipo, nombre, fs, supervisor){
		var tablaCorrector = [];
		var matriz = [];
		var arreglo = [];
		var cont = 0;
		var sesiones = [];
		var arrayCorrector = [];
		var contM = 0;
		var contC = 0;
		var correctores = [];
		var se = 0;
		var idPreg = 0;
		var totalAsignacionesCorrectores =0;


		let sesionesEquipo = function(team){
			var contSesion = 0;
			return new Promise(function(resolve,reject){
				Sesion.findAll({where:{idEquipo: team, activo:1}},{raw:true}).then(function(ses){
					ses.forEach(function(s){
						sesiones.push(s.dataValues.idSesion);
						contSesion++;
						if(contSesion==ses.length){
							resolve();
						}
					})
				})
			})
		}

		sesionesEquipo(idEquipo).then(function(){
			sesionesTeam(0);
		});


		function sesionesTeam(d){
			return new Promise(function(resolve,reject){
				porSesion(d).then(function(){
					return matrizSesion(0);
				}).then(function(){
					return tablaPregunta();
				}).then(function(){
					return consistenciaSesion();
				}).then(function(c){
					return codigosCorrector(c);
				}).then(function(cotor){
					return asignadasCorrector(cotor);
				}).then(function(s){
					return CalcularDatos(s);
				}).then(function(so){
					return agregarSesionTabla(so);
				}).then(function(){
					if(d==sesiones.length-1){
						fs.writeFile("./views/persistence/"+nombre+"-CorrectorNueva.json",JSON.stringify(tablaCorrector))
					}else{
						console.log("HACE CICLO MATRIZ")
						matriz = [];
						arreglo = [];
					 	cont = 0;
						arrayCorrector = [];
						contM = 0;
						contC = 0;
						correctores =[];
						var ide = d+1;
						sesionesTeam(ide);
					}
				})
			})
		}

		function porSesion(id){
			return new Promise(function(resolve,reject){
				asigna(id).then(function(){
					return corrector();
				}).then(function(){
					resolve();
				})
			})
		}
		function matrizSesion(p){
			return new Promise(function(resolve,reject){
				prueba(p);
				function prueba(d){
					asignacionesCorrector(d).then(function(o){
						if(o==correctores.length-1){
							resolve();
						}else{
							prueba(o+1)
						}
					})
				}
			})	
		}

		let asigna = function(idSesion){
			arreglo = null;
			arreglo = [];
			return new Promise(function(resolve,reject){
				sequelize.query('SELECT * from `asignacion` WHERE `id_sesion`='+sesiones[idSesion]+' AND `activo`=1 GROUP BY `id_respuesta`;',{model:Asignacion}).then(function(a){
					se = sesiones[idSesion]
					a.forEach(function(asignacion){
						if(cont==0){
							arreglo.push(null)
							arreglo.push(asignacion.dataValues.id_respuesta)
							cont++;
						}else{
							arreglo.push(asignacion.dataValues.id_respuesta);
							cont++;
							if(cont==a.length){
								matriz.push(arreglo);
								cont=0;
								resolve();
							}
						}
					})
				})
			})
		}

		let corrector = function(){
			correctores = null;
			correctores = [];
			return new Promise(function(resolve,reject){
				sequelize.query('SELECT * from `asignacion` WHERE `id_sesion`='+se+' AND `activo`=1 GROUP BY `id_usuario`;',{model:Asignacion}).then(function(c){
					c.forEach(function(corrector){
						if(corrector.dataValues.id_usuario!=supervisor){
						correctores.push(corrector.dataValues.id_usuario)
						cont++;
						if(cont==c.length){
							cont=0;
							resolve();
						}
						}else{
						cont++;
						if(cont==c.length){
							cont=0;
							resolve();
						}	
						}							
					})
				})
			})
		}

		
				
		let asignacionesCorrector = function(id){
			arrayCorrector = null;
			arrayCorrector = [];
			return new Promise(function(resolve,reject){
				sequelize.query('SELECT * from `asignacion` WHERE `id_sesion`='+se+' AND `id_usuario`='+correctores[id]+' AND `id_estado`=2 AND `activo`=1;',{model:Asignacion}).then(function(ac){
					if(ac.length==0){
						resolve(id);
						arrayCorrector.push(correctores[id]);
						arrayCorrector[matriz[0].length] = null;
						matriz.push(arrayCorrector)
					}else{
					arrayCorrector.push(correctores[id]);
					ac.forEach(function(asCorrector){
						AsignacionCodigo.findAll({where:{idAsignacion: asCorrector.dataValues.id_asignacion}},{raw:true}).then(function(cod){
							matriz[0].forEach(function(resp){
								if(contM==0){
									contM++;
								}else{
									if(resp==asCorrector.dataValues.id_respuesta){
										arrayCorrector[contM]= cod[0].dataValues.idCodigo;
										contM++;
										if(contM==matriz[0].length){
											contM=0;
											contC++;
											if(contC==ac.length){
												matriz.push(arrayCorrector)
												arrayCorrector=[];
												resolve(id);
												contM=0;
												contC=0;
											}
										}
									}else{
									contM++;
										if(contM==matriz[0].length){
											contM=0;
											contC++;
											if(contC==ac.length){
												matriz.push(arrayCorrector)
												arrayCorrector=[];
												resolve(id);
												contM=0;
												contC=0;
											}
										}
									}
								}
							})
						})
					})
				}
				})
			})
		}

		let tablaPregunta = function(){
			console.log("PREGUNTA")
			var preCon = 0;
			return new Promise(function(resolve,reject){
				Respuesta.findAll({where:{idRespuesta: matriz[0][1]}},{raw:true}).then(function(r){
					Pregunta.findAll({where:{idPregunta: r[0].dataValues.idPregunta}},{raw:true}).then(function(p){
						console.log("TABLACORRECTOR.LENGTH")
						if(tablaCorrector.length==0){
							tablaCorrector.push({id_pregunta: p[0].dataValues.idPregunta, pregunta: p[0].dataValues.forma, sesion:[]})
							idPreg = p[0].dataValues.idPregunta;
							resolve();
						}else{
							tablaCorrector.forEach(function(tabla){
								if(tabla.id_pregunta==p[0].dataValues.idPregunta){
									idPreg = p[0].dataValues.idPregunta;
									resolve();
								}else{
									preCon++;
									if(preCon==tablaCorrector.length){
										tablaCorrector.push({id_pregunta: p[0].dataValues.idPregunta, pregunta: p[0].dataValues.forma, sesion:[]})
										idPreg = p[0].dataValues.idPregunta;
										resolve();
										preCon=0;
									}
								}
							})
						}
					})
				})
			})
		}

		let consistenciaSesion = function(){
			console.log("CONSISTENCIA SESION")
			var corrS = [];
			correccion = [];
			var conC = 0;
			var doble = 0;
			return new Promise(function(resolve,reject){
				for (var i = 1; i < matriz.length; i++) {
					for (var j = 0; j < matriz[0].length; j++) {
						if(j>0){
							if(matriz[i][j]!=null){
								for (var k = 1; k < matriz.length; k++) {
									if(matriz[k][j]!=null && k!=i){
										if(matriz[i][j]%2==0 && (matriz[k][j]-1==matriz[i][j] || matriz[k][j]==matriz[i][j])){
											correccion.push({idRespuesta:matriz[0][j], correccion1:{idUsuario:matriz[i][0],codigo:matriz[i][j]}, correccion2:{idUsuario:matriz[k][0],codigo:matriz[k][j]}})
											conC++;
											doble++;
										}else if(matriz[i][j]%2!=0 && (matriz[k][j]+1==matriz[i][j] || matriz[k][j]==matriz[i][j])){
											correccion.push({idRespuesta:matriz[0][j], correccion1:{idUsuario:matriz[i][0],codigo:matriz[i][j]}, correccion2:{idUsuario:matriz[k][0],codigo:matriz[k][j]}})
											conC++;
											doble++;
										}else{
											doble++;
										}
									}
								}
							}
						}
					}
					if(doble==0 && conC == 0){
						corrS.push({id_usuario: matriz[i][0], correcciones:correccion,asignadas:0, doble_corregidas:doble, consistencia:0, mediaCarga:0, corregidas:0, tiempoPromedio:0})
						doble = 0;
						conC=0;
						correccion = [];
					}else{
					corrS.push({id_usuario: matriz[i][0], correcciones:correccion,asignadas:0, doble_corregidas:doble, consistencia:(((conC/doble)-0.2)/(1-0.2)).toFixed(2), mediaCarga:0, corregidas:0, tiempoPromedio:0})
					doble = 0;
					conC=0;
					correccion = [];
					}
				}
				resolve(corrS)
				corrS = null;
				doble = 0;
				conC =0;
				correccion = [];
			})
		}

		let codigosCorrector = function(cr){
			console.log("codigos corrector")
			var contr = 0;
			var conco = 0;
			return new Promise(function(resolve,reject){
				cr.forEach(function(corrector){
					if(corrector.correcciones.length!=0){
					corrector.correcciones.forEach(function(correccions){
						Codigo.findAll({where:{idCodigo:correccions.correccion1.codigo}},{raw:true}).then(function(codu){
							Codigo.findAll({where:{idCodigo:correccions.correccion2.codigo}},{raw:true}).then(function(codd){
								if(codu.length!=0 && codd!=0){
									correccions.correccion1.codigo = codu[0].dataValues.valor;
								correccions.correccion2.codigo = codd[0].dataValues.valor;
								conco++;
								if(conco==corrector.correcciones.length){
									conco = 0;
									contr++;
									if(contr==cr.length){
										conco=0;
										contr = 0;
										resolve(cr)
									}
								}	
								}else{
								conco++;
								if(conco==corrector.correcciones.length){
									conco = 0;
									contr++;
									if(contr==cr.length){
										conco=0;
										contr = 0;
										resolve(cr)
									}
								}
								}
								
							})
						})
					})
					}else{
						contr++;
						if(contr==cr.length){
										conco=0;
										contr = 0;
										resolve(cr)
									}
					}
				})
			})
		}
		
		let asignadasCorrector = function(c){
			var contable = 0;
			console.log("AsigandasCorrector")
			return new Promise(function(resolve,reject){
				c.forEach(function(ctor){
					Asignacion.findAll({where:{idUsuario: ctor.id_usuario, idSesion:se}},{raw:true}).then(function(ascion){
						ctor.asignadas = ascion.length;
						totalAsignacionesCorrectores = totalAsignacionesCorrectores+ascion.length;
						contable++;
						console.log(contable+" "+c.length)
						if(contable==c.length){
							contable = 0;
							resolve(c);
						}
					})
				})
			})
		}

		let CalcularDatos = function(corrSesion){
			var contDatos = 0;
			return new Promise(function(resolve,reject){
				mediaCarga = totalAsignacionesCorrectores/corrSesion.length
				corrSesion.forEach(function(cor){
					Asignacion.findAll({where:{idUsuario: cor.id_usuario, idSesion:se, idEstado:2}},{raw:true}).then(function(aus){
						cor.corregidas = aus.length;
						cor.mediaCarga = ((cor.asignadas-mediaCarga)/mediaCarga)*100;
						contDatos++;
						if(contDatos==corrSesion.length){
							resolve(corrSesion);
							contDatos=0;
						}
					})
				})
			})
		}
		let agregarSesionTabla = function(sc){
			console.log("AGREGA A LA TABLA")
			return new Promise(function(resolve,reject){
				tablaCorrector.forEach(function(pregun){
					if(pregun.id_pregunta==idPreg){
						Sesion.findAll({where:{idSesion: se}},{raw:true}).then(function(sesionA){
							sesionActual = {id_sesion: sesionA[0].dataValues.idSesion, nombre: sesionA[0].dataValues.nombre, correctores: sc}
							pregun.sesion.push(sesionActual);
							sesionActual = null;
							resolve();
						})
					}
				})
			})
		}
	},
	ConsistenciaUsuario: function(useru, user2){
		var formA = [];
		var corrA = [];
		var consistenciaA = 0;
		var cont = 0;
		let formaA = function(){
			return new Promise(function(resolve,reject){
				Usuario.findAll({where:{idUsuario: useru}},{raw:true}).then(function(u){
					Usuario.findAll({where:{idUsuario: user2}},{raw:true}).then(function(ud){
						Asignacion.findAll({where:{idUsuario: useru, idEstado:2}},{raw:true}).then(function(as){
						as.forEach(function(asignacion){
							Asignacion.findAll({where:{idUsuario: user2, idRespuesta: asignacion.dataValues.idRespuesta}},{raw:true}).then(function(asd){
								if(asd[0].dataValues.idEstado==2){
									AsignacionCodigo.findAll({where:{idAsignacion: asignacion.dataValues.idAsignacion}},{raw:true}).then(function(cu){
										AsignacionCodigo.findAll({where:{idAsignacion: asd[0].dataValues.idAsignacion}},{raw:true}).then(function(cd){
											if(cu[0].dataValues.idCodigo%2==0 && (cu[0].dataValues.idCodigo-1==cd[0].dataValues.idCodigo || cd[0].dataValues.idCodigo==cu[0].dataValues.idCodigo)){
												corrA.push({idRespuesta: asignacion.dataValues.idRespuesta, correccion1: {idUsuario: u[0].dataValues.idUsuario,nombre:u[0].dataValues.nombre,codigo:cu[0].dataValues.idCodigo}, correccion2: {idUsuario: ud[0].dataValues.idUsuario,nombre:ud[0].dataValues.nombre,codigo:cd[0].dataValues.idCodigo}, consistente: true})
												consistenciaA++;
												cont++;
												if(cont==as.length){
													console.log(consistenciaA)
													var consiste = ((consistenciaA/as.length)-0.2)/(1-0.2)
													formA.push({usuario: u[0].dataValues.nombre+" "+u[0].dataValues.apellidoPaterno, correcciones:corrA, consistencia:consiste})
													console.log(JSON.stringify(formA))
												}
											}else if(cu[0].dataValues.idCodigo%2!=0 && (cu[0].dataValues.idCodigo+1==cd[0].dataValues.idCodigo || cd[0].dataValues.idCodigo==cu[0].dataValues.idCodigo)){
												corrA.push({idRespuesta: asignacion.dataValues.idRespuesta, correccion1: {idUsuario: u[0].dataValues.idUsuario,nombre:u[0].dataValues.nombre,codigo:cu[0].dataValues.idCodigo}, correccion2:{idUsuario: ud[0].dataValues.idUsuario,nombre:ud[0].dataValues.nombre,codigo: cd[0].dataValues.idCodigo}, consistente: true})
												consistenciaA++;
												cont++;
												if(cont==as.length){
													console.log(consistenciaA)
													var consiste = ((consistenciaA/as.length)-0.2)/(1-0.2)
													formA.push({usuario: u[0].dataValues.nombre+" "+u[0].dataValues.apellidoPaterno, correcciones:corrA, consistencia:consiste})
													console.log(JSON.stringify(formA))
												}
											}else{
												cont++;
												corrA.push({idRespuesta: asignacion.dataValues.idRespuesta, correccion1: {idUsuario: u[0].dataValues.idUsuario,nombre:u[0].dataValues.nombre,codigo:cu[0].dataValues.idCodigo}, correccion2:{idUsuario: ud[0].dataValues.idUsuario,nombre:ud[0].dataValues.nombre,codigo: cd[0].dataValues.idCodigo}, consistente: false})
												if(cont==as.length){
													var consiste = ((consistenciaA/as.length)-0.2)/(1-0.2)
													console.log(consistenciaA)
													formA.push({usuario: u[0].dataValues.nombre+" "+u[0].dataValues.apellidoPaterno, correcciones:corrA, consistencia:consiste})
													console.log(JSON.stringify(formA))
												}
											}
										})
									})
								}else{
										cont++;
										if(cont==as.length){
											console.log(consistenciaA)
											var consiste = ((consistenciaA/as.length)-0.2)/(1-0.2)
											formA.push({usuario: u[0].dataValues.nombre+" "+u[0].dataValues.apellidoPaterno, correcciones:corrA, consistencia:consiste})
											console.log(JSON.stringify(formA))
										}
								}
							})
						})
					})	
					})
					
				})
			})
		}
			formaA();
	},
	SupervisorEquipo: function(idEq,fs){
		console.log("SupervisorEquipo")
		UsuarioEquipo.findAll({where: {idEquipo: idEq}, include: [{model: Usuario, as: 'userEquipo', where: {idUsuario: Sequelize.col('UsuarioEquipo.id_usuario')}}]},{raw: true}).then(function(u){
			var data = [];
			var contador = 0;
			u.forEach(function(usuario){
				var contar = 0;
				if(usuario.userEquipo[0].dataValues.idTipoUsuario==2){
				Asignacion.findAll({where:{idUsuario: usuario.userEquipo[0].dataValues.idUsuario}},{raw:true}).then(function(a){
					if(a.length==0){
						data.push({ID: usuario.userEquipo[0].dataValues.idUsuario, Asignadas: a.length, Corregidas: contar, consistencia: 1,carga: 0, preguntas:[]})
						contador++;
						if(contador==u.length){
								console.log("envia a IndiceConsistencia")
								IndiceConsistencia(data, u, fs)
							}
					}
					for (var i = 0; i < a.length; i++) {
						if(a[i].dataValues.idEstado==2){
							contar++;
						}
						if(i==a.length-1){
							data.push({ID: usuario.userEquipo[0].dataValues.idUsuario, Asignadas: a.length, Corregidas: contar, consistencia: 1,carga: 0, preguntas:[]})
							contador++;
							if(contador== u.length){
								console.log("envia a IndiceConsistencia")
								IndiceConsistencia(data, u, fs)
							}
							contar = 0;
						}
					}
				})
			}else{
				contador++;
				if(contador==u.length){
					console.log("envia a IndiceConsistencia")
					IndiceConsistencia(data, u, fs)
				}
			}
			})
		})
	},
	supervisorPreguntas: function(idEq,fs, io, sock){
		var instrumento;
		var jeison = [];
		var pregun = [];
		var cantPre = 0;
			fs.access("./views/persistence/plantillaPaquetes-"+idEq+".json", function(err){
			if(!err){
				var prueba = require("../views/persistence/plantillaPaquetes-"+idEq+".json")
				instrumento = prueba.id;
				Pregunta.findAll({where:{idPrueba: instrumento}},{raw:true}).then(function(pr){
					pr.forEach(function(p){
						pregun.push({id_pregunta:p.dataValues.idPregunta, total_asignadas: 0, total_respuestas: 0, total_corregidas: 0, total_doble_corregidas:0, media_consistencia: 0, respuestas: []})
						cantPre++;
						if(cantPre==pr.length){
							jeison.push({id_instrumento: instrumento, preguntas: pregun})
							preguntasSupervisor(jeison, fs, io, idEq, sock)
						}
					})
				})
			}else{
				console.log("no hay datos")
			}
		})	
	},
	DatosAdmin: function(fs, io, sock){

		let supervisores = function(){
			var su = [];
			var t = 0;
			return new Promise(function(resolve, reject){
				Usuario.findAll({where:{idTipoUsuario:1, activo: 1}},{raw:true}).then(function(supervisor){
					supervisor.forEach(function(s){
						su.push({idUsuario: s.dataValues.idUsuario, idTipoUsuario: s.dataValues.idTipoUsuario, usuario: s.dataValues.usuario, nombre: s.dataValues.nombre, apellidoPaterno: s.dataValues.apellidoPaterno, apellidoMaterno: s.dataValues.apellidoMaterno, correo: s.dataValues.email})
						t++;
						if(t==supervisor.length){
							fs.writeFile("./views/persistence/supervisores.json", JSON.stringify(su))
							resolve();
						}
					})
				})
			})
		}

		let correctores = function(){
			var cor = [];
			var tc = 0;
			return new Promise(function(resolve, reject){
				Usuario.findAll({where:{idTipoUsuario:2, activo: 1}},{raw:true}).then(function(corrector){
					corrector.forEach(function(c){
						cor.push({idUsuario: c.dataValues.idUsuario, idTipoUsuario: c.dataValues.idTipoUsuario, usuario: c.dataValues.usuario, nombre: c.dataValues.nombre, apellidoPaterno: c.dataValues.apellidoPaterno, apellidoMaterno: c.dataValues.apellidoMaterno, correo: c.dataValues.email})
						tc++;
						if(tc==corrector.length){
							fs.writeFile("./views/persistence/correctores.json", JSON.stringify(cor))
							resolve();
						}
					})
				})
			})
		}

		let equipos = function(){
			var eq = [];
			var tt = 0;
			return new Promise(function(resolve, reject){
				Equipo.findAll({where:{activo:1}},{raw:true}).then(function(team){
					team.forEach(function(te){
						eq.push({idEquipo: te.idEquipo, nombre: te.nombre})
						tt++;
						if(tt== team.length){
							fs.writeFile("./views/persistence/equipos.json", JSON.stringify(eq))
							resolve();
						}
					})
				})
			})
		}

		let preguntasInstrumento = function(){
			var pI = [];
			var ti = 0;
			return new Promise(function(resolve, reject){
				Prueba.findAll({where:{activo:1}},{raw:true}).then(function(p){
					p.forEach(function(pri){
						pI.push({id_instrumento: pri.dataValues.idPrueba, preguntas:[]})
						ti++;
						if(ti==p.length){
							resolve(pI);
						}
					})
				})
			})
		}
		supervisores().then(function(){
			return correctores();
		}).then(function(){
			equipos();
		}).then(function(){
			return preguntasInstrumento();
			//
		}).then(function(de){
			preguntasAdmin(fs, io, sock, de);
		})
	
	function preguntasAdmin(fs, io, socket, data){
		var id = 0;
		let preguntas = function(id){
			var pre = [];
			var d = 0;
			return new Promise(function(resolve, reject){
				Pregunta.findAll({where:{idPrueba: data[id].id_instrumento}},{raw:true}).then(function(p){
					p.forEach(function(pp){
						pre.push({id_pregunta: pp.dataValues.idPregunta})
					d++;
					if(d==p.length){
						data[id].preguntas = pre;
						resolve();
					}	
					})
				})
			})
		}
		function ciclo(id){
			return new Promise(function(resolve,reject){
				preguntas(id).then(function(){
					id++;
					if(id==data.length){
						io.to(sock).emit('Archivos Admin',{estado: "ok"})
						fs.writeFile("./views/persistence/preguntas.json", JSON.stringify(data))
					}else{
						ciclo();
					}
				})
			})
		}
		ciclo(id)
	}
	},
	correccionExtra(usuario, respuesta, ec, docente, estudiante, escuela, otros, fund, parcial, noFund, estereo){
		return sequelize.transaction(function(t){
			if(ec==true){
				return Asignacion.update({isEc: 1 ,eCdocente: docente ,eCestudiante: estudiante ,eCescuela: escuela ,eCotros: otros ,fundamentoFund: fund ,fundamentoParcial: parcial ,fundamentoNoFund: noFund,fundamentoEstereotipo: estereo},{where:{idUsuario: usuario ,idRespuesta: respuesta.id_respuesta}})
			}else{
				return Asignacion.update({isEc: 0 ,eCdocente: docente ,eCestudiante: estudiante ,eCescuela: escuela ,eCotros: otros ,fundamentoFund: fund ,fundamentoParcial: parcial ,fundamentoNoFund: noFund,fundamentoEstereotipo: estereo},{where:{idUsuario: usuario ,idRespuesta: respuesta.id_respuesta}})
			}
			
		})
	}

}


function preguntasSupervisor(preguntas, fs, io, equip, sock){
	var questions = preguntas;
	var id = 0;

	let respuestaPreguntas = function(id){
		var arrResp = [];
		var cont = 0;
		return new Promise(function(resolve, reject){
			Respuesta.findAll({where:{idPregunta: questions[0].preguntas[id].id_pregunta}},{raw:true}).then(function(resP){
				questions[0].preguntas[id].total_respuestas = resP.length;
				resP.forEach(function(r){
					arrResp.push({id_respuesta: r.dataValues.idRespuesta, correctores:[]})
					cont++;
					if(cont==resP.length){
						questions[0].preguntas[id].respuestas = arrResp;
						resolve();
					}
				})
			})
		})
	}

	let asignacionesRespuesta = function(){
		var conta = 0;
		var idR= 0;
		var arrCor = [];
		return new Promise(function(resolve, reject){
			questions[0].preguntas[id].respuestas.forEach(function(a){
				Asignacion.findAll({where:{idRespuesta: a.id_respuesta}},{raw:true}).then(function(asig){
					questions[0].preguntas[id].total_asignadas += asig.length;
					AsignacionCodigo.findAll({where:{idAsignacion: asig[0].dataValues.idAsignacion}},{raw:true}).then(function(pcor){
						AsignacionCodigo.findAll({where:{idAsignacion: asig[1].dataValues.idAsignacion}},{raw:true}).then(function(scor){
							if(pcor.length!=scor.length){
								if(pcor.length==0){
									questions[0].preguntas[id].total_corregidas += 1;
									questions[0].preguntas[id].media_consistencia += 1;
									var asignap = {id_codigo:0, id_justificacion: 0}
									arrCor.push({id_corrector: asig[0].dataValues.idUsuario, asignacion: asignap})
									var asigas = {id_codigo: 0, id_justificacion: scor[0].dataValues.idCodigo}
									arrCor.push({id_corrector: asig[1].dataValues.idUsuario, asignacion: asigas})
									conta++;
									questions[0].preguntas[id].respuestas[idR].correctores = arrCor;
									arrCor =[];
									idR++;
									if(conta==questions[0].preguntas[id].respuestas.length){
										if(questions[0].preguntas[id].media_consistencia!=0){
											questions[0].preguntas[id].media_consistencia = ((questions[0].preguntas[id].media_consistencia/questions[0].preguntas[id].total_corregidas)-0.2/(1-0.2)).toFixed(2);
										}
										resolve();
									}
								}else{
									questions[0].preguntas[id].total_corregidas += 1;
									questions[0].preguntas[id].media_consistencia += 1;
									var asignap = {id_codigo: 0, id_justificacion: pcor[0].dataValues.idCodigo}
									arrCor.push({id_corrector: asig[0].dataValues.idUsuario, asignacion: asignap})
									var asigas = {id_codigo: 0, id_justificacion: 0}
									arrCor.push({id_corrector: asig[1].dataValues.idUsuario, asignacion: asigas})
									conta++;
									questions[0].preguntas[id].respuestas[idR].correctores = arrCor;
									arrCor =[];
									idR++;
									if(conta==questions[0].preguntas[id].respuestas.length){
										if(questions[0].preguntas[id].media_consistencia!=0){
											questions[0].preguntas[id].media_consistencia = ((questions[0].preguntas[id].media_consistencia/questions[0].preguntas[id].total_corregidas)-0.2/(1-0.2)).toFixed(2);
										}
										resolve();
									}
								}
							}else{
								if(pcor.length>0){
									questions[0].preguntas[id].total_corregidas += 2;
									questions[0].preguntas[id].total_doble_corregidas +=1;
									if(pcor[0].dataValues.idCodigo==scor[0].dataValues.idCodigo){
										questions[0].preguntas[id].media_consistencia += 2;
									}
									var asignap = {id_codigo: 0, id_justificacion: pcor[0].dataValues.idCodigo}
									arrCor.push({id_corrector: asig[0].dataValues.idUsuario, asignacion: asignap})
									var asigas = {id_codigo: 0, id_justificacion: scor[0].dataValues.idCodigo}
									arrCor.push({id_corrector: asig[1].dataValues.idUsuario, asignacion: asigas})
									conta++;
									questions[0].preguntas[id].respuestas[idR].correctores = arrCor;
									arrCor =[];
									idR++;
									if(conta==questions[0].preguntas[id].respuestas.length){
										if(questions[0].preguntas[id].media_consistencia!=0){
											questions[0].preguntas[id].media_consistencia = ((questions[0].preguntas[id].media_consistencia/questions[0].preguntas[id].total_corregidas)-0.2/(1-0.2)).toFixed(2);
										}
										resolve();
									}	
								}else{
									var asignap = {id_codigo: 0, id_justificacion: 0}
									arrCor.push({id_corrector: asig[0].dataValues.idUsuario, asignacion: asignap})
									var asigas = {id_codigo: 0, id_justificacion: 0}
									arrCor.push({id_corrector: asig[1].dataValues.idUsuario, asignacion: asigas})
									conta++;
									questions[0].preguntas[id].respuestas[idR].correctores = arrCor;
									arrCor =[];
									idR++;
									if(conta==questions[0].preguntas[id].respuestas.length){
										if(questions[0].preguntas[id].media_consistencia!=0){
											questions[0].preguntas[id].media_consistencia = ((questions[0].preguntas[id].media_consistencia/questions[0].preguntas[id].total_corregidas)-0.2/(1-0.2)).toFixed(2);
										}	
										resolve();
									}
								}
							}
						})
					})
				})
			})
		})
	}

	let valorCodigos = function(){
		var qrc = 0;
		return new Promise(function(resolve, reject){
			questions[0].preguntas[id].respuestas.forEach(function(qr){
				if(qr.correctores[0].asignacion.id_justificacion!=0 && qr.correctores[1].asignacion.id_justificacion!=0){
					Codigo.findAll({where:{idCodigo: qr.correctores[0].asignacion.id_justificacion }},{raw:true}).then(function(cu){
						Filtro.findAll({where:{idCodigo:cu[0].dataValues.idCodigo}, include:[{model:Familia, as:'fFamilia',where:{idFamilia: Sequelize.col('filtro.id_familia')}}]},{raw:true}).then(function(cuf){
							Codigo.findAll({where:{idCodigo: qr.correctores[1].asignacion.id_justificacion}},{raw:true}).then(function(cd){
								Filtro.findAll({where:{idCodigo:cd[0].dataValues.idCodigo}, include:[{model:Familia, as:'fFamilia',where:{idFamilia: Sequelize.col('filtro.id_familia')}}]},{raw:true}).then(function(cdf){
									qr.correctores[0].asignacion.id_justificacion = cu[0].dataValues.valor;
									qr.correctores[0].asignacion.id_codigo = cuf[0].fFamilia[0].dataValues.titulo;
									qr.correctores[1].asignacion.id_justificacion = cd[0].dataValues.valor;
									qr.correctores[1].asignacion.id_codigo = cdf[0].fFamilia[0].dataValues.titulo;
									qrc++;
									if(qrc==questions[0].preguntas[id].respuestas.length-1){
										qrc = 0;
										resolve();
									}
								})
							})
						})
					})
				}else if(qr.correctores[0].asignacion.id_justificacion!=0 || qr.correctores[1].asignacion.id_justificacion!=0){
					if(qr.correctores[0].asignacion.id_justificacion!=0){
						Codigo.findAll({where:{idCodigo: qr.correctores[0].asignacion.id_justificacion }},{raw:true}).then(function(cu){
							console.log("CU "+ JSON.stringify(cu))
							Filtro.findAll({where:{idCodigo:cu[0].dataValues.idCodigo}, include:[{model:Familia, as:'fFamilia',where:{idFamilia: Sequelize.col('filtro.id_familia')}}]},{raw:true}).then(function(cuf){
								qr.correctores[0].asignacion.id_justificacion = cu[0].dataValues.valor;
								qr.correctores[0].asignacion.id_codigo = cuf[0].fFamilia[0].dataValues.titulo;
								qr.correctores[1].asignacion.id_justificacion = "-";
								qr.correctores[1].asignacion.id_codigo = "-";
								qrc++;
								if(qrc==questions[0].preguntas[id].respuestas.length-1){
									qrc = 0;
									resolve();
								}
							})
						})
					}else{
						Codigo.findAll({where:{idCodigo: qr.correctores[1].asignacion.id_justificacion }},{raw:true}).then(function(cd){
							Filtro.findAll({where:{idCodigo:cd[0].dataValues.idCodigo}, include:[{model:Familia, as:'fFamilia',where:{idFamilia: Sequelize.col('filtro.id_familia')}}]},{raw:true}).then(function(cdf){
								qr.correctores[0].asignacion.id_justificacion = "-";
								qr.correctores[0].asignacion.id_codigo = "-";
								qr.correctores[1].asignacion.id_justificacion = cd[0].dataValues.valor;
								qr.correctores[1].asignacion.id_codigo = cdf[0].fFamilia[0].dataValues.titulo;
								qrc++;
								if(qrc==questions[0].preguntas[id].respuestas.length-1){
									qrc = 0;
									resolve();
								}
							})
						})
					}
				}else{
					qr.correctores[0].asignacion.id_justificacion = "-";
					qr.correctores[0].asignacion.id_codigo = "-";
					qr.correctores[1].asignacion.id_justificacion = "-";
					qr.correctores[1].asignacion.id_codigo = "-";
					qrc++;
					if(qrc==questions[0].preguntas[id].respuestas.length-1){
						qrc = 0;
						resolve();
					}
					
				}
			})
		})
	}
	function ciclo(val){
		return new Promise(function(resolve, reject){
			respuestaPreguntas(val).then(function(){
				return asignacionesRespuesta();
			}).then(function(){
				return valorCodigos();
			}).then(function(){
				id++;
				if(id==questions[0].preguntas.length){
					fs.writeFile("./views/persistence/preguntastabla(1).json", JSON.stringify(questions))
					io.to(sock).emit('Archivos listos',{equipo: equip});
				}else{
					ciclo(id)
				}
			})
		})
	}
	ciclo(id)
}

function IndiceConsistencia(d, users, fs){
	console.log("IndiceConsistencia")
	var c = 0;
	var user = 0;
	var consistente = 0;
	var usuarios = 0;
	var asignacionesTotal=0;
	let revisarAsignacion = function(use){
		return new Promise(function(resolve,reject){
			Asignacion.findAll({where:{idUsuario:users[use].userEquipo[0].dataValues.idUsuario, idEstado: 2}},{raw:true}).then(function(a){
				if(a.length!=0){
				a.forEach(function(au){
					Asignacion.findAll({where:{idRespuesta: au.dataValues.idRespuesta}},{raw:true}).then(function(ar){
						for (var i = 0; i < ar.length; i++) {
							if(ar[i].dataValues.idUsuario!=au.dataValues.idUsuario){
								AsignacionCodigo.findAll({where:{idAsignacion: ar[i].dataValues.idAsignacion}},{raw:true}).then(function(ad){
									AsignacionCodigo.findAll({where:{idAsignacion: au.dataValues.idAsignacion}},{raw:true}).then(function(ap){
										if(ad.length==0){
											consistente++;
											asignacionesTotal++;
											if(asignacionesTotal==a.length){
												d[use].consistencia = (consistente/d[use].Corregidas).toFixed(2)
												asignacionesTotal=0;
												resolve();
											}
										}else{
											if(ad[0].dataValues.idCodigo==ap[0].dataValues.idCodigo){
												consistente++;	
											}else{
												asignacionesTotal++;
												if(asignacionesTotal==a.length){
													d[use].consistencia = (consistente/d[use].Corregidas).toFixed(2)
													asignacionesTotal=0;
													resolve();
												}
											}
										}
									})
								})
							}
						}
					})
				})
			}else{
				resolve();
			}
			})
		})
	}
	function ciclar(usuarios){
		return new Promise(function(resolve, reject){
			revisarAsignacion(usuarios).then(function(){
				usuarios++;
				if(usuarios==users.length){
					correccionPorCorrector(d, fs)
				}else{
					ciclar(usuarios)
				}
			})
		})
	}
	ciclar(usuarios);
}
function correccionPorCorrector(da, fs){
	console.log("LLEGA A LA correccionPorCorrector")
	var dat = da;
	var c = 0;
	var y = 0;
	var jota = 0;
	var asignacion = [];
	let asignaciones = function(id){
		return new Promise(function(resolve, reject){
			Asignacion.findAll({where:{idUsuario: dat[id].ID}},{raw:true}).then(function(asc){
				c = id;
				asignacion = asc;
				resolve()
			})
		})
	}

	let correcciones = function(){
		var preg = [];
		var resp = [];
		return new Promise(function(resolve, reject){
			if(asignacion.length!=0){
				asignacion.forEach(function(asignar){
					AsignacionCodigo.findAll({where:{idAsignacion: asignar.dataValues.idAsignacion}},{raw:true}).then(function(ac){
						if(ac.length==0){
							Respuesta.findAll({where:{idRespuesta:asignar.dataValues.idRespuesta}},{raw:true}).then(function(re){
								y++;
								var asigna = {id_justificacion:"-", id_codigo: "-"}
								resp.push({id_respuesta: re[0].dataValues.idRespuesta, asignacion: asigna})
								preg.push({id_pregunta:re[0].dataValues.idPregunta,respuesta:resp})
								resp = [];
								if(y==asignacion.length){
									jota++;
									y=0;
									dat[c].preguntas = preg;
									preg = [];
									resolve();
								}
							})
						}else{
							Respuesta.findAll({where:{idRespuesta: asignar.dataValues.idRespuesta}},{raw:true}).then(function(r){
								Codigo.findAll({where:{idCodigo: ac[0].dataValues.idCodigo}},{raw:true}).then(function(cod){
									Filtro.findAll({where:{idCodigo:cod[0].dataValues.idCodigo}},{raw:true}).then(function(fc){
										Familia.findAll({where:{idFamilia: fc[0].dataValues.idFamilia}},{raw:true}).then(function(fa){
											var asigna = {id_justificacion:cod[0].dataValues.valor, id_codigo: fa[0].dataValues.titulo}
											resp.push({id_respuesta: r[0].dataValues.idRespuesta, asignacion: asigna})
											preg.push({id_pregunta:r[0].dataValues.idPregunta, respuestas: resp})
											resp =[];
											y++;
											if(y==asignacion.length){
												jota++;
												y=0;
												dat[c].preguntas = preg;
												preg = [];
												resolve();
											}
										})
										
									})
								})
								
							})
						}
					})
				})

			}else{
				resolve();
			}
		})
	}	
	function mediaCarga(dat){
		console.log("llega a la media")
		var dac = dat;
		var media = 0;
		var total = 0;	

		let sacarMedia = function(){
			return new Promise(function(resolve, reject){
				dac.forEach(function(d){
					media += d.Asignadas;
					total++;
					if(total==dac.length){
						media = (media/dac.length)
						total = 0;
						resolve();
					}
				})
			})
		}

		let calcularCarga = function(){
			return new Promise(function(resolve,reject){
				dac.forEach(function(dam){
					dam.carga = (((dam.Asignadas-media)/media)*100).toFixed(2);
					total++;
					if(total==dac.length){
						resolve();
					}
				})
			})
		}

		sacarMedia().then(function(){
			return calcularCarga();
		}).then(function(){
			fs.writeFile("./views/persistence/correctorTabla(1).json", JSON.stringify(dat))
		})
	}

	function cicle(val){
		return new Promise(function(resolve, reject){
			asignaciones(val).then(function(){
				return correcciones();
			}).then(function(){
				if(jota==dat.length-1){
					mediaCarga(dat)
				}else{
					c = 0;
					asignacion = null;
					cicle(jota);
				}
			})
		})
	}
	cicle(jota)
}


function asignacionFamilias(fam,fs,c, idp, asignacion, eq, titp){
	var famcorrector = [];
	var codcorrector = [];
	var ti;
	var des;
	var idcod;
	var val;
	var desc;
	var cont = 0;
	var plantillaCorrector = c;
	fam.familia.forEach(function(family){
		Familia.findAll({where:{idFamilia: family}},{raw:true}).then(function(fa){
				ti = fa[0].dataValues.titulo;
				des = fa[0].dataValues.descripcion;
			Filtro.findAll({where: {idFamilia: family}, include:[{model: Codigo, as: 'fCodigo', where:{idCodigo: Sequelize.col('filtro.id_codigo')}}]},{raw:true}).then(function(fil){
				fil.forEach(function(filtro){
					idcod = filtro.fCodigo[0].dataValues.idCodigo;
					val = filtro.fCodigo[0].dataValues.valor;
					desc = filtro.fCodigo[0].dataValues.descripcion;
					codcorrector.push({idcodigo: idcod, valor: val, descripcion: desc})
				})
				
			}).then(function(){
				console.log(codcorrector.length)
				famcorrector.push({titulo: ti, descripcion: des, codigos: codcorrector })
				codcorrector = [];
				cont++
				if(cont==fam.familia.length){
				plantillaCorrector.familias = famcorrector;
				fs.writeFile("./persistence/plantillaCarga-"+idp+".json", JSON.stringify(plantillaCorrector))
				asignacionesTeam(plantillaCorrector, fs, idp, asignacion, eq, titp)
			}
			})
		})
	})
}

function asignacionesTeam(p,fs,pregunta,asi,team,titlep){
	var asicorrector;
	var resto = 0;
	var resp = 0;
	var archivo = '';
	correctores = 0;
	Respuesta.findAll({where:{idPregunta: pregunta}}, {raw: true}).then(function(r){
		UsuarioEquipo.findAll({where: {idEquipo: team}, include: [{model: Usuario, as: 'userEquipo', where: {idUsuario: Sequelize.col('UsuarioEquipo.id_usuario')}}]},{raw: true}).then(function(users){
			for (var q = 0; q < users.length; q++) {
				if(users[q].userEquipo[0].dataValues.idTipoUsuario==2){
					correctores++;
				}
			}
			asicorrector = Math.trunc((r.length*2)/correctores)
			resto = (r.length*2)%correctores
			users.forEach(function(correc){
				if(correc.userEquipo[0].dataValues.idTipoUsuario==2){
					var asignadas = [];
					var parte = 1;
					var username = correc.userEquipo[0].dataValues.nombre+"-"+correc.userEquipo[0].dataValues.apellidoPaterno+"-"+correc.userEquipo[0].dataValues.apellidoMaterno;
					var guardar = p;
					var paq = [];
					var pre = null;
					if(resto>0){
						var g = 0;
						for (var i = 0; i < (asicorrector+1); i++) {
							if(resp==r.length){
								resp = 0;
							}
							var id = r[resp].dataValues.idRespuesta;
							var val = r[resp].dataValues.valor;
							var idEs = 1;
							var cor = [];
							Asignacion.create({idUsuario: correc.userEquipo[0].dataValues.idUsuario, idRespuesta: r[resp].dataValues.idRespuesta, idEstado: 1})
							asignadas.push({id_respuesta: id, valor: val, id_estado: idEs, correccion: cor})
							if(asignadas.length==100){
								archivo = "./persistence/"+username+"-"+r[0].dataValues.idPregunta+"-"+parte+".json"
								guardar.respuestas = asignadas;
								fs.writeFile(archivo, JSON.stringify(guardar));
								paq.push({parte: parte, contestadas: 0, duda: 0, noContestadas: asignadas.length})
								parte++;
								asignadas = [];
								guardar = p;

							}
							g++;							
							resp++;
							if(g==asicorrector+1){
								g = 0;
								resto--;
								var plantillaPaqUser = null;
								if(asignadas.length>0){
									archivo = "./persistence/"+correc.userEquipo[0].dataValues.nombre+"-"+correc.userEquipo[0].dataValues.apellidoPaterno+"-"+correc.userEquipo[0].dataValues.apellidoMaterno+"-"+r[0].dataValues.idPregunta+"-"+parte+".json"
									guardar.respuestas = asignadas;
									paq.push({parte: parte, contestadas: 0, duda: 0, noContestadas: asignadas.length})
									fs.writeFile(archivo, JSON.stringify(guardar));
								}
								fs.access("./persistence/"+username+"-paquetes.json", function(err){
									if(err){
										plantillaPaqUser = require("../persistence/plantillaPaquetes-"+team+".json")
										pre = plantillaPaqUser.preguntas;
										pre.push({idPregunta: pregunta, preguntaTitle: titlep, respuestas: paq })
										plantillaPaqUser.preguntas = pre;
										fs.writeFile("./persistence/"+username+"-paquetes.json", JSON.stringify(plantillaPaqUser))
										plantillaPaqUser.preguntas = [];
										asignadas = [];
										paq = [];
										parte = 1;
										g = 0;
										resto--;
									}else{
										plantillaPaqUser = require("../persistence/"+username+"-paquetes.json")
										
										pre = plantillaPaqUser.preguntas;
										pre.push({idPregunta: pregunta, preguntaTitle: titlep, respuestas: paq })
										plantillaPaqUser.preguntas = pre;
										fs.writeFile("./persistence/"+username+"-paquetes.json", JSON.stringify(plantillaPaqUser))
										plantillaPaqUser.preguntas = [];
										paq = []
										asignadas = [];
										parte = 1;
										g = 0;
									}
								})	
							}
						}
					}else{
						var g = 0;
						for (var i = 0; i < asicorrector; i++) {
							if(resp==r.length){
								resp = 0;
							}
							var id = r[resp].dataValues.idRespuesta;
							var val = r[resp].dataValues.valor;
							var idEs = 1;
							var cor = [];
							Asignacion.create({idUsuario: correc.userEquipo[0].dataValues.idUsuario, idRespuesta: r[resp].dataValues.idRespuesta, idEstado: 1})
							asignadas.push({id_respuesta: id, valor: val, id_estado: idEs, correccion: cor})
							if(asignadas.length==100){
								archivo = "./persistence/"+correc.userEquipo[0].dataValues.nombre+"-"+correc.userEquipo[0].dataValues.apellidoPaterno+"-"+correc.userEquipo[0].dataValues.apellidoMaterno+"-"+r[0].dataValues.idPregunta+"-"+parte+".json"
								guardar.respuestas = asignadas;
								fs.writeFile(archivo, JSON.stringify(guardar));
								paq.push({parte: parte, contestadas: 0, duda: 0, noContestadas: asignadas.length})
								parte++;
								asignadas = [];
								guardar = p;
							}
							g++;
							resp++;
							if(g==asicorrector){
								g = 0;
								var plantillaPaqUser = null;
								if(asignadas.length>0){
									archivo = "./persistence/"+correc.userEquipo[0].dataValues.nombre+"-"+correc.userEquipo[0].dataValues.apellidoPaterno+"-"+correc.userEquipo[0].dataValues.apellidoMaterno+"-"+r[0].dataValues.idPregunta+"-"+parte+".json"
									guardar.respuestas = asignadas;
									paq.push({parte: parte, contestadas: 0, duda: 0, noContestadas: asignadas.length})
									fs.writeFile(archivo, JSON.stringify(guardar));	
								}
								fs.access("./persistence/"+username+"-paquetes.json", function(err){
									if(err){
										plantillaPaqUser = require("../persistence/plantillaPaquetes-"+team+".json")
										pre = plantillaPaqUser.preguntas;
										pre.push({idPregunta: pregunta, preguntaTitle: titlep, respuestas: paq })
										plantillaPaqUser.preguntas = pre;
										fs.writeFile("./persistence/"+username+"-paquetes.json", JSON.stringify(plantillaPaqUser))
										paq = []
										plantillaPaqUser.preguntas = [];
										asignadas = [];
										parte = 1;
										g = 0;
									}else{
										plantillaPaqUser = require("../persistence/"+username+"-paquetes.json")
										pre = plantillaPaqUser.preguntas;
										pre.push({idPregunta: pregunta, preguntaTitle: titlep, respuestas: paq })
										plantillaPaqUser.preguntas = pre;
										fs.writeFile("./persistence/"+username+"-paquetes.json", JSON.stringify(plantillaPaqUser))
										plantillaPaqUser.preguntas = [];
										paq = []
										asignadas = [];
										parte = 1;
										g = 0;
									}
								})
								
							}
						}
					}
				}
			})
		})
	})
}

function saveCorreccion(asignacion, codigo, carga, usuario,ses,pregunta, fs, io, team, est){
	return sequelize.transaction(function(t){
		return AsignacionCodigo.create({idAsignacion: asignacion, idCodigo: codigo},{transaction: t}).then(function(){

		})
	}).then(function(){
		return sequelize.transaction(function(t){
			return Asignacion.update({idEstado: 2},{where:{idAsignacion: asignacion}},{transaction: t})
		}).then(function(){
			var paq = require("../views/persistence/"+usuario+"-paquetes.json");
			paq.forEach(function(pre){
			if(pre.id_pregunta==pregunta){
				pre.sesion.forEach(function(pse){
					if(pse.id_sesion==ses){
						if(est==3){
							pse.respuestas.contestadas+=1;
							pse.respuestas.duda-=1;
							fs.writeFile("./views/persistence/"+usuario+"-paquetes.json", JSON.stringify(paq))
							io.emit('Correccion Realizada',{Equipo: team})	
						}else{
							pse.respuestas.contestadas+=1;
							pse.respuestas.noContestadas-=1;
							fs.writeFile("./views/persistence/"+usuario+"-paquetes.json", JSON.stringify(paq))
							io.emit('Correccion Realizada',{Equipo: team})
						}
					}
				})
			}
			
		})
		fs.writeFile("./views/persistence/"+usuario+"-"+pregunta+"-"+ses+".json", JSON.stringify(carga));
		})
		
	})	
}

function updateCorreccion(usuario,asignacion, codigo, codigoAsignacion, carga,pregunta, ses, fs, io, team){
	return sequelize.transaction(function(t){
		return AsignacionCodigo.destroy({where:{idAsignacionCodigo: codigoAsignacion}}, { transaction: t }).then(function(){
			return AsignacionCodigo.create({idAsignacion: asignacion, idCodigo: codigo})
		});
	}).then(function(){
		io.emit('Correccion Realizada',{Equipo: team})
		fs.writeFile("./views/persistence/"+usuario+"-"+pregunta+"-"+ses+".json", JSON.stringify(carga)); 
	})
}


function dudaNueva(asigna,usuario,pregunta,ses,fs, io, est, du, carga,team, valor, idUser){
	console.log("duda nueva")
	return sequelize.transaction(function(t){
		return sequelize.query("UPDATE `asignacion` SET `id_estado`= 3, `duda`='"+du+"' WHERE `id_asignacion`="+asigna+";",{transaction: t}).then(function(){

		})
	}).then(function(){
		var paq = require("../views/persistence/"+usuario+"-paquetes.json");
		paq.forEach(function(pre){
			if(pre.id_pregunta==pregunta){
				pre.sesion.forEach(function(pse){
					if(pse.id_sesion==ses){
						if(est==2){
							pse.respuestas.duda+=1;
							pse.respuestas.contestadas-=1;
							fs.writeFile("./views/persistence/"+usuario+"-paquetes.json", JSON.stringify(paq))
							io.emit('Duda Correccion',{Equipo: team, duda: du, user: idUser, respuesta: valor})
						}else{
							pse.respuestas.duda+=1;
							pse.respuestas.noContestadas-=1;
							io.emit('Duda Correccion',{Equipo: team, duda: du, user: idUser, respuesta: valor})
							fs.writeFile("./views/persistence/"+usuario+"-paquetes.json", JSON.stringify(paq))
						}	
					}
				})
			}	
		})
		fs.writeFile("./views/persistence/"+usuario+"-"+pregunta+"-"+ses+".json", JSON.stringify(carga));
	})
}

function updateDuda(asig,resp, usuario, preg, ses, fs, io,du, carga,team, valor, idUser){
	console.log("actualizacion duda")
	return sequelize.transaction(function(t){
		return sequelize.query("UPDATE `asignacion` SET `duda`='"+resp.duda+"' WHERE `id_asignacion`="+asig+";",{transaction: t})
	}).then(function(){
		io.emit('Duda Correccion',{Equipo: team, duda: du, user: idUser, respuesta: resp.duda})
		fs.writeFile("./views/persistence/"+usuario+"-"+preg+"-"+ses+".json", JSON.stringify(carga));
	})
}
