
var io = io()


$(document).on('click', '#guardar', function (e) {
    e.preventDefault();
    var codigo = $('#idcodigo').val()
    document.getElementById("asignacion").reset();
    io.emit('Guardar Asignacion', { idcodigo: codigo })
})