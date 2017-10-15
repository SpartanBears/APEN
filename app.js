﻿'use strict';
var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    port = 50000,
    publicDir = express.static(`${__dirname}/views`),
    fs = require('file-system')

app
    .use(publicDir)
    .get('/', function (req, res) {
        res.sendFile(`${publicDir}/index.html`)
    })
    .get('/admin', function (req, res) {
        res.sendFile("/views/VistasEjemploAPEN/blank.html", { root: __dirname });
    })
    .get('/usuario', function (req, res) {
        res.sendFile("/views/vistaCorrector.html", { root: __dirname })
    })

http.listen(port, function (cb) {
    console.log('servidor iniciado')
})


/*
Se carga el js con las funciones
*/
var Funciones = require('./config/funciones.js')

/*
Cuando se conecta un usuario, espera a el envío de los datos de login.
*/
io.on('connection', function (socket) {
    socket.on('Iniciar Sesion', function (data) {
        Funciones.login(data.user, data.pass, io, socket.id)
    })

    socket.on('Guardar Correccion', function (data) {
		console.log(data.codigo.length)
        Funciones.guardarCorreccion(data.id_respuesta, data.codigo, data.id_usuario,io, socket.id)
        //Funciones.cambiarEstadoAsignacion(data.idAsignacion, data.estadoNuevo, io, socket.id)
    })
})
