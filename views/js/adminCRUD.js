// agregar Usuario: id_tipo_usuario, usuario, password, nombre, apellido_paterno, apellido_materno, correo
var io = io();

window.onload = function(){

	setEvents();
}

function clickBtnModal(e){

	// console.log(this.dataset.target, $(this.dataset));

	$(this.dataset.target).find('#submitBtn, #submitSprvsor').html(this.innerHTML);
	$(this.dataset.target).find('#defaultModalLabel').html(this.innerHTML);
	$(this.dataset.target).find('input').val('');
}

function showSelect(e){

	console.log(this.dataset.target, this.innerHTML, this.innerHTML.indexOf('Editar'));

	if(this.innerHTML.indexOf('Editar') != -1){

		getEquipos();

		$(this.dataset.target).find('#idInputEquipo').removeClass('hidden');
		$(this.dataset.target).find('#inputEquipo').removeClass('hidden');

	}else if(this.innerHTML.indexOf('Borrar') != -1){

		getEquipos();

		$(this.dataset.target).find('#idInputEquipo').removeClass('hidden');
		$(this.dataset.target).find('#inputEquipo').addClass('hidden');

	}else if(this.innerHTML.indexOf('Crear') != -1){

		$(this.dataset.target).find('#idInputEquipo').addClass('hidden');
		$(this.dataset.target).find('#inputEquipo').removeClass('hidden');

	}
}

function showSelectUser(e){

	var userType = 0;
	var activeModal = $(this.dataset.target);

	switch(this.innerHTML.indexOf('Supervisor')){

		case -1:
			userType = 2;

		break;

		default:
			userType = 1;
		break;
	}

	console.log(activeModal);

	if(this.innerHTML.indexOf('Editar') != -1){

		getUser(userType);

		$(activeModal).find('.crud-select').removeClass('hidden');
		$(activeModal).find('.row').removeClass('hidden');

	}else if(this.innerHTML.indexOf('Borrar') != -1){

		getUser(userType);

		$(activeModal).find('.crud-select').removeClass('hidden');
		$(activeModal).find('.row').addClass('hidden');

	}else if(this.innerHTML.indexOf('Crear') != -1){

		$(activeModal).find('.crud-select').addClass('hidden');
		$(activeModal).find('.row').removeClass('hidden');

	}
}

function setEvents(){

	$('*[data-toggle="modal"]').click(clickBtnModal);
	$('#submitBtn').click(submitCorrector);
	$('#submitSprvsor').click(submitSupervisor);

	$('#crearEquipo, #editEquipo, #borrarEquipo').click(showSelect);

	$('#crearCorrector, #editarCorrector, #borrarCorrector, #crearSupervisor, #editarSupervisor, #borrarSupervisor').click(showSelectUser);

	$('.crud-select > select').change(loadUser);

	$('#inputIdEquipo').change(loadEquipo);
}

function loadEquipo(e){

	var opts = $(this).children();

	$('#inputEquipo').val($(this).children()[this.selectedIndex].innerHTML);
}

function loadUser(e){

	var opts = $(this).children();

	console.log(this.selectedIndex, opts, opts[this.selectedIndex].userData, $(this).closest('.modal-header').siblings().find('input'));

	$(this).closest('.modal-header').siblings().find('input');

	$(this).closest('.modal-header').siblings().find('input')[0].value = opts[this.selectedIndex].userData.usuario;
	$(this).closest('.modal-header').siblings().find('input')[1].value = opts[this.selectedIndex].userData.password;
	$(this).closest('.modal-header').siblings().find('input')[2].value = opts[this.selectedIndex].userData.nombre;
	$(this).closest('.modal-header').siblings().find('input')[3].value = opts[this.selectedIndex].userData.apellidoPaterno;
	$(this).closest('.modal-header').siblings().find('input')[4].value = opts[this.selectedIndex].userData.apellidoMaterno;
	$(this).closest('.modal-header').siblings().find('input')[5].value = opts[this.selectedIndex].userData.correo;
}


function submitCorrector(e){

	// console.log($(this).closest('.modal-body').find('input'));

	var inputs = $(this).closest('.modal-body').find('input');

	if($(this).closest('.modal-body').find('.crud-select').hasClass('hidden')){

		editUser(2, inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value);
	}else{

		sendNewUser(2, inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value);
	}
}

function submitSupervisor(e){

	// console.log($(this).closest('.modal-body').find('input'));

	var inputs = $(this).closest('.modal-body').find('input');

	if($(this).closest('.modal-body').find('.crud-select').hasClass('hidden')){

		editUser(1, inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value);
	}else{

		sendNewUser(1, inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value);
	}
}

function getEquipos(){
	$('#inputIdEquipo').empty();

	$.getJSON( "./persistence/equipos.json", function( data ) {

		datosRespuestas = data;

		datos = data;

		console.log(datos);
		$('#inputIdEquipo').append('<option value="-">Seleccione un Equipo</option>');

		for (var i = 0; i < datos.length; i++) {

			$('#inputIdEquipo').append('<option value="' + datos[i].idEquipo + '">' + datos[i].nombre + '</option>');
		};
	});

}

function getUser(type){

	switch(type){

		case 1:
			getSupervisores();
		break;
		case 2:
			getCorrectores();
		break;
	}
}

function getCorrectores(){

	var sel = $('#CorrectorModal #selectUser').empty();

	$.getJSON( "./persistence/correctores.json", function( data ) {

		datosRespuestas = data;

		datos = data;

		console.log(datos);

		var opt = document.createElement('option');
			opt.value = '--';
			opt.innerHTML = 'Seleccione Usuario';

		$(sel).append(opt);

		for (var i = 0; i < datos.length; i++) {

			var option = document.createElement('option');
				option.value =  datos[i].idUsuario;
				option.userData = datos[i];
				option.innerHTML = datos[i].apellidoPaterno + ' ' + datos[i].apellidoMaterno + ', ' + datos[i].nombre;

			$(sel).append(option);
		};
	});
}

function getSupervisores(){

	var sel = $('#SupervisorModal #selectUser').empty();

	$.getJSON( "./persistence/supervisores.json", function( data ) {

		datosRespuestas = data;

		datos = data;

		console.log(datos);

		var opt = document.createElement('option');
			opt.value = '--';
			opt.innerHTML = 'Seleccione Usuario';

		$(sel).append(opt);

		for (var i = 0; i < datos.length; i++) {

			var option = document.createElement('option');
				option.value =  datos[i].idUsuario;
				option.userData = datos[i];
				option.innerHTML = datos[i].apellidoPaterno + ' ' + datos[i].apellidoMaterno + ', ' + datos[i].nombre;

			$(sel).append(option);
		};
	});
}


function getPreguntas(){


}

function sendNewUser(id_tipo_usuario, usuario, password, nombre, apellido_paterno, apellido_materno, correo){

	io.emit('Crear Usuario', { id_tipo_usuario: id_tipo_usuario, usuario:usuario, password:password, nombre:nombre, apellido_paterno:apellido_paterno, apellido_materno:apellido_materno, correo:correo });
}

function editUser(id_tipo_usuario, usuario, password, nombre, apellido_paterno, apellido_materno, correo){

	io.emit('Editar Usuario', { id_tipo_usuario: id_tipo_usuario, usuario:usuario, password:password, nombre:nombre, apellido_paterno:apellido_paterno, apellido_materno:apellido_materno, correo:correo });
}

function deleteUser(id_usuario){

	io.emit('Borrar Usuario', { id_usuario: id_usuario });
}

function sendNewEquipo(nombre){

	io.emit('Crear Equipo', { nombre: nombre});
}



$.AdminBSB.rightSideBar = {
    activate: function () {
        var _this = this;
        var $sidebar = $('#rightsidebar');
        var $overlay = $('.overlay');

        //Close sidebar
        $(window).click(function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() === 'i') { $target = $(e.target).parent(); }

            if (!$target.hasClass('js-right-sidebar') && _this.isOpen() && $target.parents('#rightsidebar').length === 0) {
                if (!$target.hasClass('bars')) $overlay.fadeOut();
                $sidebar.removeClass('open');
            }
        });

        $('.js-right-sidebar').on('click', function () {
            $sidebar.toggleClass('open');
            if (_this.isOpen()) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
        });
    },
    isOpen: function () {
        return $('.right-sidebar').hasClass('open');
    }
}