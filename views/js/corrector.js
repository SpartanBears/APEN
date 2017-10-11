var datosRespuestas;

$( document ).ready( function(){

	
	getData(initCorrectorView);
});

function initCorrectorView(){

	clearContent();
	generateFamilyCollapsable(datosRespuestas.familias);
	setPanelButtons(datosRespuestas.respuestas);
	setEvents();
}

function loadRespuesta(respuesta){

	$('#preguntaDisplay').empty().html(datosRespuestas.pregunta);
	$('#estimuloDisplay').empty().html(datosRespuestas.enunciado);
	$('#respuestaDisplay').empty().html(respuesta.descripcion);
}

function setEvents(){


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

			var btnCodigo = document.createElement('button');
				btnCodigo.type = 'button';
				btnCodigo.className ='btn btn-block btn-lg btn-default waves-effect';
				btnCodigo.innerHTML = subElements[index].valor;
				btnCodigo.titulo = subElements[index].titulo;
				btnCodigo.descripcion = subElements[index].descripcion;

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
			btnCodigo.innerHTML = 'Respuesta ' + subElements[index].id_respuesta;
			btnCodigo.titulo = subElements[index].titulo;
			btnCodigo.descripcion = subElements[index].descripcion;
			btnCodigo.arrayIndex = index;

			if(index != 0){

				btnCodigo.classList.add('btn-default');
			}else{
				loadRespuesta(subElements[index]);
				btnCodigo.classList.add('btn-primary');
			}

			btnCodigo.onclick = clickRespuestaEvt;

		switch(subElements[index].id_estado){

			// 1 es de una respuesta no corregida
			case 1:
				$('#noContestados > .panel-body').append(btnCodigo);
			break;

			// 2 corregida
			case 2:
				$('#contestadas > .panel-body').append(btnCodigo);
			break;

			// 3 duda
			case 3:
				$('#preguntasDudas > .panel-body').append(btnCodigo);
			break;
		}
	}
}

function getData(callback){

	var strData;

	$.getJSON( "./resources/correctorEjemplo.json", function( data ) {

		// console.log(data);

		datosRespuestas = data;

		if(callback != undefined)	callback();
	});
}

function clearContent(){

	$('#familiaRespuestas').empty();
	$('#noContestados > .panel-body').empty();
	$('#contestadas > .panel-body').empty();
	$('#preguntasDudas > .panel-body').empty();
}

function clickCodigoEvt(e){

	$(this).parent().children().not(this).removeClass('btn-primary').addClass('btn-default');

	if(!$(this).hasClass('btn-primary')){
		$(this).removeClass('btn-default').addClass('btn-primary');
	}else{
		$(this).addClass('btn-default').removeClass('btn-primary');
	}
}

function clickRespuestaEvt(e){

	var contPreguntas = '#noContestados > .panel-body, #contestadas > .panel-body, #preguntasDudas > .panel-body';

	$(contPreguntas).children().not(this).removeClass('btn-primary').addClass('btn-default');
	$(this).removeClass('btn-default').addClass('btn-primary');

	var arrayRespuesta = getArrayRespuestas();

	loadRespuesta(arrayRespuesta[this.arrayIndex]);
}

function getArrayRespuestas(){

	return datosRespuestas.respuestas;
}

function nextBtnEvt(e){

	navPreguntas(1);
}

function prevBtnEvt(e){

	navPreguntas(-1);
}

function navPreguntas(direction){

	var currentIndex;

	switch(typeof getCurrentIndex()){

		case 'number':

			currentIndex = getCurrentIndex();
		break;

		case 'string':

			currentIndex = parseInt(getCurrentIndex());
		break;

		case 'undefined':

			currentIndex = 0;
			setCurrentIndex(currentIndex);
		break;
	}

	asignarCodigoRespuesta(currentIndex);

	currentIndex = (currentIndex+direction)>=0 ? (currentIndex+direction) %getArrayRespuestas().length : getArrayRespuestas().length-1;

	loadRespuesta(getArrayRespuestas()[currentIndex]);
}

function setCurrentIndex(newIndex){

	return sessionStorage.CI = newIndex;
}

function getCurrentIndex(){

	return sessionStorage.CI;
}

function asignarCodigoRespuesta(currentIndex){

	if(comprobarRespuesta(getArrayRespuestas()[currentIndex])){

		
	}
}

function comprobarRespuesta(respuesta){


}