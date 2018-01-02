// agregar Usuario: id_tipo_usuario, usuario, password, nombre, apellido_paterno, apellido_materno, correo

window.onload = function(){

	setEvents();
	initPlugins();
}

function initPlugins(){

	$.AdminBSB.rightSideBar = {

		activate: function () {
			var _this = this;
			var $sidebar = $('#rightsidebar');
			var $overlay = $('.overlay');

			//Close sidebar
			$(window).click(function (e) {
				var $target = $(e.target);
				if (e.target.nodeName.toLowerCase() === 'i') { $target = $(e.target).parent(); }

				if (!$target.hasClass('js-right-sidebar') && _this.isOpen() && !$target.hasClass('right-sidebar') && $target.parents('#rightsidebar').length === 0) {
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
			// console.log($('.right-sidebar').hasClass('open'));
			return $('.right-sidebar').hasClass('open');
		}
	}

	$.AdminBSB.rightSideBar.activate();
}

function btnCRUDEvt(e){

	// console.log(this);

	var fction = '';
	var userType = 2;
	var title = '';

	if(this.id.includes('crear')){

		fction = 'crear';
	}else if(this.id.includes('edit')){

		fction = 'editar';
	}else if(this.id.includes('borrar')){

		fction = 'eliminar';
	}else if(this.id.includes('Asignar')){

		fction = 'asignar';
	}

	// console.log(this.id.includes('Pregunta'));

	if(this.id.includes('Corrector')){

		createPersonaForm(fction, 2);
		title = 'Corrector';
	}else if(this.id.includes('Equipo')){

		createEquipoForm(fction);
		title = 'Equipo';
	}else if(this.id.includes('Supervisor')){

		createPersonaForm(fction, 1);
		title = 'Supervisor';
	}else if(this.id.includes('Pregunta')){

		createPreguntaForm();
		title = 'Pregunta';
	}

	$('#rightsidebar .header > *').html( toTitleCase(fction + ' ' + title) );

	// console.log('hola: ', this.id.includes('Corrector'));

	// $(this.dataset.target).find('#submitBtn, #submitSprvsor').html(this.innerHTML);
	// $(this.dataset.target).find('#defaultModalLabel').html(this.innerHTML);
	// $(this.dataset.target).find('input').val('');
}

function showSelect(e){

	// console.log(this.dataset.target, this.innerHTML, this.innerHTML.indexOf('Editar'));

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

	// console.log(activeModal);

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

	$('.btn-admin').click(btnCRUDEvt);
}

function loadEquipo(e){

	var opts = $(this).children();

	$(this).closest('.form-content').find('input').attr('disabled', false);

	if(this.selectedIndex == 0){

		$(this).closest('.form-content').find('input').val('');
		$(this).closest('.form-content').find('#btnConfirm').attr('disabled', true);
	}else{

		if( $(this).closest('.form-content').find('input').hasClass('keep-disabled') )
			$(this).closest('.form-content').find('input').attr('disabled', true);

		$(this).closest('.form-content').find('#btnConfirm').attr('disabled', false);
		$(this).closest('.form-content').find('input').val($(this).children()[this.selectedIndex].innerHTML);
	}
}

function loadUser(e){

	var opts = $(this).children();

	if(this.value == 'Seleccione Usuario'){

		$(this).closest('.form-content').find('input').attr('disabled', true);
		$(this).closest('.form-content').find('#btnConfirm').attr('disabled', true);

		$(this).closest('.form-content').find('input')[0].value = '';
		$(this).closest('.form-content').find('input')[1].value = '';
		$(this).closest('.form-content').find('input')[2].value = '';
		$(this).closest('.form-content').find('input')[3].value = '';
		$(this).closest('.form-content').find('input')[4].value = '';
		$(this).closest('.form-content').find('input')[5].value = '';
	}else{

		if( !$(this).closest('.form-content').find('input').hasClass('keep-disabled') )
			$(this).closest('.form-content').find('input').attr('disabled', false);

		$(this).closest('.form-content').find('#btnConfirm').attr('disabled', false);

		$(this).closest('.form-content').find('input')[0].value = opts[this.selectedIndex].userData.usuario;
		$(this).closest('.form-content').find('input')[1].value = opts[this.selectedIndex].userData.password;
		$(this).closest('.form-content').find('input')[2].value = opts[this.selectedIndex].userData.nombre;
		$(this).closest('.form-content').find('input')[3].value = opts[this.selectedIndex].userData.apellidoPaterno;
		$(this).closest('.form-content').find('input')[4].value = opts[this.selectedIndex].userData.apellidoMaterno;
		$(this).closest('.form-content').find('input')[5].value = opts[this.selectedIndex].userData.correo;
	}
}

/**
	fction = editar, crear o eliminar
	userType = 1: supervisor, 2: corrector
*/

function createPersonaForm(fction, userType){

	$('#rightsidebar .form-content').empty();

	var usType = userType == 1 ? 'Supervisor' : 'Corrector';

	var btnConfirm = document.createElement('button');
		btnConfirm.id = 'btnConfirm';
		btnConfirm.className = 'btn btn-success waves-effect';
		btnConfirm.innerHTML = fction;

	var row = document.createElement('div');
		row.className = 'row';

	var col = document.createElement('div');
		col.className = 'col-sm-6';

	var formGroup = document.createElement('div');
		formGroup.className = 'form-group form-float';

	var formLine = document.createElement('div');
		formLine.className = 'form-line';

	var input = document.createElement('input');
		input.className = 'form-control';

	var inputUser = input.cloneNode(true);
		inputUser.id = 'inputUser_'+usType;
		inputUser.type = 'text';
		inputUser.placeholder = 'Nombre de Usuario';

	var rowUserLogin = row.cloneNode(true);
		var colHalf = col.cloneNode(true);
		var fg = formGroup.cloneNode(true);
		var fl = formLine.cloneNode(true);

		fl.appendChild(inputUser);
		fg.appendChild(fl.cloneNode(true));
		colHalf.appendChild(fg.cloneNode(true));
		rowUserLogin.appendChild(colHalf);

		var inputPass = input.cloneNode(true);
			inputPass.id = 'inputPass_'+usType;
			inputPass.type = 'password';
			inputPass.placeholder = 'Contraseña';

		// var rowUserLogin = row.cloneNode(true);
		var colHalf = col.cloneNode(true);
		var fg = formGroup.cloneNode(true);
		var fl = formLine.cloneNode(true);

		fl.appendChild(inputPass);
		fg.appendChild(fl.cloneNode(true));
		colHalf.appendChild(fg.cloneNode(true));

		rowUserLogin.appendChild(colHalf);

	var rowPersonalData = row.cloneNode(true);
		var colHalf = col.cloneNode(true);
			colHalf.className = 'col-sm-12';
		var fg = formGroup.cloneNode(true);
		var fl = formLine.cloneNode(true);

		var inputNames = input.cloneNode(true);
			inputNames.id = 'inputNames_'+usType;
			inputNames.type = 'text';
			inputNames.placeholder = 'Nombres';

		fl.appendChild(inputNames);
		fg.appendChild(fl.cloneNode(true));
		colHalf.appendChild(fg.cloneNode(true));

		rowPersonalData.appendChild(colHalf);

	var rowData = row.cloneNode(true);
		var colHalf = col.cloneNode(true);
		var fg = formGroup.cloneNode(true);
		var fl = formLine.cloneNode(true);

		var inputApeP = input.cloneNode(true);
			inputApeP.id = 'apellidoPaterno_'+usType;
			inputApeP.type = 'text';
			inputApeP.placeholder = 'Apellido Paterno';

		fl.appendChild(inputApeP.cloneNode(true));
		fg.appendChild(fl.cloneNode(true));
		colHalf.appendChild(fg.cloneNode(true));

		rowData.appendChild(colHalf);

		var colHalf = col.cloneNode(true);
		var fg = formGroup.cloneNode(true);
		var fl = formLine.cloneNode(true);

		var inputApeP = input.cloneNode(true);
			inputApeP.id = 'inputMaterno_'+usType;
			inputApeP.type = 'text';
			inputApeP.placeholder = 'Apellido Materno';

		fl.appendChild(inputApeP.cloneNode(true));
		fg.appendChild(fl.cloneNode(true));
		colHalf.appendChild(fg.cloneNode(true));

		rowData.appendChild(colHalf);

		var colHalf = col.cloneNode(true);
		var fg = formGroup.cloneNode(true);
		var fl = formLine.cloneNode(true);

		var inputApeP = input.cloneNode(true);
			inputApeP.id = 'inputEmail_'+usType;
			inputApeP.type = 'text';
			inputApeP.placeholder = 'Correo Electrónico';

		fl.appendChild(inputApeP.cloneNode(true));
		fg.appendChild(fl.cloneNode(true));
		colHalf.appendChild(fg.cloneNode(true));

		rowData.appendChild(colHalf);

	$('#rightsidebar .form-content').append(rowUserLogin);
	$('#rightsidebar .form-content').append(rowPersonalData);
	$('#rightsidebar .form-content').append(rowData);

	if(fction == 'editar' || fction == 'eliminar'){

		var select = document.createElement('select');
			select.id = 'select_'+usType;
			select.className = 'form-control';

		var opt = document.createElement('option');
			opt.innerHTML = 'Seleccione Usuario';

		select.appendChild(opt);

		var colHalf = col.cloneNode(true);
		var fg = formGroup.cloneNode(true);
		var fl = formLine.cloneNode(true);

		fl.appendChild(select);
		fg.appendChild(fl.cloneNode(true));
		colHalf.appendChild(fg.cloneNode(true));
		var rowSelect = row.cloneNode(false);
		rowSelect.appendChild(colHalf);

		$('#rightsidebar .form-content').find('input').attr('disabled', true);
		$('#rightsidebar .form-content').prepend(rowSelect);

		$('#select_'+usType).on('change', loadUser);

		// console.log('tipos de usuarios: ', usType, userType);

		getUser(userType);
	}

	switch(fction){

		case 'editar':

			$(btnConfirm).attr('disabled', true);

			if( userType == 1 )
				btnConfirm.addEventListener('click', submitSupervisor, false);
			else
				btnConfirm.addEventListener('click', submitCorrector, false);
		break;

		case 'crear':
			

			if( userType == 1 )
				btnConfirm.addEventListener('click', submitSupervisor, false);
			else
				btnConfirm.addEventListener('click', submitCorrector, false);
		break; 

		case 'eliminar':
			$(btnConfirm).attr('disabled', true);

			btnConfirm.addEventListener('click', submitBorrarUsuario, false);
			$('#rightsidebar .form-content').find('input').addClass('keep-disabled');


			$(btnConfirm).removeClass('btn-success').addClass('btn-danger');
		break;
	}

	$('#rightsidebar .form-content').append(btnConfirm);
}

function createEquipoForm(fction){

	$('#rightsidebar .form-content').empty();

	var btnConfirm = document.createElement('button');
		btnConfirm.id = 'btnConfirm';
		btnConfirm.className = 'btn btn-success waves-effect';
		btnConfirm.innerHTML = fction;

	var row = document.createElement('div');
		row.className = 'row';

	var col = document.createElement('div');
		col.className = 'col-sm-6';

	var formGroup = document.createElement('div');
		formGroup.className = 'form-group form-float';

	var formLine = document.createElement('div');
		formLine.className = 'form-line';

	var input = document.createElement('input');
		input.className = 'form-control';
		input.id = 'inputEquipoName';
		input.placeholder = 'Nombre del Equipo';

	var colHalf = col.cloneNode(true);
	var fg = formGroup.cloneNode(true);
	var fl = formLine.cloneNode(true);

	fl.appendChild(input);
	fg.appendChild(fl);
	colHalf.appendChild(fg);
	row.appendChild(colHalf);

	$('#rightsidebar .form-content').append(row);

	if(fction != 'crear'){

		$(input).attr('disabled', true);

		var colHalf = col.cloneNode(true);
		var fg = formGroup.cloneNode(true);
		var fl = formLine.cloneNode(true);

		var select = document.createElement('select');
			select.id = 'selectEquipo';
			select.className = 'form-control';

		var opt = document.createElement('option');
			opt.innerHTML = 'Seleccione Equipo';

		select.appendChild(opt);
		fl.appendChild(select);
		fg.appendChild(fl.cloneNode(true));
		colHalf.appendChild(fg.cloneNode(true));
		$(row).prepend(colHalf);

		getEquipos($('#selectEquipo')[0]);

		$('#selectEquipo').on('change', loadEquipo);
	}

	switch(fction){

		case 'editar':

			btnConfirm.addEventListener('click', submitEquipo, false);
			$(btnConfirm).attr('disabled', true);
		break;

		case 'crear':

			btnConfirm.addEventListener('click', submitEquipo, false);
		break; 

		case 'eliminar':

			btnConfirm.addEventListener('click', submitBorrarUsuario, false);
			$(btnConfirm).attr('disabled', true);
			input.classList.add('keep-disabled');

			$(btnConfirm).removeClass('btn-success').addClass('btn-danger');
		break;
	}

	$('#rightsidebar .form-content').append(btnConfirm);
}

function createPreguntaForm(){

	$('#rightsidebar .form-content').empty();

	var btnConfirm = document.createElement('button');
		btnConfirm.id = 'btnConfirm';
		btnConfirm.className = 'btn btn-success waves-effect';
		btnConfirm.innerHTML = 'Asignar';
		btnConfirm.addEventListener('click', submitAsignarPregunta, false);

	var row = document.createElement('div');
		row.className = 'row';

	var col = document.createElement('div');
		col.className = 'col-sm-6';

	var formGroup = document.createElement('div');
		formGroup.className = 'form-group form-float';

	var formLine = document.createElement('div');
		formLine.className = 'form-line';

	var selectPregunta = document.createElement('select');
		selectPregunta.id = 'selectPregunta';
		selectPregunta.className = 'form-control';

	var opt = document.createElement('option');
		opt.innerHTML = 'Seleccione Pregunta';

	selectPregunta.appendChild(opt);

	var colHalf = col.cloneNode(false);
	var fg = formGroup.cloneNode(false);
	var fl = formLine.cloneNode(false);

	fl.appendChild(selectPregunta);
	fg.appendChild(fl);
	colHalf.appendChild(fg);
	row.appendChild(colHalf);

	var selectEquipo = document.createElement('select');
		selectEquipo.id = 'selectEquipo';
		selectEquipo.className = 'form-control';

	var opti = document.createElement('option');
		opti.innerHTML = 'Seleccione Equipo';

	selectEquipo.appendChild(opti.cloneNode(true));

	var colHalf = col.cloneNode(true);
	var fg = formGroup.cloneNode(true);
	var fl = formLine.cloneNode(true);

	fl.appendChild(selectEquipo);
	fg.appendChild(fl);
	colHalf.appendChild(fg);
	row.appendChild(colHalf);

	$('#rightsidebar .form-content').append(row);

	$('#rightsidebar .form-content').append(btnConfirm);

	getEquipos(selectEquipo);
}

// MANEJO DE DATOS

	function submitEquipo(e){

		var inputs = $(this).closest('.form-content').find('input');

		if( $(this).closest('.form-content').find('select').length > 0 ){

			editEquipo($('.form-content').find('select').val(), inputs.val());
		}else{

			sendNewEquipo(inputs.val());
		}
	}

	function submitAsignarPregunta(e){

		var inputs = $(this).closest('.form-content').find('select');

		if(inputs[0].selectedIndex != 0 && inputs[1].selectedIndex != 0){

			assignPregunta(inputs[0].value, inputs[1].value);
		}
	}

	function submitBorrarEquipo(e){

		deleteEquipo( $('.form-content').find('select').val() );
	}

	function submitCorrector(e){

		// console.log($(this).closest('.form-content').find('input'));

		var inputs = $(this).closest('.form-content').find('input');

		if( $(this).closest('.form-content').find('select').length > 0 ){

			editUser(2, $(this).closest('.form-content').find('select').val(), inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value);
		}else{

			sendNewUser(2, inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value);
		}
	}

	function submitSupervisor(e){

		// console.log($(this).closest('.form-content').find('input'));

		var inputs = $(this).closest('.form-content').find('input');

		if( $(this).closest('.form-content').find('select').length > 0 ){

			editUser(1, $(this).closest('.form-content').find('select').val(), inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value);
		}else{

			sendNewUser(1, inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value);
		}
	}

	function getPreguntas(element){


	}

	function getEquipos(element){
		// $('#inputIdEquipo').empty();

		$.getJSON( "./persistence/equipos.json", function( data ) {

			datosRespuestas = data;

			datos = data;

			// console.log(datos);
			// $('#inputIdEquipo').append('<option value="-">Seleccione un Equipo</option>');

			for (var i = 0; i < datos.length; i++) {

				$(element).append('<option value="' + datos[i].idEquipo + '">' + datos[i].nombre + '</option>');
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

		var sel = $('#select_Corrector');

		$.getJSON( "./persistence/correctores.json", function( data ) {

			datosRespuestas = data;

			datos = data;

			// console.log(datos);

			var opt = document.createElement('option');
				opt.value = '--';
				opt.innerHTML = 'Seleccione Usuario';

			// $(sel).append(opt);

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

		var sel = $('#select_Supervisor');

		$.getJSON( "./persistence/supervisores.json", function( data ) {

			datosRespuestas = data;

			datos = data;

			// console.log(datos);

			var opt = document.createElement('option');
				opt.value = '--';
				opt.innerHTML = 'Seleccione Usuario';

			// $(sel).append(opt);

			for (var i = 0; i < datos.length; i++) {

				var option = document.createElement('option');
					option.value =  datos[i].idUsuario;
					option.userData = datos[i];
					option.innerHTML = datos[i].apellidoPaterno + ' ' + datos[i].apellidoMaterno + ', ' + datos[i].nombre;

				$(sel).append(option);
			};
		});
	}

	function submitBorrarUsuario(e){

		// console.log(
		// 	$(this).closest('.form-content').find('select'),
		// 	$(this).closest('.form-content').find('select').val()
		// );

		var idUser = $(this).closest('.form-content').find('select').val();

		deleteUser(idUser);
	}

	function getPreguntas(){


	}
	
	function sendNewUser(id_tipo_usuario, usuario, password, nombre, apellido_paterno, apellido_materno, correo){

		io.emit('Crear Usuario', { id_tipo_usuario: id_tipo_usuario, usuario:usuario, password:password, nombre:nombre, apellido_paterno:apellido_paterno, apellido_materno:apellido_materno, correo:correo });
	}

	function editUser(id_tipo_usuario, id_usuario, usuario, password, nombre, apellido_paterno, apellido_materno, correo){

		io.emit('Editar Usuario', { 
			id_tipo_usuario: id_tipo_usuario,
			id_usuario: id_usuario,
			usuario:usuario,
			password:password,
			nombre:nombre,
			apellido_paterno:apellido_paterno,
			apellido_materno:apellido_materno,
			correo:correo
		});
	}

	function deleteUser(id_usuario){

		io.emit('Borrar Usuario', { id_usuario: id_usuario });
	}

	function sendNewEquipo(nombre){

		io.emit('Crear Equipo', { nombre: nombre});
	}

	function editEquipo(id, nombre){

		io.emit('Editar Equipo', { id_equipo:id, nombre: nombre});
	}

	function deleteEquipo(id){

		io.emit('Borrar Equipo', { id_equipo:id });
	}

	function assignPregunta(idPreg, idEquipo){

		io.emit('Asignar Pregunta', { id_pregunta: idPreg, id_equipo: idEquipo});
	}

	function toTitleCase(str){
   		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}