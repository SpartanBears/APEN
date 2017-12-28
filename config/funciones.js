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
                io.to(sock).emit('login exitoso', { nombre: result.dataValues.nombre, apellidop: result.dataValues.apellidoPaterno, apellidom: result.dataValues.apellidoMaterno, tipousuario: result.dataValues.idTipoUsuario, idUsuario:result.dataValues.idUsuario })
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
    guardarCorreccion: function (id,respuesta, codigo, usuario, carga,estado, io, sock, fs) {
    	if(estado==2){
			Asignacion.find({where: {idUsuario: id, idRespuesta: respuesta }}).then(function(result){
				AsignacionCodigo.findAll({where:{ idAsignacion: result.dataValues.idAsignacion }}).then(function(data){

						if(data.length>0){
							for(var i = 0; i<codigo.length; i++){
								updateCorreccion(usuario,data[i].idAsignacion,codigo[i].idcodigo,data[i].idAsignacionCodigo, carga, fs, io, sock)
							}
						}else{							
								saveCorreccion(result, codigo, carga, usuario, fs, io, sock)					
						}
				})				
			})
        }else{
        	Asignacion.update({idEstado: estado},{where:{idUsuario:id, idRespuesta: respuesta}}).then(function(r){
        		io.to(sock).emit('Correccion Guardada', { mensaje: 'ok' })
				fs.writeFile("./views/persistence/"+usuario+".json", JSON.stringify(carga)); 
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
	editarUsuario: function(idTipo, user,pass, name, apeP, apeM, mail, id){
		return sequelize.transaction(function(t){
			return Usuario.update({idTipoUsuario: idTipo, usuario: user, nombre: name,contrasena:pass, apellidoPaterno: apeP,
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
	},
	crearCarga: function(id_preg, asig, id_equipo, fs){
		var plantilla = require("./cargaPlantilla.json");
		var plantillaPaq = require("./plantillaPaquetes.json")
		Pregunta.findAll({where:{idPregunta: id_preg}},{raw: true}).then(function(f){
			plantilla.id_pregunta = f[0].dataValues.idPregunta;
			plantilla.enunciado = f[0].dataValues.enunciado;
			plantilla.estimulo = f[0].dataValues.estimulo;
			plantilla.id_tipo_estimulo = f[0].dataValues.idTipoEstimulo;
			fs.writeFile("./persistence/plantillaCarga-"+id_preg+".json", JSON.stringify(plantilla));
			Prueba.findAll({where:{idPrueba: f[0].dataValues.idPrueba}},{raw: true}).then(function(p){
				plantillaPaq.id = f[0].dataValues.idPrueba;
				plantillaPaq.title = p[0].dataValues.titulo;
				fs.writeFile("./persistence/plantillaPaquetes-"+id_equipo+".json", JSON.stringify(plantillaPaq))
			})
			
			
		}).then(function(){
			var family = {"familia": [1,2]};
			asignacionFamilias(family,fs,plantilla, id_preg, asig, id_equipo, plantilla.enunciado)
		})

	},
	importarExcelUsuario: function(nombre,fs){
		var con = 0;
		var queryPersona = 'INSERT INTO usuario (`id_tipo_usuario`, `usuario`, `contraseña`, `nombre`, `apellido_paterno`, `apellido_materno`, `email`) VALUES '
		console.log(JSON.stringify(prueba))
		xls({
    		input: "./config/Hoja1.xlsx",  // input xls 
    		output: "./config/lista.json", // output json 
    		sheet: "Hoja1"  // specific sheetname 
  		}, function(err, result) {
    		if(err) {
    			console.log("error archivo")
  				console.error(err);
    		} else {
    			result.forEach(function(per){
    				if(con==0){
    					queryPersona+="("+per.idTipoUsuario+",'"+per.Usuario+"','"+per.Password+"','"+per.nombre+"','"+per.ApellidoPaterno+"','"+per.ApellidoMatern+"','"+per.email+"')"
    				}else{
    					queryPersona+="("+per.idTipoUsuario+",'"+per.Usuario+"','"+per.Password+"','"+per.nombre+"','"+per.ApellidoPaterno+"','"+per.ApellidoMaterno+"','"+per.email+"')"
    				}
    				if(con==result.length){
    					return sequelize.transaction(function(t){
    						return sequelize.query(q,{transaction: t})
    					}).then(function(){
    						
    					}).catch(function(){
    						
    					})
    				}
    				con++;
    			})
    		}
  		});
	},
	SupervisorEquipo: function(idEq,fs){
		UsuarioEquipo.findAll({where: {idEquipo: idEq}, include: [{model: Usuario, as: 'userEquipo', where: {idUsuario: Sequelize.col('UsuarioEquipo.id_usuario')}}]},{raw: true}).then(function(u){
			var data = [];
			var contador = 0;
			u.forEach(function(usuario){
				var contar = 0;
				Asignacion.findAll({where:{idUsuario: usuario.userEquipo[0].dataValues.idUsuario}},{raw:true}).then(function(a){
					if(a.length==0){
						data.push({ID: usuario.userEquipo[0].dataValues.idUsuario, Asignadas: a.length, Corregidas: contar, consistencia: 1, inconsistencia:[]})
						contador++;
						if(contador== u.length){
								IndiceConsistencia(data, u)
							}
					}
					for (var i = 0; i < a.length; i++) {
						if(a[i].dataValues.idEstado==2){
							contar++;
						}
						if(i==a.length-1){
							data.push({ID: usuario.userEquipo[0].dataValues.idUsuario, Asignadas: a.length, Corregidas: contar, consistencia: 0, inconsistencia:[]})
							contador++;
							if(contador== u.length){
								IndiceConsistencia(data, u)
							}
							contar = 0;
						}
					}
				})
			})
		})
	},
	supervisorPreguntas: function(idEq,fs){
		var instrumento;
		var tablaPregunta = [];
		let buscarInstrumento = function(){
			return new Promise(function(resolve, reject){
				fs.access("./persistence/plantillaPaquetes-"+idEq+".json", function(err){
				if(!err){
					var prueba = require("../persistence/plantillaPaquetes-"+idEq+".json")
					instrumento = prueba.id;
					resolve();
				}else{
					io.emit("no hay datos")
				}
			})	
			})
		}

		let buscarPreguntas = function(){
			return new Promise(function(resolve, reject){
				Pregunta.findAll({where:{idPrueba: instrumento}},{raw:true}).then(function(pr){
					pr.forEach(function(pres){
						tablaPregunta.push({idPregunta: pres.dataValues.idPregunta, asignadas: 0, corregidas: 0, avance: 0, consistencia: 1, inconsistencia: []})
					})
				}).then(function(){
					resolve();
				})
			})
		}

		let buscarRespuestas = function(){
			var ans = [];
			var corr = 0;
			var asig = 0;
			return new Promise(function(resolve,reject){
				for (var i = 0; i < tablaPregunta.length; i++) {
					var id = i;
					var corrige = 0;
					var asigna = 0;
					var jota = 0;
					Respuesta.findAll({where:{idPregunta: tablaPregunta[i].idPregunta}},{raw:true}).then(function(re){
						for (var j = 0; j < re.length; j++) {
							Asignacion.findAll({where:{idRespuesta: re[j].dataValues.idRespuesta}},{raw:true}).then(function(asi){
								if(asi.length==0){
									jota++;
								}else{
									asig=asi.length;
									for (var k = 0; k < asi.length; k++) {
										if(asi[k].dataValues.idEstado==2){
											corr++;
										}
										if(k==asi.length-1){
											corrige = corrige+corr;
											asigna = asigna+asig;
											tablaPregunta[id].asignadas = asigna;
											tablaPregunta[id].corregidas = corrige;
											corr = 0;
											jota++;
										}
									}
								}
								if(jota==re.length-1 && id==tablaPregunta.length-1){
									resolve();
								}
							})
						}
					})
				}
			})
		}

		let indiceAvance = function(){
			return new Promise(function(resolve,reject){
				for (var i = 0; i < tablaPregunta.length; i++) {
					tablaPregunta[i].avance = (tablaPregunta[i].corregidas/tablaPregunta[i].asignadas)*100
					if(i==tablaPregunta.length-1){
						resolve();
					}
				}	
			})
		}

		let indiceInconsistencia = function(){
			var incon = [];
			var inconsistente = 0;
			return new Promise(function(resolve,reject){
				for (var i = 0; i < tablaPregunta.length; i++) {
					var res = i;
					var consiste = false;
					Respuesta.findAll({where:{idPregunta: tablaPregunta[i].idPregunta}},{raw:true}).then(function(r){
						for (var j = 0; j < r.length; j++) {
							var jo = j;
							var codigoP = [];
							var codigoD = [];
							Asignacion.findAll({where:{idRespuesta:r[j].dataValues.idRespuesta, idEstado: 2}},{raw:true}).then(function(ac){
								console.log("respuesta")
								if(ac.length==2){
									var usu = ac[0].dataValues.idUsuario;
									var usd = ac[1].dataValues.idUsuario;
									AsignacionCodigo.findAll({where:{idAsignacion:ac[0].dataValues.idAsignacion}},{raw:true}).then(function(acp){
										AsignacionCodigo.findAll({where:{idAsignacion:ac[1].dataValues.idAsignacion}},{raw:true}).then(function(acd){
											console.log("llega aqui")
											if(acp.length!= acd.length){
												console.log("inconsiste tamaño")
												inconsistente++;
												for (var l = 0; l < acp.length; l++) {
													codigoP.push({id: acp[l].dataValues.idCodigo, valor:"a"})
												}
												for (var m = 0; m < acd.length; m++) {
													codigoD.push({id: acd[m].dataValues.idCodigo, valor:"a"})
													if(m==acd.length-1){
														var correccion = [];
														correccion.push({idCorrector:usu,codigos: codigoP})
														correccion.push({idCorrector:usd, codigos: codigoD})
														incon.push({idRespuesta: r[jo].dataValues.idRespuesta, correcciones: correccion})
													}
												}
											}else{
												for (var n = 0; n < acp.length; n++) {
													var ene = n;
													codigoP.push({id:acp[n].dataValues.idCodigo, valor:"a"})
													for (var c = 0; c < acd.length; c++) {
														var ce = c;
														codigoD.push({id:acd[c].dataValues.idCodigo, valor:"a"})
														if(acp[n].dataValues.idCodigo==acd[c].dataValues.idCodigo){
															console.log("consiste true")
															consiste = true;
														}
														if(ene==acp.length-1 && ce==acd.length-1 && consiste==false){
															console.log("inconsiste false")
															var correccion = [];
															correccion.push({idCorrector:usu, codigos: codigoP})
															correccion.push({idCorrector:usd, codigos: codigoD})
															incon.push({idRespuesta: r[jo].dataValues.idRespuesta, correcciones: correccion})
															inconsistente++;
															console.log(incon)
														}
														if(ene==acp.length-1){
															consiste = false;
														}
													}
												}
											}
										})
									})
								}
							})
						}
					})
				}
			})
		}
		let resultado = function(){
			return new Promise(function(resolve, reject){
				console.log(tablaPregunta)
			})
		}
		buscarInstrumento().then(function(){
			return buscarPreguntas();
		}).then(function(){
			return buscarRespuestas();
		}).then(function(){
			return indiceAvance();
		}).then(function(){
			indiceInconsistencia();
		})
	}
}

function IndiceConsistencia(d, users){
	var c = 0;
	users.forEach(function(us){
		var codigoD = [];
		var codigoP = [];
		var inconsis = [];
		var matriz = [];
		var z = 0;
		var consis = 0;
		var y = 0;
		Asignacion.findAll({where:{idUsuario: us.userEquipo[0].dataValues.idUsuario, idEstado: 2}},{raw:true}).then(function(a){
			a.forEach(function(au){
				var cons = 0;
				var noc = false;
				var idp = au.dataValues.idUsuario;
				Asignacion.findAll({where:{idRespuesta: au.dataValues.idRespuesta}},{raw:true}).then(function(ar){
					for (var i = 0; i < ar.length; i++) {
					var inc = false;
					var res = ar[i].dataValues.idRespuesta;
						if(ar[i].dataValues.idUsuario!=au.dataValues.idUsuario){
							var idud= ar[i].dataValues.idUsuario;
							AsignacionCodigo.findAll({where:{idAsignacion: ar[i].dataValues.idAsignacion}},{raw:true}).then(function(ad){
								AsignacionCodigo.findAll({where:{idAsignacion: au.dataValues.idAsignacion}},{raw:true}).then(function(ap){
									for (var j = 0; j < ap.length; j++) {
										y++;
										if(ad.length==0){
											noc = true;
										}else{
											for (var t = 0; t < ad.length; t++){
												if(ap[j].dataValues.idCodigo==ad[t].dataValues.idCodigo){
													cons++;
												}
											}
										}
										if(j==ap.length-1 && cons==ap.length){
											consis++;
											cons = 0;
										}
										if(noc==true && j==ap.length-1){
												consis++;
												console.log(consis)
												noc = false;
										}
										if(y==ap.length*2 && cons!=ap.length){
											var don = 0;
											for (var v = 0; v < ap.length; v++) {
												Codigo.findAll({where:{idCodigo:ap[v].dataValues.idCodigo}},{raw:true}).then(function(cp){
													codigoP.push({id:cp[0].dataValues.idCodigo, valor:cp[0].dataValues.valor})
													don++;
												})
											}
											for (var u = 0; u < ad.length; u++) {
												Codigo.findAll({where:{idCodigo:ad[u].dataValues.idCodigo}},{raw:true}).then(function(cd){
													codigoD.push({id:cd[0].dataValues.idCodigo, valor:cd[0].dataValues.valor})
													don++;
													if(don==ap.length+ad.length){
														matriz.push({idCorrector:idp, codigos: codigoP})
														matriz.push({idCorrector:idud, codigos: codigoD})
														for (var b = 0; b < d.length; b++) {
															if(d[b].ID==idp){
																d[b].inconsistencia.push({idRespuesta: res, correcciones: matriz});
																c++;
																if(c==a.length){
																	console.log(JSON.stringify(d))
																}
															}
														}
													}
												})
											}
										}
										if(j==ap.length-1){
											cons = 0;
											z++;
											if(z==a.length){
												for (var k = 0; k < d.length; k++) {
													if(d[k].ID == us.userEquipo[0].dataValues.idUsuario){
														d[k].consistencia =((consis/d[k].Corregidas)-0.2)/(1-0.2);
														d[k].inconsistencia = inconsis; 
													}
												}
											}
										}
									}
								})
							})
						}	
					}
				})
			})
		})
	})
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

function saveCorreccion(asignacion, codigo, carga, usuario, fs, io, socket){
	q = "INSERT INTO asignacion_codigo(`id_asignacion`,`id_codigo`) VALUES "
	for (var i = 0; i < codigo.length; i++) {
			if(i>0){
				q+= ',('+asignacion.idAsignacion+','+codigo[i].idcodigo+')'	
			}else{
				q+= '('+asignacion.idAsignacion+','+codigo[i].idcodigo+')'
			}
		
		}
		q+= ';'
	return sequelize.transaction(function(t){
		return sequelize.query(q,{transaction: t}).then(function(){
			return sequelize.query ('UPDATE asignacion SET `id_estado`=2 WHERE `id_asignacion`='+asignacion.idAsignacion+';',{transaction: t});
		}).then(function(){
			console.log(usuario)
			io.to(socket).emit('Correccion Guardada', { mensaje: 'ok' })
			fs.writeFile("./views/persistence/"+usuario+".json", JSON.stringify(carga)); 
		})
	})	
}

function updateCorreccion(usuario,asignacion, codigo, codigoAsignacion, carga, fs, io, socket){
	return sequelize.transaction(function(t){
		return AsignacionCodigo.destroy({where:{idAsignacionCodigo: codigoAsignacion}}, { transaction: t }).then(function(){
			return AsignacionCodigo.create({idAsignacion: asignacion, idCodigo: codigo})
		});
	}).then(function(){
		 io.to(socket).emit('Correccion Guardada', { mensaje: 'ok' })
		fs.writeFile("./views/persistence/"+usuario+".json", JSON.stringify(carga)); 
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


