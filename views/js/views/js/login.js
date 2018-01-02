﻿
    'use strict'
var sock = io.connect('http://qualans.com', {port: 51440});

$(document).ready(function(){

    sessionStorage.clear();

    $.AdminBSB.browser.activate();
    $.AdminBSB.navbar.activate();
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();
    $.AdminBSB.search.activate();
});

/*

Al presionar el boton guardar del formulario

se envían los datos al servidor por medio del evento 'insertarUsuario'

y se limpia el formulario.

*/

$(document).on('click', '#Entrar', function (e) {

    e.preventDefault();

    var userName = $('#username').val()

    var passUser = $('#password').val()

    document.getElementById("sign_in").reset();

    sock.emit('Iniciar Sesion', { user: userName, pass: passUser })

})



/*

evento de login exitoso, trae los datos del usuario para redireccionarlo

*/

sock.on('login exitoso', function (respuesta) {

    sessionStorage.nombre = respuesta.nombre;

    sessionStorage.apellidoP = respuesta.apellidop;

	sessionStorage.apellidoM = respuesta.apellidom;
    sessionStorage.idUsuario = respuesta.idUsuario;
	sessionStorage.idEquipo = respuesta.idTeam;

	

    if (respuesta.tipousuario == 1) {
window.location.replace('/vistaSupervisor.html');
        //crearArchivos(respuesta.idTeam);

    } else if(respuesta.tipousuario==2){

        window.location.replace('/instrumentos.html')
    }else{
        archivosAdmin();
    	
    }

})



sock.on('fallo sql',function(respuesta){

    // console.log('fallo por algo')

})



sock.on('conecta3', function(respuesta){

    // console.log('se conecto al menos', respuesta)

})



/*

evento de fallo al intentar iniciar sesion, muestra un mensaje de datos incorrectos

*/

sock.on('login fallido', function (respuesta) {

    console.log('login fallido')

    // $('#mensaje').val(respuesta.mensaje)
})



sock.on('connect', function(){

    console.log('io connect')

})

sock.on('Archivos listos', function(r){

    

})
sock.on('Archivos Admin', function(){
    window.location.replace('/sistema-administracion.html');
})
function crearArchivos(id){
    sock.emit('Datos Supervisor', {idE: id});
}

function archivosAdmin(){
    sock.emit('Datos Admin',{dato: "ok"})
}