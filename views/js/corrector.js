var datosRespuestas,
	listaContestados = [],
	listaNoContestados = [],
	listaDudas = [];

$( document ).ready( function(){

	
	getData(initCorrectorView);
});

function initCorrectorView(){

	setCurrentIndex(0);
	setDataRespuestasNoAsignadas();

	clearContent();
	generateFamilyCollapsable(datosRespuestas.familias);
	setPanelButtons(datosRespuestas.respuestas);
	setEvents();
}

function setEvents(){

	$('button.btn-siguiente').click(nextBtnEvt);
	$('button.btn-duda').click(dudaBtnEvt);
}

function changeActiveBtn(btn){

	$(getArrayBtnRespuesta()).removeClass('btn-primary').addClass('btn-default');
	$(btn).addClass('btn-primary').removeClass('btn-default');
}

function findBtnRespuestaFromIdRespuesta(idRespuesta){

	var out = {};
	var arrayBtn = getArrayBtnRespuesta();

	for (var i = 0; i < arrayBtn.length; i++) {
		
		if(arrayBtn[i].idRespuesta == idRespuesta)	out = arrayBtn[i];
	};

	return out;
}

// MANEJO DATOS

	function getData(callback){

		var strData;

		$.getJSON( "./resources/correctorEjemplo.json", function( data ) {

			datosRespuestas = data;

			if(callback != undefined)	callback();
		});
	}

	function setRespuestasNoAsignadas(newRespuetas){

		sessionStorage.RA = JSON.stringify(newRespuetas);
	}

	function setDataRespuestasNoAsignadas(){

		var arrayResp = getArrayRespuestas(),
			respuestasNoAsignadas = [];

		for(var index = 0; index < arrayResp.length; index++){

			if(arrayResp[index].correccion.length == 0 && arrayResp[index].id_estado == 1){

				respuestasNoAsignadas.push(arrayResp[index]);

			}
		}

		setRespuestasNoAsignadas(respuestasNoAsignadas);
	}

	function saveInSS(){

		var ci = getCurrentIndex(),
			respAsignadas = getRespuestasAsignadas();

		if(typeof getRespuestasAsignadas()[ci] != 'undefined'){

			var arrayCodigos = [];

			for(var c = 0; c < $('#familiaRespuestas').find('.btn-primary').length; c++){

				var objResp = {id_codigo: $('#familiaRespuestas').find('.btn-primary')[c].idCodigo};

				arrayCodigos.push(objResp);
			}

			respAsignadas[ci].correccion = arrayCodigos;
		}

		setRespuestasNoAsignadas(respAsignadas);
	}

	function subirDatosRespuesta(respuesta){

		var arrayRespuestas = [];
			

		if(typeof respuesta.length == 'number')	arrayRespuestas.concat(respuesta);
		else	arrayRespuestas.push(respuesta);
	}

	function sendDuda(respuesta){

		console.log(respuesta);
	}
// FIN MANEJO DATOS

// NAVEGACION RESPUESTAS

function loadRespuesta(respuesta){

	$('#preguntaDisplay').empty().html('Respuesta N°'+respuesta.id_respuesta);

	var enuTxt = '';

	if(typeof datosRespuestas.enunciado != 'undefined')	respTxt = '<h4>' + datosRespuestas.enunciado + '</h4>';
	if(typeof datosRespuestas.estimulo != 'undefined')	respTxt += datosRespuestas.estimulo;

	$('#estimuloDisplay').empty().html(datosRespuestas.enunciado);
	var respTxt = '';

	/*
		tipos de estimulos
			1	texto
			2	imagen
			3	audio
			4	video
	*/

	switch(datosRespuestas.id_tipo_estimulo){

		case '1':

			if(typeof respuesta.titulo != 'undefined')	respTxt = '<h4>' + respuesta.titulo + '</h4>';
			if(typeof respuesta.descripcion != 'undefined')	respTxt += respuesta.descripcion;
			if(typeof respuesta.valor != 'undefined')	respTxt += respuesta.valor;
			if(typeof respuesta.valor != 'undefined')	respTxt += respuesta.estimulo;
		break;

		default:
			if(typeof respuesta.titulo != 'undefined')	respTxt = '<h4>' + respuesta.titulo + '</h4>';
			if(typeof respuesta.descripcion != 'undefined')	respTxt += respuesta.descripcion;
			if(typeof respuesta.valor != 'undefined')	respTxt += respuesta.valor;
			if(typeof respuesta.valor != 'undefined')	respTxt += respuesta.estimulo;
		break;
	}
	$('#respuestaDisplay').empty().html(respTxt);

	$('#familiaRespuestas').find('button.btn-primary').removeClass('btn-primary').addClass('btn-default');

	var btnsCodigos = $('#familiaRespuestas').find('button');

	console.log(respuesta);

	if(respuesta.correccion.length > 0){

		for (var i = 0; i < respuesta.correccion.length; i++) {

			for(var c = 0; c < btnsCodigos.length; c++){

				if(respuesta.correccion[i].id_codigo == btnsCodigos[c].idCodigo){

					btnsCodigos[c].classList.add('btn-primary');
					btnsCodigos[c].classList.remove('btn-default');
				}
			}
		}
	}else if(respuesta.id_estado == 1){

		var respA = getRespuestasAsignadas(),
			ci = getCurrentIndex();

		// asigna respuestas en ss
		if(typeof respA[ci].correccion != 'undefined'){

			for (var i = 0; i < respA[ci].correccion.length; i++) {

				for(var c = 0; c < btnsCodigos.length; c++){

					if(respA[ci].correccion[i].id_codigo == btnsCodigos[c].idCodigo){

						btnsCodigos[c].classList.add('btn-primary');
						btnsCodigos[c].classList.remove('btn-default');
					}
				}
			}
		}

	}

	changeActiveBtn(findBtnRespuestaFromIdRespuesta(respuesta.id_respuesta));
}

function navPreguntas(direction){

	var arrayRespuestas = getArrayRespuestas();

	console.log(arrayRespuestas[getRespuestaFromBtnActivo()].id_estado);

	switch(arrayRespuestas[getRespuestaFromBtnActivo()].id_estado){
		
		case 1:
			var currentIndex = getCurrentIndex();

			asignarCodigoRespuesta(arrayRespuestas[getRespuestaFromBtnActivo()].id_respuesta);

			// currentIndex = (currentIndex+direction)>=0 ? (currentIndex+direction) %getArrayRespuestas().length : getArrayRespuestas().length-1;
			
			var btn = getBtnRespuestaActivo();

			$(btn).prependTo("#contestadas > .panel-body");

			var index = ((currentIndex+1) % arrayRespuestas.length),
				respuestaSiguiente = null;

			if(getRespuestasAsignadas().length > 0){

				respuestaSiguiente = getRespuestasAsignadas()[((index+1) % getRespuestasAsignadas().length)];
				setCurrentIndex(((index+1) % getRespuestasAsignadas().length));
			}

			if(respuestaSiguiente == null){
				for(var cont = 0; cont < arrayRespuestas.length; cont++){

					if(arrayRespuestas[index].correccion.length == 0 && arrayRespuestas[index].id_estado == 1){


						respuestaSiguiente = getRespuestasAsignadas()[index];
						cont = arrayRespuestas.length;
						setCurrentIndex(index);
					}

					index = (index+1) % arrayRespuestas.length;
				}
			}

			if(respuestaSiguiente == null){

				respuestaSiguiente = arrayRespuestas[currentIndex];
				setCurrentIndex(currentIndex);
			}

			loadRespuesta(respuestaSiguiente);
		break;

		default:
			var currentIndex = getCurrentIndex();

			asignarCodigoRespuesta(arrayRespuestas[getRespuestaFromBtnActivo()].id_respuesta);

			// currentIndex = (currentIndex+direction)>=0 ? (currentIndex+direction) %getArrayRespuestas().length : getArrayRespuestas().length-1;
			

			var index = ((currentIndex+1) % arrayRespuestas.length),
				respuestaSiguiente = null;

			if(getRespuestasAsignadas().length > 0){

				respuestaSiguiente = getRespuestasAsignadas()[((index+1) % getRespuestasAsignadas().length)];
			}

			if(respuestaSiguiente == null){
				for(var cont = 0; cont < arrayRespuestas.length; cont++){

					if(arrayRespuestas[index].correccion.length == 0 && arrayRespuestas[index].id_estado == 1){


						respuestaSiguiente = getRespuestasAsignadas()[index];
						cont = arrayRespuestas.length;
						setCurrentIndex(index);
					}

					index = (index+1) % arrayRespuestas.length;
				}
			}

			if(respuestaSiguiente == null)	respuestaSiguiente = arrayRespuestas[currentIndex];

			loadRespuesta(respuestaSiguiente);
		break;
	}
}
// FIN NAVEGACION RESPUESTAS

// GENERACION DOM

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

			var btnCodigo = document.createElement('button');
				btnCodigo.type = 'button';
				btnCodigo.className ='btn btn-block btn-lg btn-default waves-effect';
				btnCodigo.innerHTML = subElements[index].valor;
				btnCodigo.titulo = subElements[index].titulo;
				btnCodigo.descripcion = subElements[index].descripcion;
				btnCodigo.idCodigo = subElements[index].id_codigo;

				btnCodigo.onclick = clickCodigoEvt;

				divPanelBody.appendChild(btnCodigo);
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
			btnCodigo.titulo = subElements[index].titulo;
			btnCodigo.descripcion = subElements[index].descripcion;
			btnCodigo.arrayIndex = index;
			btnCodigo.idRespuesta = subElements[index].id_respuesta;
			btnCodigo.onclick = clickRespuestaEvt;

		switch(subElements[index].id_estado){

			// 1 es de una respuesta no corregida
			case 1:
				listaNoContestados.push(subElements[index]);
				$('#noContestados > .panel-body').append(btnCodigo);
			break;

			// 2 corregida
			case 2:
				listaContestados.push(subElements[index]);
				$('#contestadas > .panel-body').append(btnCodigo);
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
			loadRespuesta(subElements[index]);
			btnCodigo.classList.add('btn-primary');
		}
	}
}

// FIN GENERACION DOM

// EVENTS

function dudaBtnEvt(e){

	var respuesta = findRespuestaFromArrayIndex(getRespuestaFromBtnActivo());

	if(respuesta.id_estado != 3){

		var toDuda = {};
		switch(respuesta.id_estado){

			case 1:

				toDuda = listaNoContestados.splice(listaNoContestados.indexOf(respuesta), 1);
			break;

			case 2:

				toDuda = listaContestados.splice(listaContestados.indexOf(respuesta), 1);
			break;
		}

		respuesta.id_estado = 3;
		listaDudas.push(respuesta);
		$(getBtnRespuestaActivo()).prependTo('#preguntasDudas > .panel-body');
	}else if(respuesta.id_estado == 3){

		listaDudas.splice(listaDudas.indexOf(respuesta), 1);

		if(respuesta.correccion.length > 0){

			respuesta.id_estado = 2;
			listaContestados.push(respuesta);
			$(getBtnRespuestaActivo()).prependTo('#contestadas > .panel-body');
		}else{

			respuesta.id_estado = 1;
			listaNoContestados.push(respuesta);
			$(getBtnRespuestaActivo()).appendTo('#noContestados > .panel-body');
		}
	}

	changeBtnDudaTxt();
}

function clickRespuestaEvt(e){

	var contPreguntas = '#noContestados > .panel-body, #contestadas > .panel-body, #preguntasDudas > .panel-body';

	var arrayRespuesta = getArrayRespuestas(),
		respAsignadas = getRespuestasAsignadas(),
		ci = getCurrentIndex();

	saveInSS();

	setCurrentIndex($(contPreguntas).children().index(this));

	$(contPreguntas).children().not(this).removeClass('btn-primary').addClass('btn-default');
	$(this).removeClass('btn-default').addClass('btn-primary');

	loadRespuesta(arrayRespuesta[this.arrayIndex]);

	changeBtnDudaTxt();
}

function changeBtnDudaTxt(){

	var RespActiva = findRespuestaFromArrayIndex(getRespuestaFromBtnActivo());

	switch(RespActiva.id_estado){

		case 3:
			$('.btn-duda').html('Desmarcar de dudas');
		break;

		default:
			$('.btn-duda').html('Reportar duda');
		break;
	}
}

function clickCodigoEvt(e){

	$(this).parent().children().not(this).removeClass('btn-primary').addClass('btn-default');

	if(!$(this).hasClass('btn-primary')){
		$(this).removeClass('btn-default').addClass('btn-primary');
	}else{
		$(this).addClass('btn-default').removeClass('btn-primary');
	}

	saveInSS();
}

function nextBtnEvt(e){

	navPreguntas(1);
}

function prevBtnEvt(e){

	navPreguntas(-1);
}
// FIN EVENTS

// SETTERS GETTERS

function findRespuestaFromArrayIndex(index){

	return datosRespuestas.respuestas[index];
}

function setCurrentIndex(newIndex){

	return sessionStorage.CI = newIndex;
}

function getCurrentIndex(){

	var currentIndex = 0;

	switch(typeof sessionStorage.CI){

		case 'number':

			currentIndex = sessionStorage.CI;
		break;

		case 'string':

			currentIndex = parseInt(sessionStorage.CI);
		break;

		case 'undefined':

			currentIndex = 0;
			setCurrentIndex(currentIndex);
		break;
	}

	return currentIndex;
}

function getArrayRespuestas(){

	return datosRespuestas.respuestas;
}

function getRespuestasAsignadas(){

	var out = {};

	if(typeof sessionStorage.RA == 'string')	out	= JSON.parse(sessionStorage.RA);
	else out = {};

	return listaNoContestados;
}

function getBtnRespuestaActivo(){

	return $('#noContestados > .panel-body, #contestadas > .panel-body, #preguntasDudas > .panel-body').find('.btn-primary');
}

function getArrayBtnRespuesta(){

	return $('#noContestados > .panel-body, #contestadas > .panel-body, #preguntasDudas > .panel-body').find('button');
}

function setListaNoContestadas(newLista){

	listaNoContestados = newLista;
}

function setListaContestadas(newLista){

	listaContestados = newLista;
}

function setListaDudas(newLista){

	listaDudas = newLista;
}

function getListaNoContestadas(){

	return listaNoContestados;
}

function getListaContestadas(){

	return listaContestados;
}

function getListaDudas(){

	return listaDudas;
}
// FIN SETTERS GETTERS

function clearContent(){

	$('#familiaRespuestas').empty();
	$('#noContestados > .panel-body').empty();
	$('#contestadas > .panel-body').empty();
	$('#preguntasDudas > .panel-body').empty();
}

function getRespuestaFromBtnActivo(){

	return getBtnRespuestaActivo()[0].arrayIndex;
}

function asignarCodigoRespuesta(idRespuesta){

	var indexRespuesta = 0;

	for(var i=0; i<datosRespuestas.respuestas.length; i++){

		if(datosRespuestas.respuestas[i].id_respuesta == idRespuesta){
		
			indexRespuesta = i;
			i = datosRespuestas.respuestas.length;
		}
	}

	switch(datosRespuestas.respuestas[indexRespuesta].id_estado){

		case 1:

			var ci = getCurrentIndex();
			var ra = getRespuestasAsignadas();
				ra[ci].id_estado = 2;

			datosRespuestas.respuestas[indexRespuesta] = ra[ci];

			subirDatosRespuesta(ra[ci]);

			ra.splice(ci, 1);

			setRespuestasNoAsignadas(ra);
		break;
	}
}

function comprobarRespuesta(respuesta){

	return true;
}

//Eventos socket

//eventos lanzados por el cliente
function guardarCorreccion(idres, idcod){
	
	io.emit('Guardar Correccion',{ id_respuesta:idres, id_codigo:idcod, id_usuario: sessionStorage.idUsuario })

}

function registrarDuda(idres, mensajeDuda){
	//los datos del usuario son guardados desde el login
	io.emit('Registrar Duda',{ id_respuesta:idres, duda: mensajeDuda, id_usuario:sessionStorage.idUsuario })
	
}

//eventos que son lanzados por el servidor
io.on('Resultado Correccion', function(data){
	
	//"data.mensaje" devuelve el resultado del intento de guardado: ok, si todo sale bien, error si falla
})

io.on('Estado Duda', function(data){
	
	//"data.mensaje" devuelve el resultado al intentar registrar la duda: ok, si todo sale bien, error si falla
})