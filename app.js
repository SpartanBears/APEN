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
    .get('/admin', function (req, res) {
        res.sendFile("/views/VistasEjemploAPEN/blank.html", { root: __dirname });
    })
    .get('/usuario', function (req, res) {
        res.sendFile("/views/login.html", { root: __dirname })
    })

http.listen(port, function (cb) {
    console.log('servidor iniciado')
})


/*
Se carga el js con las funciones
*/
var Funciones = require('./config/funciones.js')

/*
Cuando se conecta un usuario, se le envían los datos de la tabla,
por la funcion buscarTodos.
El evento 'insertarUsuario', recibe los datos del formulario y los guarda en la base
a traves de la función isertarUsario
*/
io.on('connection', function (socket) {
    console.log('ingreso alguien')
    Funciones.buscarTodos(socket)
    socket.on('Iniciar Sesion', function (data) {
        Funciones.login(data.user, data.pass, io, socket.id)
    })
})
