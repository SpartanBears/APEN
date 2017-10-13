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



module.exports = {

    /*
    función para obtener todos los datos de la tabla usuario
    */
    buscarTodos: function (socket) {
        sequelize.query('SELECT * FROM usuario', { model: Usuario, raw: true }).then(resultado => {
            console.log('aqui estan todos')
            console.log(resultado)

        })
    },

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
    asignacion: function (codigo_asignacion, codigo, io, sock) {
        return sequelize.transaction(function (t) {
            return AsignacionCodigo.create({ idAsignacion: codigo_asignacion, idCodigo: codigo }, { transaction: t }).then(function () {
                io.to(sock).emit('Resultado Correccion', { mensaje: 'ok' })
            }).catch(function (err) {
                io.to(sock).emit('Resultado Correccion', { mensaje: 'error' })
            })
        })
        
    },
    cambiarEstadoAsignacion: function (asignacion, estado, io, sock) {
        return sequelize.transaction(function (t) {
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