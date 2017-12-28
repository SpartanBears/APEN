'use strict';
var express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    port = 51440,
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
    io.emit('conectado', {mensaje:'conecto'})
    socket.on('Iniciar Sesion', function (data) {
        Funciones.login(data.user, data.pass, io, socket.id)
    })
    socket.on('Crear Usuario',function(data){
        Funciones.agregarUsuario(data.id_tipo_usuario,data.usuario,data.password,data.nombre,data.apellido_paterno,data.apellido_materno,data.correo,fs)
    })
    socket.on('Editar Usuario',function(data){
        Funciones.editarUsuario(data.id_tipo_usuario,data.usuario,data.password,data.nombre,data.apellido_paterno,data.apellido_materno,data.correo,fs)
    })
    socket.on('Eliminar Usuario',function(data){
        Funciones.eliminarUsuario(data.id_usuario,fs)
    })
    socket.on('Crear Equipo',function(data){
        Funciones.agregarEquipo(nombre,fs);
    })
    socket.on('Editar Equipo',function(data){
        Funciones.editarEquipo(fs)
    })
    socket.on('Eliminar Equipo',function(data){
        Funciones.eliminarEquipo(fs)
    })
    
    socket.on('datosCarga', function(data){
        //Funciones.supervisorPreguntas(1,fs)
        //Funciones.SupervisorEquipo(1,fs);
        Funciones.crearCarga(1, 2, 1, fs)
        //Funciones.importarExcelPersona("bla",fs)
    })
    socket.on('Guardar Correccion', function (data) {
        console.log("llega al evento")
        Funciones.guardarCorreccion(data.idUsuario,data.id_respuesta, data.codigo, data.nombre_usuario, data.carga,data.idEstado, io, socket.id, fs)
    })
})
