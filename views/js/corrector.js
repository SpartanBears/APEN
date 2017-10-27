var datosRespuestas;
// listaCorregidas
// listaNoCorregidas
// listaDudas
// var io = io();

$( document ).ready( function(){

	$.AdminBSB.browser.activate();
    $.AdminBSB.navbar.activate();
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();
    $.AdminBSB.search.activate();

	$('.cols-corrector > .family-panel').css('width', $('.col-md-3.cols-corrector').width());
	$('.cols-corrector > .family-panel').css('height', $('.col-md-3.cols-corrector').height());

	getData(initCorrectorView);
});

function initCorrectorView(){

	clearContent();
	generateFamilyCollapsable(datosRespuestas.familias);
	setPanelButtons(datosRespuestas.respuestas);
	setEvents();
	loadPregunta();
}

function loadPregunta(){

	var estimuloTxt = '';

	/*
		tipos de estimulos
			1	texto
			2	imagen
			3	audio
			4	video
	*/

	switch(datosRespuestas.id_tipo_estimulo){

		case '1':

			if(typeof datosRespuestas.enunciado != 'undefined')	estimuloTxt = '<h4>' + datosRespuestas.enunciado + '</h4>';
			if(typeof datosRespuestas.estimulo != 'undefined')	estimuloTxt += datosRespuestas.estimulo;
		break;

		default:

		if(typeof datosRespuestas.enunciado != 'undefined')	estimuloTxt = '<h4>' + datosRespuestas.enunciado + '</h4>';
		if(typeof datosRespuestas.estimulo != 'undefined')	estimuloTxt += datosRespuestas.estimulo;
		break;
	}

	$('#estimuloDisplay').empty().html(estimuloTxt);
}

function setEvents(){

	$('#chboxDuda').click(clickCheckboxDuda);
	$('#chBoxCorregida').click(clickCheckboxCorregida);
	$('.btn-anterior').click(clickPrev);
	$('.btn-siguiente').click(clickNext);
	$(document).on('scroll', scrollHandler);
}

function scrollHandler(e){

	var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	// console.log(scrollTop, $('.cols-corrector')[1].offsetTop);

	if(scrollTop > $('.cols-corrector')[1].offsetTop){

		console.log(scrollTop - $('.cols-corrector')[1].offsetTop);

		$('.cols-corrector > .family-panel').addClass('fixed');

		$('.cols-corrector > .family-panel').css('top', scrollTop - $('.cols-corrector')[1].offsetTop+'px');

	}else if ($('.cols-corrector > .family-panel').hasClass('fixed')){

		$('.cols-corrector > .family-panel').removeClass('fixed');
		$('.cols-corrector > .family-panel').css('top', 0);
	}
}

function clearContent(){

	$('#familiaRespuestas').empty();
	$('#noCorregidas > .panel-body').empty();
	$('#corregidas > .panel-body').empty();
	$('#preguntasDudas > .panel-body').empty();
}

function loadRespuesta(respuesta){

	$('#tituloRespuesta').empty().html('Respuesta '+respuesta.id_respuesta);

	$('#familiaRespuestas').find('button.btn-primary').removeClass('btn-primary').addClass('btn-default');

	var btnsCodigos = getBtnsCodigos();

	if(respuesta.correccion.length > 0){

		for (var i = 0; i < respuesta.correccion.length; i++) {

			for(var c = 0; c < btnsCodigos.length; c++){

				if(respuesta.correccion[i].id_codigo == btnsCodigos[c].codigoData.id_codigo){

					btnsCodigos[c].classList.add('btn-primary');
					btnsCodigos[c].classList.remove('btn-default');
				}
			}
		}
	}else if(respuesta.id_estado == 1){

		if(typeof respuesta.correccion != 'undefined'){

			for (var i = 0; i < respuesta.correccion.length; i++) {

				for(var c = 0; c < btnsCodigos.length; c++){

					if(respuesta.correccion[i].id_codigo == btnsCodigos[c].idCodigo){

						btnsCodigos[c].classList.add('btn-primary');
						btnsCodigos[c].classList.remove('btn-default');
					}
				}
			}
		}
	}

	var respuestaTxt = '';

	if(typeof respuesta.titulo != 'undefined')	respuestaTxt = '<h4>' + respuesta.titulo + '</h4>';
	if(typeof respuesta.descripcion != 'undefined')	respuestaTxt += respuesta.descripcion;
	if(typeof respuesta.valor != 'undefined')	respuestaTxt += respuesta.valor;
	if(typeof respuesta.valor != 'undefined')	respuestaTxt += respuesta.estimulo;

	$('#respuestaDisplay').empty().html(respuestaTxt);

	setCheckboxDudaChecked(respuesta);

	toggleCorregidaCheckbox();
	changePanel();
}

function updateNoCorregida(respuesta){

	// listaNoCorregidas[listaNoCorregidas.indexOf(respuesta)].correccion = getCodigosAsignados();
	// toggleCorregidaCheckbox();

	var newAsignacion = getCodigosAsignados();

	datosRespuestas.respuestas[datosRespuestas.respuestas.indexOf(respuesta)].correccion = newAsignacion;

	if(newAsignacion.length > 0 && !isDudaRespuesta(respuesta)){

		datosRespuestas.respuestas[datosRespuestas.respuestas.indexOf(respuesta)].id_estado = 2;
	}else if (newAsignacion.length == 0 && !isDudaRespuesta(respuesta)){

		datosRespuestas.respuestas[datosRespuestas.respuestas.indexOf(respuesta)].id_estado = 1;
	}

	// console.log(, respuesta);
}

function isDudaRespuesta(respuesta){

	if (respuesta.id_estado == 3) {

		return true;
	}else{

		return false;
	}
}

function getCodigosAsignados(){

	var out = [],
		btnsActivos = $('#familiaRespuestas').find('.btn-primary');

	for (var i = 0; i < btnsActivos.length; i++) {
		out.push(btnsActivos[i].codigoData);
	};
	
	return out;
}

function getRespuestaActiva(){

	return getBtnRespuestaActivo().respuestaData;
}

function getBtnRespuestaActivo(){

	return $('#listadoRespuestas').find('.btn-primary')[0];
}

function getBtnsCodigos(){

	return $('.btn-codigo');
}

function getBtnsCodigosMismaFamilia(btn){

	return $(btn).closest('.panel-body').find('button.btn-codigo');
}

// PANEL FAMILIAS
	function generateFamilyCollapsable(families){

		var familiesContainer = document.getElementById('familiaRespuestas');

		for(var index = 0; index < families.length; index++){

			var titleFamily = families[index].titulo.toLowerCase().replace(' ', '_');

			var divPanel = document.createElement('div');
				divPanel.className = 'panel collapse-'+titleFamily;

			divPanel.appendChild(getPanelHeader(families[index].titulo, 'perm_contact_calendar'));
			divPanel.appendChild(getPanelBodyFamilies(families[index].titulo, families[index].codigos));

			$(familiesContainer).append(divPanel);
		}
	}

	function getPanelBodyFamilies(title, subElements){

		var titleFamily = title.toLowerCase().replace(' ', '_');

		var divTabPanel =document.createElement('div');
			divTabPanel.id = titleFamily;
			divTabPanel.className = 'panel-collapse collapse';
			divTabPanel.setAttribute('role', 'tabpanel');
			divTabPanel.setAttribute('aria-labelledby', titleFamily+'Head');

		var divPanelBody = document.createElement('div');
			divPanelBody.className = 'panel-body';

		for(var index = 0; index < subElements.length; index++){

			var btnGroup = document.createElement('div');
				btnGroup.className = 'btn-group btn-group-justified';
				btnGroup.setAttribute('role', 'group');

			var btnCodigo = document.createElement('button');
				btnCodigo.type = 'button';
				btnCodigo.className ='btn btn-lg btn-default waves-effect btn-codigo';
				btnCodigo.innerHTML = subElements[index].valor;
				btnCodigo.codigoData = subElements[index];
				btnCodigo.idCodigo = subElements[index].id_codigo;

				btnCodigo.onclick = clickCodigoEvt;

			var btnDescripcion = document.createElement('button');
				btnDescripcion.setAttribute('type', 'button');
				btnDescripcion.className = 'btn btn-default waves-effect btn-desc-codigo';
				btnDescripcion.innerHTML = '<i class="material-icons">lightbulb_outline</i>';
				btnDescripcion.dataset.toggle = 'modal';
				btnDescripcion.dataset.target = '#defaultModal';
				btnDescripcion.onclick = clickDescripcionCodigo;

			btnGroup.appendChild(btnCodigo);
			btnGroup.appendChild(btnDescripcion);
			divPanelBody.appendChild(btnGroup);

			// divPanelBody.appendChild(btnCodigo);
		}

		divTabPanel.appendChild(divPanelBody);

		return divTabPanel;
	}

	function getPanelHeader(title, icon){

		var titleFamily = title.toLowerCase().replace(' ', '_');

		var divPanelHeader = document.createElement('div');
			divPanelHeader.className = 'panel-heading';
			divPanelHeader.id = titleFamily+'Head';

		var hPanelHeader = document.createElement('h4');
			hPanelHeader.className = 'panel-title';

		var anchorHeader = document.createElement('a');
			anchorHeader.setAttribute('role', 'button');
			anchorHeader.dataset.toggle = 'collapse';
			anchorHeader.href = '#'+titleFamily;

		var iconContainer = document.createElement('i');
			iconContainer.className = 'material-icons';
			iconContainer.innerHTML = icon;

		if(icon != undefined)	anchorHeader.appendChild(iconContainer);
		$(anchorHeader).append(''+title);

		hPanelHeader.appendChild(anchorHeader);
		divPanelHeader.appendChild(hPanelHeader);

		return divPanelHeader;
	}
// FIN PANEL FAMILIAS

function setPanelButtons(subElements){

	for(var index = 0; index < subElements.length; index++){

		var btnCodigo = document.createElement('button');
			btnCodigo.type = 'button';
			btnCodigo.className ='btn btn-circle-lg waves-effect waves-circle waves-float btn-respuestas';
			btnCodigo.innerHTML = subElements[index].id_respuesta;
			btnCodigo.respuestaData = subElements[index];
			btnCodigo.onclick = clickRespuestaEvt;

		$('#listadoRespuestas').append(btnCodigo);

		if(index != 0){

			switch(subElements[index].id_estado){

				// 1 es de una respuesta no corregida
				case 1:
					btnCodigo.classList.add('btn-default');
				break;

				// 2 corregida
				case 2:
					
					btnCodigo.classList.add('btn-success');
				break;

				// 3 duda
				case 3:
					
					btnCodigo.classList.add('btn-warning');
				break;
			}
		}else{
			
			btnCodigo.classList.add('btn-primary');
			loadRespuesta(subElements[index]);
		}
	}
}

// 
function clickRespuestaEvt(e){

	var contPreguntas = '#listadoRespuestas';

	var arrayBtnRespuetas = $(contPreguntas).children().not(this);

	resetBtnStyle(arrayBtnRespuetas);

	$(this).removeClass('btn-default btn-success btn-warning').addClass('btn-primary');


	loadRespuesta(this.respuestaData);
}

function resetBtnStyle(arrayBtnRespuetas){

	for (var i = 0; i < arrayBtnRespuetas.length; i++) {

		// switch
		console.log(arrayBtnRespuetas[i].respuestaData.id_estado);
		switch(arrayBtnRespuetas[i].respuestaData.id_estado){

			case 1:
				$(arrayBtnRespuetas[i]).removeClass('btn-primary').addClass('btn-default');
			break;

			case 2:
				$(arrayBtnRespuetas[i]).removeClass('btn-primary').addClass('btn-success');
			break;

			case 3:
				$(arrayBtnRespuetas[i]).removeClass('btn-primary').addClass('btn-warning');
			break;

			default:
				$(arrayBtnRespuetas[i]).removeClass('btn-primary').addClass('btn-default');
			break;
		}
	};
}

function clickCodigoEvt(e){


	if(!$(this).hasClass('btn-primary')){
		$(this).removeClass('btn-default').addClass('btn-primary');
	}else{
		$(this).addClass('btn-default').removeClass('btn-primary');
	}

	$(getBtnsCodigosMismaFamilia(this)).not(this).removeClass('btn-primary').addClass('btn-default');

	updateNoCorregida(getRespuestaActiva());

	saveInSS();
}

function setCheckboxDudaChecked(respuesta){

	var cb = $('#chboxDuda')[0];

	if(respuesta.id_estado == 3){

		cb.checked = true;
	}else{

		cb.checked = false;
	}
}

function clickDescripcionCodigo(e){

	var datosCodigo = $(e.target).closest('button').siblings('.btn-codigo')[0].codigoData;
	var familia = $(this).closest('button').closest('.panel-collapse').siblings().find('a')[0].lastChild.textContent;

	$('#modalContent > .modal-header > .modal-title').html(datosCodigo.titulo);
	$('#modalContent > .modal-header > label.label-info').html('Codigo: ' + datosCodigo.valor);
	$('#modalContent > .modal-header > label.label-primary').html(familia);

	$('#modalContent > .modal-body').html(datosCodigo.descripcion);
}

function clickPrev(e){

	navRespuetas(-1);
}

function clickNext(e){

	navRespuetas(1);
}

function clickCheckboxDuda(e){

	var isInDuda = e.target.checked;

	if(isInDuda){

		datosRespuestas.respuestas[datosRespuestas.respuestas.indexOf(getRespuestaActiva())].id_estado = 3;
		
	}else{

		if(datosRespuestas.respuestas[datosRespuestas.respuestas.indexOf(getRespuestaActiva())].correccion.length>0){

			datosRespuestas.respuestas[datosRespuestas.respuestas.indexOf(getRespuestaActiva())].id_estado = 2;
		}else{

			datosRespuestas.respuestas[datosRespuestas.respuestas.indexOf(getRespuestaActiva())].id_estado = 1;
		}
	}

	// toggleCorregidaCheckbox();
	// changePanel();
}

// DEPRECADO
function clickCheckboxCorregida(e){

	var isInDuda = $('#chboxDuda').prop('checked'),
		isCorregida = e.target.checked;

	if(getRespuestaActiva().correccion.length > 0){
		if(!isInDuda){

			if(isCorregida){

				getRespuestaActiva().id_estado = 2;
				guardarCorreccion(getRespuestaActiva());
				listaCorregidas.push(getRespuestaActiva());
				listaNoCorregidas.splice(listaNoCorregidas.indexOf(getRespuestaActiva()), 1);

				var btnActivo = getBtnRespuestaActivo();

				navRespuetas(1);

				$(btnActivo).prependTo('#corregidas > .panel-body');
			}else{

				getRespuestaActiva().id_estado = 1;

				listaNoCorregidas.push(getRespuestaActiva());
				listaCorregidas.splice(listaCorregidas.indexOf(getRespuestaActiva()), 1);
				$(getBtnRespuestaActivo()).appendTo('#noCorregidas > .panel-body');
			}
		}
	}

	changePanel();
}
// 

// funciones que se ejecutan al momento de cambiar de panel de respuestas
// DEPRECADO
function changePanel(){

	toggleHighlight();

	toggleCollapsePanelActivo();

	toggleBtnsCodigos();
}

// resalta el panel de respuestas en donde se está navegando
// DEPRECADO
function toggleHighlight(){

	$('.panel').removeClass('highlight');

	$(getBtnRespuestaActivo()).closest('.panel').addClass('highlight');
}

// ayuda a expandir el acordeon de los paneles de respuestas
// -----DEPRECADO
function toggleCollapsePanelActivo(){

	if(!$(getBtnRespuestaActivo()).closest('.panel-collapse.collapse').hasClass('in')){

		$(getBtnRespuestaActivo()).closest('.panel-collapse.collapse').addClass('in');
		$(getBtnRespuestaActivo()).closest('.panel-collapse.collapse').attr('aria-expanded', true);
		$(getBtnRespuestaActivo()).closest('.panel-collapse.collapse').css('height', '');
	}
}

// activa o desactiva los botones de codigos en caso de que ya estén
// asignados ----DEPRECADO
function toggleBtnsCodigos(){

	// if(getRespuestaActiva().id_estado == 1){

	// 	$(getBtnsCodigos()).attr('disabled', false);
	// }else{

	// 	$(getBtnsCodigos()).attr('disabled', 'disabled');;
	// }
}

// activa o desactiva el checkbox de corregida en caso de que ya se le haya asignado
// un codigo
// DEPRECADO
function toggleCorregidaCheckbox(){

	if(getRespuestaActiva().correccion.length > 0){

		$('#chBoxCorregida').attr('disabled', false);
	}else{

		$('#chBoxCorregida').attr('disabled', 'disabled');
	}
}

// navega entre las respuestas
// se utiliza en los eventos de anterior y siguiente
function navRespuetas(direction){

	var arrayBtns = $(getBtnRespuestaActivo()).parent().children(),
		currentIndex = arrayBtns.index(getBtnRespuestaActivo());

	var newIndex = 0;

	newIndex = (currentIndex+direction)>=0 ? (currentIndex+direction) %arrayBtns.length : arrayBtns.length-1;

	resetBtnStyle(arrayBtns);

	// $(getBtnRespuestaActivo()).removeClass('btn-primary').addClass('btn-default');
	$(arrayBtns[newIndex]).removeClass('btn-default btn-success btn-warning').addClass('btn-primary');

	loadRespuesta(arrayBtns[newIndex].respuestaData);
}

// almacena los datos de las respuestas y preguntas en SS
// implementar la version LS
function saveInSS(){


}

// funcion que carga los datos de la pregunta
function getData(callback){

	var strData;

	$.getJSON( "./resources/correctorEjemplo.json", function( data ) {

		datosRespuestas = data;

		if(callback != undefined)	callback();
	});
}

function guardarCorreccion(data){
	io.emit('Guardar Correccion',{ id_respuesta:data.id_respuesta, codigo:data.correccion, id_usuario: 1 })
}

// //eventos que son lanzados por el servidor
// io.on('Resultado Correccion', function(data){
	
// 	//"data.mensaje" devuelve el resultado del intento de guardado: ok, si todo sale bien, error si falla
// })

// io.on('Estado Duda', function(data){
	
// 	//"data.mensaje" devuelve el resultado al intentar registrar la duda: ok, si todo sale bien, error si falla
// })