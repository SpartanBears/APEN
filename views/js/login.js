
    'use strict'
var io = io()
/*
evento 'buscador', recibe un objeto con los datos de la tabla usuario
y los envía al la tabla que esta en el html.
*/
io.on('buscador', function (resultado) {
    resultado.forEach(function (item) {
        $('#data_container').append("<tr>\n" + "<td>" + item.id + "</td>\n" + "<td>" + item.user + "</td>\n" + "<td>" + item.pass + "</td>\n" + "</tr>")
        })
})

/*
Al presionar el boton guardar del formulario
se envían los datos al servidor por medio del evento 'insertarUsuario'
y se limpia el formulario.
*/
$(document).on('click', '#login', function (e) {
    e.preventDefault();
    var userName = $('#userName').val()
    var passUser = $('#userPass').val()
    document.getElementById("insertar").reset();
    io.emit('Iniciar Sesion', { user: userName, pass: passUser })
})

/*
evento de login exitoso, trae los datos del usuario para redireccionarlo
*/
io.on('login exitoso', function (respuesta) {
    sessionStorage.userdata = respuesta
    console.log('llego la respuesta')
    console.log(respuesta.tipousuario)
    if (respuesta.tipousuario == 1) {
        window.location.replace('/admin');
    } else {
        window.location.replace('/usuario')
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

