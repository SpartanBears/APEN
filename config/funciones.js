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
            socket.emit('buscador', resultado)

        })
    },

    /*
    función que crea un nuevo usuario
    */
    insertarUsuario: function (useru, passu, io) {
        sequelize.query('INSERT INTO usuario("user","pass") VALUES (:user, :pass)', {
            replacements: { user: useru, pass: passu }
        }, { type: sequelize.QueryTypes.INSERT }).then(function () {
            actualizarTabla(io)
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