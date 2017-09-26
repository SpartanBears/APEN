'use strict';
var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    port = 50000,
    publicDir = express.static(`${__dirname}/views`)

app
    .use(publicDir)
    .get('/', function (req, res) {
        res.sendFile(`${publicDir}/index.html`)
    })

http.listen(port, function (cb) {
    console.log('servidor iniciado')
})

/*
conexión con la base de datos
*/
var Sequelize = require('sequelize')
var sequelize = new Sequelize('prueba', 'root', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

/*
Se importa el modelo de la tabla usuario
*/
var Usuario = sequelize.import('./models/usuario.js')


/*
Cuando se conecta un usuario, se le envían los datos de la tabla,
por la funcion buscarTodos.
El evento 'insertarUsuario', recibe los datos del formulario y los guarda en la base
a traves de la función isertarUsario
*/
io.on('connection', function (socket) {
    buscarTodos(socket)
    socket.on('insertarUsuario', function (data) {
        insertarUsuario(data.user, data.pass)
    })
})

/*
función que crea un nuevo usuario
*/
function insertarUsuario(useru, passu) {

    sequelize.query('INSERT INTO usuario("user","pass") VALUES (:user, :pass)', {
        replacements: { user: useru, pass: passu }
    }, { type: sequelize.QueryTypes.INSERT }).then(function () {
        actualizarTabla()
    })

}

/*
función para obtener todos los datos de la tabla usuario
*/
function buscarTodos(socket) {
    sequelize.query('SELECT * FROM usuario', { model: Usuario, raw: true }).then(resultado => {
        socket.emit('buscador', resultado)

    })
}

/*
función que obtiene los datos actualizados de la tabla
*/
function actualizarTabla() {
    sequelize.query('SELECT * FROM usuario', { model: Usuario, raw: true }).then(resultado => {
        io.emit('actualizar', resultado)

    })
}
