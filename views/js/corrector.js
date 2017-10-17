var datosRespuestas,
	listaCorregidas = [],
	listaNoCorregidas = [],
	listaDudas = [],
	io = io();

$( document ).ready( function(){

	$.AdminBSB.browser.activate();
    $.AdminBSB.navbar.activate();
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();
    $.AdminBSB.search.activate();

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
}

function clearContent(){

	$('#familiaRespuestas').empty();
	$('#noCorregidas > .panel-body').empty();
	$('#corregidas > .panel-body').empty();
	$('#preguntasDudas > .panel-body').empty();
}

function loadRespuesta(respuesta){

	$('#preguntaDisplay').empty().html('Respuesta N°'+respuesta.id_respuesta);

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

	switch(respuesta.id_estado){

		case 2:

			$('#chBoxCorregida').prop('checked', true);
			$('#chboxDuda').prop('checked', false);

		break;

			
		case 3:

			$('#chboxDuda').prop('checked', true);
			$('#chBoxCorregida').prop('checked', false);

		break;

		case 1:
			
			$('#chBoxCorregida, #chboxDuda').prop('checked', false);

		break;
	}

	toggleCorregidaCheckbox();
	changePanel();
}

function updateNoCorregida(respuesta){

	listaNoCorregidas[listaNoCorregidas.indexOf(respuesta)].correccion = getCodigosAsignados();
	toggleCorregidaCheckbox();
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

	return $('#noCorregidas > .panel-body, #corregidas > .panel-body, #preguntasDudas > .panel-body').find('.btn-primary')[0];
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
			btnCodigo.className ='btn btn-block btn-lg waves-effect';
			btnCodigo.innerHTML = 'Respuesta N°' + subElements[index].id_respuesta;
			btnCodigo.respuestaData = subElements[index];
			btnCodigo.onclick = clickRespuestaEvt;

		switch(subElements[index].id_estado){

			// 1 es de una respuesta no corregida
			case 1:
				listaNoCorregidas.push(subElements[index]);
				$('#noCorregidas > .panel-body').append(btnCodigo);
			break;

			// 2 corregida
			case 2:
				listaCorregidas.push(subElements[index]);
				$('#corregidas > .panel-body').append(btnCodigo);
			break;

			// 3 duda
			case 3:
				listaDudas.push(subElements[index]);
				$('#preguntasDudas > .panel-body').append(btnCodigo);
			break;
		}

		if(index != 0){

			btnCodigo.classList.add('btn-default');
		}else{
			
			btnCodigo.classList.add('btn-primary');
			loadRespuesta(subElements[index]);
		}
	}
}

// 
function clickRespuestaEvt(e){

	var contPreguntas = '#noCorregidas > .panel-body, #corregidas > .panel-body, #preguntasDudas > .panel-body';

	$(contPreguntas).children().not(this).removeClass('btn-primary').addClass('btn-default');
	$(this).removeClass('btn-default').addClass('btn-primary');

	loadRespuesta(this.respuestaData);
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

		switch(getRespuestaActiva().id_estado){

			case 1:

				listaNoCorregidas.splice(listaNoCorregidas.indexOf(getRespuestaActiva()), 1);
			break;

			case 2:

				listaCorregidas.splice(listaCorregidas.indexOf(getRespuestaActiva()), 1);
			break;	
		}

		getRespuestaActiva().id_estado = 3;
		listaDudas.push(getRespuestaActiva());
		$(getBtnRespuestaActivo()).prependTo('#preguntasDudas > .panel-body');
	}else{

		if(getRespuestaActiva().correccion.length > 0){

			getRespuestaActiva().id_estado = 2;

			listaCorregidas.push(getRespuestaActiva());
			listaDudas.splice(listaDudas.indexOf(getRespuestaActiva()), 1);

			$(getBtnRespuestaActivo()).prependTo('#corregidas > .panel-body');
		}else{

			getRespuestaActiva().id_estado = 1;

			listaNoCorregidas.push(getRespuestaActiva());
			listaDudas.splice(listaDudas.indexOf(getRespuestaActiva()), 1);
			$(getBtnRespuestaActivo()).appendTo('#noCorregidas > .panel-body');
		}
	}

	toggleCorregidaCheckbox();
	changePanel();
}

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

function changePanel(){

	toggleHighlight();

	toggleCollapsePanelActivo();

	toggleBtnsCodigos();
}

function toggleHighlight(){

	$('.panel').removeClass('highlight');

	$(getBtnRespuestaActivo()).closest('.panel').addClass('highlight');
}

function toggleCollapsePanelActivo(){

	if(!$(getBtnRespuestaActivo()).closest('.panel-collapse.collapse').hasClass('in')){

		$(getBtnRespuestaActivo()).closest('.panel-collapse.collapse').addClass('in');
		$(getBtnRespuestaActivo()).closest('.panel-collapse.collapse').attr('aria-expanded', true);
		$(getBtnRespuestaActivo()).closest('.panel-collapse.collapse').css('height', '');
	}
}

function toggleBtnsCodigos(){

	if(getRespuestaActiva().id_estado == 1){

		$(getBtnsCodigos()).attr('disabled', false);
	}else{

		$(getBtnsCodigos()).attr('disabled', 'disabled');;
	}
}

function toggleCorregidaCheckbox(){

	if(getRespuestaActiva().correccion.length > 0){

		$('#chBoxCorregida').attr('disabled', false);
	}else{

		$('#chBoxCorregida').attr('disabled', 'disabled');
	}
}

function navRespuetas(direction){

	var arrayBtns = $(getBtnRespuestaActivo()).parent().children(),
		currentIndex = arrayBtns.index(getBtnRespuestaActivo());

	var newIndex = 0;

	newIndex = (currentIndex+direction)>=0 ? (currentIndex+direction) %arrayBtns.length : arrayBtns.length-1;

	$(getBtnRespuestaActivo()).removeClass('btn-primary').addClass('btn-default');
	$(arrayBtns[newIndex]).removeClass('btn-default').addClass('btn-primary');

	loadRespuesta(arrayBtns[newIndex].respuestaData);
}

function saveInSS(){


}

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

//eventos que son lanzados por el servidor
io.on('Resultado Correccion', function(data){
	
	//"data.mensaje" devuelve el resultado del intento de guardado: ok, si todo sale bien, error si falla
})

io.on('Estado Duda', function(data){
	
	//"data.mensaje" devuelve el resultado al intentar registrar la duda: ok, si todo sale bien, error si falla
})