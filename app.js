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
        Funciones.editarUsuario(data.id_tipo_usuario,data.id_usuario,data.usuario,data.password,data.nombre,data.apellido_paterno,data.apellido_materno,data.correo,fs)
    })
    socket.on('Borrar Usuario',function(data){
        Funciones.eliminarUsuario(data.id_usuario,fs)
    })
    socket.on('Crear Equipo',function(data){
        Funciones.agregarEquipo(data.nombre,fs);
    })
    socket.on('Editar Equipo',function(data){
        Funciones.editarEquipo(data.nombre,data.id_equipo,fs)
    })
    socket.on('Borrar Equipo',function(data){
        Funciones.eliminarEquipo(data.id_equipo,fs)
    })
    socket.on('Datos Supervisor', function(data){
        //Funciones.supervisorPreguntas(data.idE,fs,io, socket.id)
        Funciones.SupervisorEquipo(data.idE, fs)
    })
    socket.on('Asignar Pregunta', function(data){
        Funciones.crearCarga(data.id_pregunta, 2, data.id_equipo, fs)
    })

    socket.on('Guardar Correccion', function (data) {
        console.log("llega")
        Funciones.guardarCorreccion(data.idUsuario,data.resp, data.nombre_usuario, data.carga,data.pregunta,data.sesion, io, socket.id, fs)
    })

    socket.on('Datos Admin', function(d){
        Funciones.DatosAdmin(fs, io, socket.id)
    })
    socket.on('Importar',function(data){
        //Funciones.importarCorrectores();
        //Funciones.importarExcelUsers();
        Funciones.importarSupervisores();
    })
    socket.on('Guardar Correccion Extra',function(data){
        Funciones.correccionExtra(data.idUsuario, data.resp,data.isEC, data.tipoEC.docente,data.tipoEC.estudiante,data.tipoEC.escuela,data.tipoEC.otros,data.nivelFundamento.fund, data.nivelFundamento.parcial, data.nivelFundamento.no_fund, data.nivelFundamento.estereotipo)
    })

    socket.on('CUSUARIO',function(data){
        Funciones.ConsistenciaUsuario(data.user, data.userd)
    })

    socket.on('Sesion',function(data){
        Funciones.matrizAsignaciones(data.id);
    })

    socket.on('Tablas', function(data){
        //Funciones.matrizAsignaciones(data.id, data.nombre, fs, data.user);
        Funciones.tablaCorrectorAntigua(data.id, data.nombre, fs, data.user);  
        Funciones.tablaPorRespuesta(data.id, data.nombre, fs, io, socket.id);
    })

    socket.on('Crear Sesion Pedagogia',function(data){
        Funciones.crearAsignacionesPedagogia(data.Sesion, data.Equipo, fs)
    })

    socket.on('Crear Sesion Lenguaje',function(data){
        if(data.id==1){
            Funciones.crearAsignacionesLenguaje(data.Sesion,'Lenguaje 1',53,fs)    
        }else{
            Funciones.crearAsignacionesLenguaje(data.Sesion,'Lenguaje 2',54,fs)
        }
        
    })

    socket.on('Repetir Sesion Pedagogia',function(data){
        Funciones.repetirAsignacionesPedagogia(data.Sesion, data.Equipo, fs)
    })

    socket.on('Repetir Sesion Lenguaje',function(data){
        if(data.id==1){
            Funciones.repetirAsignacionesLenguaje(data.Sesion, 'Lenguaje 1',53,fs)    
        }else{
            Funciones.repetirAsignacionesLenguaje(data.Sesion, 'Lenguaje 2', 53,fs)
        }
        
    })
})
