
    'use strict'

$(document).ready(function(){

    $.AdminBSB.browser.activate();
    $.AdminBSB.navbar.activate();
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();
    $.AdminBSB.search.activate();
});

var io = io()

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
    io.emit('Iniciar Sesion', { user: userName, pass: passUser })
})

/*
evento de login exitoso, trae los datos del usuario para redireccionarlo
*/
io.on('login exitoso', function (respuesta) {
    sessionStorage.nombre = respuesta.nombre;
    sessionStorage.apellidoP = respuesta.apellidoP;
	sessionStorage.apellidoM = respuesta.apellidoM;
	
    if (respuesta.tipousuario == 1) {
        window.location.replace('/vistaSupervisor.html');
    } else {
        window.location.replace('/vistaCorrector.html')
    }
})

/*
evento de fallo al intentar iniciar sesion, muestra un mensaje de datos incorrectos
*/
io.on('login fallido', function (respuesta) {
    $('#mensaje').val(respuesta.mensaje)
})
/*
'actualizar', recibe los datos de la tabla usuario luego de agregar datos,
limpia la tabla y los agrega.
*/
io.on('actualizar', function (resultado) {
    $('#data_container').empty()
    resultado.forEach(function (item) {
        $('#data_container').append("<tr>\n" + "<td>" + item.id + "</td>\n" + "<td>" + item.user + "</td>\n" + "<td>" + item.pass + "</td>\n" + "</tr>")
    })
})

