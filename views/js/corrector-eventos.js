
var io = io()


$(document).on('click', '#guardar', function (e) {
    e.preventDefault();
    var asignacion = $('#asignacionCodigo').val()
    var codigo = $('#idcodigo').val()
    document.getElementById("asignacion").reset();
    io.emit('Guardar Asignacion', { codigoAsignacion: asignacion, idcodigo: codigo })
})