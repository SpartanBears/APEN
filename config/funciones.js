/*
conexión con la base de datos
*/
var sequelize = require('./configDB.js')

/*
Se importa el modelo de la tabla usuario
*/
var Usuario = sequelize.import('./models/usuario.js')



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
        sequelize.query("SELECT * FROM usuario WHERE usuario='"+useru+"' AND contraseña='"+passu+"'", { type: sequelize.QueryTypes.SELECT, model: Usuario, raw: true }).then(function (result) {
            if (result.length == 1) {
                console.log(result[0].usuario)
                io.to(sock).emit('login exitoso', { nombre: result[0].nombre, apellidop: result[0].apellido_paterno, apellidom: result[0].apellido_materno, tipousuario: result[0].id_tipo_usuario })
            } else {
                io.to(sock).emit('login fallido', { mensaje: 'datos incorrectos' })
            }  
            })
    }
}

/*
función que obtiene los datos actualizados de la tabla
*/
function actualizarTabla(io) {
    sequelize.query('SELECT * FROM usuario', { model: Usuario, raw: true }).then(resultado => {
        io.emit('actualizar', resultado)
    })
}