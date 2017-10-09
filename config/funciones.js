/*
conexión con la base de datos
*/
var sequelize = require('./configDB.js')

/*
Se importa el modelo de la tabla usuario
*/
var Usuario = sequelize.import('./models/usuario.js')
var AsignacionCodigo = sequelize.import('./models/asignacion_codigo.js')



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
    login: function (useru, passu, io, sock, fs) {
        sequelize.query("SELECT * FROM usuario WHERE usuario='"+useru+"' AND contraseña='"+passu+"'", { type: sequelize.QueryTypes.SELECT, model: Usuario, raw: true }).then(function (result) {
            if (result.length == 1) {
                if (result[0].id_tipo_usuario == 2) {
                    crearCarga(fs, result[0].id_usuario)
                }
                io.to(sock).emit('login exitoso', { nombre: result[0].nombre, apellidop: result[0].apellido_paterno, apellidom: result[0].apellido_materno, tipousuario: result[0].id_tipo_usuario })
            } else {
                io.to(sock).emit('login fallido', { mensaje: 'datos incorrectos' })
            }  
            })
    },

    /*
    funcion asignar codigo a la correción de una pregunta
    */
    asignacion: function (codigo_asignacion, codigo, io, sock) {
        var guardar = { body: { idAsignacion: codigo_asignacion, idCodigo: codigo } }
        var prueba = AsignacionCodigo.create(guardar.body).then(function () {
            io.to(sock).emit('')
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