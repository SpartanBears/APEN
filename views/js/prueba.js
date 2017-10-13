
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
$(document).on('click','#Guardar', function (e) {
    e.preventDefault();
    var userName = $('#userName').val()
    var passUser = $('#userPass').val()
    document.getElementById("insertar").reset();
    io.emit('insertarUsuario', { user: userName, pass: passUser })
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

