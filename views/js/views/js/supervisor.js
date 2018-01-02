var datos = {};
var io = io.connect('http://qualans.com', {port: 51440});

$(document).ready(function(){

	getData(generateShowData);

	// createDonut('donut1', donutVal);
	// createBarsGraph('grafAvancePrueba', null);
	createUITableTabs(instrumentos);
	// setEvents();
	// $('.count-to').countTo();
});

function getData(callback){

	// io.on("archivos listos", function(){

		$.getJSON( "./persistence/preguntastabla(1).json", function( data ) {

			datosRespuestas = data;

			datos = data;

			if(callback != undefined)	callback();
		});
	// });
}

function generateShowData(){

	generateTabsAndContent();
}

function generateTabsAndContent(){

	var tabs;
	var containers;

	var totalRespuestas = 0;
	var totalCorrectores = 0;
	var totalCorregidas = 0;
	var totalNoCorregidas = 0;

	var barGraphData = [];

	for (var i = 0; i < datos.length; i++) {

		var li = document.createElement('li');
			// li.className = 'active';
			$(li).attr('role', 'presentation');
		var anchor = document.createElement('a');
			anchor.href = '#insCont_' + i;
			$(anchor).attr('aria-expanded', 'true');
			anchor.dataset.toggle = 'tab';
			anchor.innerHTML = 'Instrumento "' + datos[i].id_instrumento +'"';
			// $(anchor).click(drawDonut);

		li.appendChild(anchor);

		$('#instrumentosUL').append(li);

		var divCont = document.createElement('div');
			$(divCont).attr('role', 'tabpanel');
			divCont.className = 'tab-pane fade in visible';
			divCont.id = 'insCont_' + i;

		$('#tabContent').append(divCont);

		var totalAsignadas = 0;
		var totalCorregidas = 0;
		var totalRespuestas = 0;

		var pregs = datos[i].preguntas;

		for (var iPregs = 0; iPregs < pregs.length; iPregs++) {

			totalAsignadas += pregs[iPregs].total_asignadas;
			totalCorregidas += pregs[iPregs].total_corregidas;
			totalRespuestas += pregs[iPregs].total_respuestas;
		};

		var dataAcumulada = {
			total_respuestas: totalAsignadas,
			total_corregidas: totalCorregidas,
			total_respuestas: totalRespuestas,
			total_no_corregidas: totalAsignadas - totalCorregidas,
			total_correctores: 0
		};

		createInstrumentoDataContainer(datos[i], i, dataAcumulada);
			
		barGraphData.push(
			{
				y: 'Instrumento '+datos[i].ID,
				a: totalCorregidas,
				b: totalAsignadas
			}
		);

		// #insCont_0 #table_corrector

		createInstrumentoTables();
	};

	$('#numberRespuestaGeneral').html(totalRespuestas);
	$('#numberRespuestaGeneral').data('to', totalRespuestas);

	$('#numberCorrectoresGeneral').html(totalCorrectores);
	$('#numberCorrectoresGeneral').data('to', totalCorrectores);

	createDonut('donutGeneral', [ {label: 'Corregidos', value: totalCorregidas}, {label: 'No Corregidos', value: totalNoCorregidas} ] );

	// createBarsGraph('grafAvancePruebaGeneral', barGraphData);
	createBarsGraphWithKeys( document.getElementById('grafAvancePruebaGeneral'), barGraphData, ['No Corregidas', 'Corregidas']);

	// console.log('otro: ', barGraphData);
	
	$('.visible').removeClass('visible');
}

function createInstrumentoDataContainer(instrumento, index, datosAcumulados){

	var rowSup = document.createElement('div');
		rowSup.className = 'row';

	var colSupCont = document.createElement('div');
		colSupCont.className = 'col-xs-12';

	var cardSup = document.createElement('div');
		cardSup.className = 'card';

	var headerSup = document.createElement('div');
		headerSup.className = 'header';
		headerSup.innerHTML = '<h2>Monitoreo Instrumento ' + instrumento.id_instrumento + '</h2>';

	var divBody = document.createElement('div');
		divBody.className = 'body';

	var rowBody = document.createElement('div');
		rowBody.className = 'row row-body';

	var colBody = document.createElement('div');
		colBody.className = 'col-lg-3 col-md-3 col-sm-6 col-xs-6 body-col';

	var infoBox = document.createElement('div');
		infoBox.className = 'info-box';

	var divBookmark = document.createElement('div');
		divBookmark.className = 'icon bg-blue';

	var bookIcon = document.createElement('i');
		bookIcon.className = 'material-icons';
		bookIcon.innerHTML = 'bookmark';

	var infoBoxContent = document.createElement('div');
		infoBoxContent.className = 'content infobox-content';

	var bookText = document.createElement('div');
		bookText.className = 'text infobox-text';
		bookText.innerHTML = 'Total Respuestas a corregir';

	var bookNumber = document.createElement('div');
		bookNumber.className = 'number count-to';
		bookNumber.dataset.from = '0';
		bookNumber.dataset.to = datosAcumulados.total_respuestas;
		bookNumber.dataset.speed = '10';
		bookNumber.dataset.freshInterval = '5';
		bookNumber.innerHTML = datosAcumulados.total_respuestas;

	var infoCorrectores = document.createElement('div');
		infoCorrectores.className = 'info-box';

	var iconCorrectores = document.createElement('div');
		iconCorrectores.className = 'icon bg-blue';

	var iconCorrector = document.createElement('i');
		iconCorrector.className = 'material-icons';
		iconCorrector.innerHTML = 'person';

	var corrContent = document.createElement('div');
		corrContent.className = 'content infobox-content';

	var corrText = document.createElement('div');
		corrText.className = 'text infobox-text';
		corrText.innerHTML = 'Total Correctores asignados';

	var corrNumber = document.createElement('div');
		corrNumber.className = 'number count-to';
		corrNumber.dataset.from = '0';
		corrNumber.dataset.to = datosAcumulados.total_correctores;
		corrNumber.dataset.speed = '10';
		corrNumber.dataset.freshInterval = '5';
		corrNumber.innerHTML = datosAcumulados.total_correctores;

	corrContent.appendChild(corrText);
	corrContent.appendChild(corrNumber);
	iconCorrectores.appendChild(iconCorrector);
	infoCorrectores.appendChild(iconCorrectores);
	infoCorrectores.appendChild(corrContent);

	infoBoxContent.appendChild(bookText);
	infoBoxContent.appendChild(bookNumber);
	divBookmark.appendChild(bookIcon);
	infoBox.appendChild(divBookmark);
	infoBox.appendChild(infoBoxContent);

	colBody.appendChild(infoBox);
	colBody.appendChild(infoCorrectores);

	rowBody.appendChild(colBody);

	divBody.appendChild(rowBody);

	cardSup.appendChild(headerSup);
	cardSup.appendChild(divBody);
	colSupCont.appendChild(cardSup);
	rowSup.appendChild(colSupCont);


	var divColDonut = document.createElement('div');
		divColDonut.className = 'col-lg-3 col-md-3 col-sm-6 col-xs-6';

	var divDonut = document.createElement('div');
		divDonut.id = 'donut_' + index;
		divDonut.className = 'graph';

	var divColGraph = document.createElement('div');
		divColGraph.className = 'col-lg-6 col-md-6 col-sm-12 col-xs-12';

	var divGraph = document.createElement('div');
		divGraph.id = 'graph_' + index;
		divGraph.className = 'graph';

	divColDonut.appendChild(divDonut);
	divColGraph.appendChild(divGraph);

	rowBody.appendChild(divColDonut);
	rowBody.appendChild(divColGraph);

	$('#tabContent > #insCont_'+index).append(rowSup);

	$('#tabContent > #insCont_'+index).data('corregidos', datosAcumulados.total_corregidas);
	$('#tabContent > #insCont_'+index).data('no-corregidos', datosAcumulados.total_no_corregidas);

	// console.log($('#tabContent > #insCont_'+instrumento.ID).data('corregidos'));
	var donutValues = [
		{
			label: 'Corregidos',
			value: datosAcumulados.total_corregidas
		},
		{
			label: 'No Corregidos',
			value: datosAcumulados.total_no_corregidas
		}
	];

	createDonut(divDonut.id, donutValues);

	var barData = [];

	for (var i = 0; i < instrumento.preguntas.length; i++) {
		// instrumento.preguntas[i]
		barData.push( 
			{ 
				y: 'Pregunta '+instrumento.preguntas[i].id_pregunta,
				a: datosAcumulados.total_corregidas,
				b: datosAcumulados.total_no_corregidas
			} 
		);
	}

	// console.log(barData);

	createBarsGraphWithKeys(divGraph, barData, ['No Corregidas', 'Corregidas']);

	var divRowInf = document.createElement('div');
		divRowInf.id = 'divRowInf';
		divRowInf.className = 'row';

	var colInf = document.createElement('div');
	colInf.id = 'colInf';
		colInf.className = 'col-xs-12';

	var	cardInf = document.createElement('div');
	cardInf.id = 'cardInf';
		cardInf.className = 'card';

	var	cardBodyInf = document.createElement('div');
	cardBodyInf.id = 'cardBodyInf';
	cardBodyInf.className = 'body';

	cardInf.appendChild(cardBodyInf);
	colInf.appendChild(cardInf);
	divRowInf.appendChild(colInf);

	cardBodyInf.appendChild(createTableContainer(index));

	$('#tabContent > #insCont_'+index).append(divRowInf);
}

function drawDonut(e){

	var ide = '#tabContent > #insCont_' + e.target.href.split('_')[1];

	var donutValues = [
		{
			label: 'Corregidos',
			value: parseInt( $( ide ).data('corregidos') )
		},
		{
			label: 'No Corregidos',
			value: parseInt( $( ide ).data('no-corregidos') )
		}
	];

	createDonut('donut_' + e.target.href.split('_')[1] , donutValues);
}

function createBarsGraph(id, values){

	Morris.Bar({
		element: id,
		data: values,
		xkey: 'y',
		ykeys: ['a'],
		labels: ['Respuestas corregidas'],
		barColors: ['rgb(233, 30, 99)', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', 'rgb(0, 150, 136)'],
		//stacked: true
		orientation: 'horizontal'
	});
}

function createBarsGraphWithKeys(id, values, keys){

	Morris.Bar({
		element: id.id,
		data: values,
		xkey: 'y',
		ykeys: ['b','a'],
		labels: keys,
		stacked: true,
		orientation: 'horizontal',
		barColors: ['rgb(233, 30, 99)', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', 'rgb(0, 150, 136)'],
		// behaveLikeLine: false
	});
}

function createInstrumentoTables(target, index){

	var elements = ['table_corrector','table_pregunta'];

	for(var index = 0; index < elements.length; index++){

		var table = document.createElement('table');
			table.id = 'tabla_'+elements[index].replace(' ', '_') + '_' + index;
			table.className = 'table-bordered table-striped table-hover dataTable js-exportable';
			table.style.width = '100%';

		$(target).append(table);
	}
}

function createUITableTabs(elements){

	elements = ['table_corrector','table_pregunta'];

	var divContainer = document.getElementById('tableContainer');

	var ulTabs = document.createElement('ul');
		ulTabs.className = 'nav nav-tabs tab-nav-right';
		ulTabs.role = 'tablist';

	var panesContainer = document.createElement('div');
		panesContainer.className = 'tab-content';

	for(var index = 0; index < elements.length; index++){

		var li = document.createElement('li');
			li.role = 'presentation';
			if(index == 0) li.className = 'active';

		var anchor = document.createElement('a');
			anchor.href = '#'+elements[index].replace(' ', '_') + '_'+index;
			anchor.dataset.toggle = 'tab';
			anchor.innerHTML = elements[index];

		li.appendChild(anchor);
		ulTabs.appendChild(li);

		// TABLE

		var tabPanes = document.createElement('div');
			tabPanes.role = 'tabpanel';
			tabPanes.className = 'tab-pane fade in';
			if(index == 0) tabPanes.className += ' active';
			tabPanes.id = elements[index].replace(' ', '_');

		var table = document.createElement('table');
			table.id = 'tabla_'+elements[index].replace(' ', '_');
			table.className = 'table-bordered table-striped table-hover dataTable js-exportable';
			table.style.width = '100%';

		$('#'+elements[index]).append(table);
		// $(panesContainer).append(tabPanes);
	}

	// $(divContainer).append(ulTabs);
	// $(divContainer).append(panesContainer);

	$(divContainer).append(panesContainer);


	getCorrectorTableData('tabla_'+elements[0]);
	getPreguntaTableData('tabla_'+elements[1] );
	// createTable('tabla_'+elements[1].replace(' ', '_'), arrayTabas[1]);

	// for(var index = 0; index < elements.length; index++){
		
	// 	createTable('tabla'+elements[index].replace(' ', '_'), arrayTabas[index]);
	// };
}

function getCorrectorTableData(id){

	// io.on("archivos listos", function(){

		$.getJSON( "./persistence/correctorTabla(1).json", function( data ) {

			var dataset = [];
			var dataGroup = [];
			var evtData = [];

			for (var i = 0; i < data.length; i++) {

				var aux = data[i].Asignadas == 0 ? 0: (( data[i].Corregidas / (data[i].Corregidas + data[i].Asignadas)) * 100 );

				dataset.push(data[i].ID);
				dataset.push(data[i].Asignadas);
				dataset.push(data[i].Corregidas);
				dataset.push(aux.toFixed(2) + '%');
				dataset.push(data[i].consistencia);
				dataset.push(data[i].carga);

				dataGroup.push(dataset);

				evtData.push(data[i].preguntas);

				// insCont_0
				// console.log({ columns: tablaPorCorrector.columns, dataset: dataset});
				// createTable('tabla_cor_'+i, { columns: tablaPorCorrector.columns, dataset: dataset});

				dataset = [];
			};
			
			tablaPorCorrector.dataSet = dataGroup;
			createTable(id, tablaPorCorrector, evtData);
		});
	// });
}

function getPreguntaTableData(id){

	// io.on("archivos listos", function(){

		$.getJSON( "./persistence/preguntastabla(1).json", function( data ) {

			console.log(id);

			var dataset = [];
			var dataGroup = [];
			var evtData = [];

			for (var i = 0; i < data.length; i++) {

				var pregs = data[i].preguntas;

				for (var indexPregunta = 0; indexPregunta < pregs.length; indexPregunta++) {
					// pregs[indexPregunta]

					var instData = [];

					var aux = pregs[indexPregunta].total_respuestas == 0 ? 0: (( pregs[indexPregunta].total_corregidas / (pregs[indexPregunta].total_corregidas + pregs[indexPregunta].total_respuestas)) * 100 );

					dataset.push(data[i].id_instrumento);
					dataset.push(pregs[indexPregunta].id_pregunta);
					dataset.push(pregs[indexPregunta].total_respuestas);
					dataset.push(pregs[indexPregunta].total_corregidas);
					dataset.push(pregs[indexPregunta].total_doble_corregidas);
					dataset.push(aux.toFixed(2) + '%');
					dataset.push(pregs[indexPregunta].media_consistencia);

					dataGroup.push(dataset);

					// instData

					console.log({ columns: tablaPorPregunta.columns, dataset: dataset});

					var aux = JSON.parse(JSON.stringify( tablaPorPregunta ));
					aux.columns.splice(1, 1);
					aux.dataSet = dataset;
					aux.dataSet.splice(1, 1);

					console.log(aux);

					// createTable('tabla_preg_'+i, aux );

					dataset = [];
				};

				console.log(data, data[i].preguntas);

				evtData.push( pregs );
			};

			// console.log(dataGroup);
			
			tablaPorPregunta.dataSet = dataGroup;
			createTable(id, tablaPorPregunta, evtData);
		});
	// });
}

function createDonut(id, values){

	var donutContainer = document.getElementById(id);

	Morris.Donut({
		element: donutContainer,
		data: values,
		colors: ['rgb(0, 188, 212)', 'rgb(233, 30, 99)',  'rgb(255, 152, 0)', 'rgb(0, 150, 136)'],
		resize: true,
		formatter: function (y) {
			return y
		},
	}).select(0);
}

function createDonutSnd(id, value){

	var donutContainer = document.getElementById(id);

	$('#'+id).val(value);
	$('#'+id).knob({
		width: '100%',
		'readOnly': true,
		draw: function () {
			// "tron" case
			if (this.$.data('skin') == 'tron') {

				var a = this.angle(this.cv)  // Angle
					, sa = this.startAngle          // Previous start angle
					, sat = this.startAngle         // Start angle
					, ea                            // Previous end angle
					, eat = sat + a                 // End angle
					, r = true;

				this.g.lineWidth = this.lineWidth;

				this.o.cursor
					&& (sat = eat - 0.3)
					&& (eat = eat + 0.3);

				if (this.o.displayPrevious) {
					ea = this.startAngle + this.angle(this.value);
					this.o.cursor
						&& (sa = ea - 0.3)
						&& (ea = ea + 0.3);
					this.g.beginPath();
					this.g.strokeStyle = this.previousColor;
					this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
					this.g.stroke();
				}

				this.g.beginPath();
				this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
				this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
				this.g.stroke();

				this.g.lineWidth = 2;
				this.g.beginPath();
				this.g.strokeStyle = this.o.fgColor;
				this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
				this.g.stroke();

				return false;
			}
		},
		format: function (y) {
			return y + '%'
		},
	});
}

function createTable(id, data, arrayEvtData){

	// console.log(data);

	var headers = data.columns,
		rows = data.dataSet,
		indexBtn = -1,
		type = '';

	for (var i = 0; i < headers.length; i++) {
		
		if(headers[i].btn == true){

			indexBtn = i;
		}
	}

	var table = $('#'+id).DataTable( {
		data: rows,
		columns: headers,
		width: '100%',
		paging: false,
		dom: 'Brtip',
		buttons: [
					'excel',
					'pdf',
					'csv',
				],
		"createdRow": function ( row, data, index ) {

			if(data[indexBtn] < 0.8 && indexBtn >=0 ){
				var btnDetalle = document.createElement('button');
					btnDetalle.type = 'button';
					btnDetalle.className = 'btn btn-default waves-effect m-r-20';
					btnDetalle.dataset.toggle = "modal";
					btnDetalle.dataset.target = "#detailModal";
					btnDetalle.innerHTML = data[indexBtn];

				var btnClone = $(btnDetalle).clone();
					btnClone.click(openModalDetail);

				if(typeof arrayEvtData != 'undefined'){

					if (arrayEvtData.length > 0) {

						btnClone[0].evtDta = arrayEvtData[index];
					}
				}

				$('td', row).eq(indexBtn).addClass('modal-trigger').empty().append(btnClone);
			}
		
        },
	});

	if(data.columns[1].detail != undefined)	setTooltipsToModalTable(data.columns);
}

function setTooltipsToModalTable(columns){

	for(var index = 1; index < columns.length; index++){

		$($("#modalTable").find("th")[index]).attr('title', columns[index].detail);

		$($("#modalTable").find("th")[index]).tooltip({
			container: 'body'
		});
	}
}

function openModalDetail(e){

	console.log(this.evtDta, this);

	clearModal();

	var datosTabla = {};

	switch($('ul#ulTableType > li.active > a').html()){

		case 'Corrector':
			datosTabla = generateDataInconcistenciaCorrector(this.evtDta);
		break;

		case 'Por Pregunta':
			datosTabla = generateDataInconcistenciaPregunta(this.evtDta);
		break;
	}

	var table = document.createElement('table');
		table.id = 'modalTable';
		table.className = 'table-bordered table-striped table-hover dataTable js-exportable';
		table.style.width = '100%';

	console.log($('#ulTableType .active a').html() == 'Por Pregunta');

	switch( $('#ulTableType .active a').html() ){

		case 'Por Pregunta':

			$('#largeModalLabel').html('Detalle Pregunta');
		break;

		case 'Corrector':

			$('#largeModalLabel').html('Detalle Corrector');
		break;
	}

	$('#detailModal').find('.modal-body').append(table);
	createTable('modalTable', datosTabla);
}

function generateDataInconcistenciaPregunta(arrayPreguntas){

	var data = [];
	var out = {
		columns:[
			{title:"ID Pregunta"},
			{title:"ID Respuesta"},
		],
	};
	var correcs = [];
	var auxArray = [];

	for (var indexPregunta = 0; indexPregunta < arrayPreguntas.length; indexPregunta++) {

		var respuestas = arrayPreguntas[indexPregunta].respuestas;

		for (var indexRespuestas = 0; indexRespuestas < respuestas.length; indexRespuestas++) {

			var correctores = respuestas[indexRespuestas].correctores;

			auxArray.push(arrayPreguntas[indexPregunta].id_pregunta);
			auxArray.push(respuestas[indexRespuestas].id_respuesta);
			
			for (var i = 0; i < correctores.length; i++) {

				// console.log(correctores[i].asignacion.id_codigo);

				auxArray.push( 'Código: '+ correctores[i].asignacion.id_codigo + ', Justificación: '+ correctores[i].asignacion.id_justificacion );

				if(correcs.length == 0){

					out.columns.push(
						{
							title: 'Asignación Corrector '+correctores[i].id_corrector,
							detail: 'C_'+correctores[i].id_corrector
						}
					);

					correcs.push(correctores[i].id_corrector);
				}else{

					var flag = true;

					for (var c = 0; c < correcs.length; c++) {

						// console.log(correcs[c], correctores[i].id_corrector, flag);

						if(correcs[c] == correctores[i].id_corrector && flag){

							flag = false;
						}
					}

					if(flag){

						correcs.push(correctores[i].id_corrector);
						out.columns.push(
							{
								title: 'Asignación Corrector '+correctores[i].id_corrector,
								detail: 'C_'+correctores[i].id_corrector
							}
						);
					}
				}
				
			}

			// console.log(auxArray);

			data.push(auxArray);

			auxArray = [];
		}
	}
	
	out.dataSet = data;

	return out;
}

function generateDataInconcistenciaCorrector(arrayPreguntas){

	var data = [];

	for (var indexPregunta = 0; indexPregunta < arrayPreguntas.length; indexPregunta++) {

		var respuestas = arrayPreguntas[indexPregunta].respuestas;

		for (var indexRespuestas = 0; indexRespuestas < respuestas.length; indexRespuestas++) {

			data.push(
				[
					arrayPreguntas[indexPregunta].id_pregunta,
					respuestas[indexRespuestas].id_respuesta,
					respuestas[indexRespuestas].asignacion.id_justificacion,
					respuestas[indexRespuestas].asignacion.id_codigo
				]
			);
		}
	}

	var out = {
		columns:[
			{title:"ID Pregunta", btn:true, type: 'link'},
			{title:"ID Respuesta", btn:true, type: 'link'},
			{title:"Justificación Asignada"},
			{title:"Código Asignado"},
		],
		dataSet:data,
	};

	return out;
}

function clearModal(){

	$('#detailModal').find('.modal-body').empty();
}

function setEvents(){

	$('#btnGrupo > a')[0].onclick = function(e){

		$('#btnGrupo > a').removeClass("btn-primary");
		$(this).addClass('btn-primary');

		$('.tab-content').children().removeClass('active');
		$('.tab-content').children()[0].classList.add('active');
	}

	$('#btnGrupo > a')[1].onclick = function(e){

		$('#btnGrupo > a').removeClass("btn-primary");
		$(this).addClass('btn-primary');

		$('.tab-content').children().removeClass('active');
		$('.tab-content').children()[1].classList.add('active');
	}
}

function createTableContainer(index){

	var tabContainer = document.createElement('div');
		tabContainer.className = 'row';

	var colTab =document.createElement('div');
		colTab.className = 'col-md-offset-1 col-md-3';

	var ulTab = document.createElement('ul');
		ulTab.className = 'nav nav-tabs tab-nav-right';
		ulTab.role = 'tablist';
		ulTab.id = 'tables-tabs';

	var liCorrector = document.createElement('li');
		liCorrector.role = 'presentation';
		liCorrector.className = 'active';

	var anchorCorrector = document.createElement('a');
		anchorCorrector.href = '#table_corrector_' + index;
		anchorCorrector.dataset.toggle = 'tab';
		anchorCorrector.ariaExpanded = true;
		anchorCorrector.innerHTML = 'Corrector';

	var liPregunta = document.createElement('li');
		liPregunta.role = 'presentation';

	var anchorPregunta = document.createElement('a');
		anchorPregunta.href = '#table_pregunta_' + index;
		anchorPregunta.dataset.toggle = 'tab';
		anchorPregunta.ariaExpanded = true;
		anchorPregunta.innerHTML = 'Por Pregunta';

	liPregunta.appendChild(anchorPregunta);
	liCorrector.appendChild(anchorCorrector);
	ulTab.appendChild(liCorrector);
	ulTab.appendChild(liPregunta);
	colTab.appendChild(ulTab);
	tabContainer.appendChild(colTab);

	var tableRowContainer = document.createElement('div');
		tableRowContainer.className = 'row';

	var cardTable = document.createElement('div');
		cardTable.className = 'card';

	var tableContainer = document.createElement('div');
		tableContainer.id = 'tableContainer';
		tableContainer.className = 'tab-content';

	var panelCorrector = document.createElement('div');
		panelCorrector.className = 'tab-pane fade active in';
		panelCorrector.role = 'tabpanel';
		panelCorrector.id = 'table_corrector_' + index;
		panelCorrector.innerHTML = '<table id="tabla_cor_'+ index +'"></table>';

	var panelPregunta = document.createElement('div');
		panelPregunta.className = 'tab-pane fade';
		panelPregunta.role = 'tabpanel';
		panelPregunta.id = 'table_pregunta_' + index;
		panelPregunta.innerHTML = '<table id="tabla_preg_'+ index +'"></table>';

	tableContainer.appendChild(panelCorrector);
	tableContainer.appendChild(panelPregunta);
	cardTable.appendChild(tableContainer);
	tableRowContainer.appendChild(cardTable);

	var div = document.createElement('div');
		div.appendChild(tabContainer);
		div.appendChild(tableRowContainer);

	return div;
}


// DATOS FALSOS

var tablaPorCorrector = {
	columns:[
		{title:"Cod. Corrector"},
		{title:"Respuestas Asignadas"},
		{title:"Respuestas Corregidas"},
		{title:"Índice de Avance"},
		{title:"Índice de Consistencia", btn: true},
		{title:"Carga de Trabajo (vs Media)"},
	],
	// dataSet:[
	// 	["C1", 20, 10, '50%', 0.9, '+100%'],
	// 	["C2", 10, 6, '60%', 0.4, '0%'],
	// 	["C3", 10, 10, '100%', 0.6, '0%'],
	// 	["C4", 10, 10, '100%', 0.3, '0%'],
	// 	["C5", 10, 5, '50%', 0.1, '0%'],
	// 	["C6", 10, 8, '80%', 0.0, '0%'],
	// 	["C7", 5, 1, '20%', 0.8, '-50%'],
	// 	["C8", 15, 0, '0%', 0.4, '+50%'],
	// 	["C9", 10, 7, '70%', 0.4, '0%'],
	// 	["C10", 0, 0, '-', '-','-100%'], 
	// ]
};

var tablaPorPregunta = {
	columns:[
		{title:"Cod. Instrumento"},
		{title:"Cod. Pregunta"},
		{title:"Cantidad total respuestas"},
		{title:"Corregidas"},
		{title:"Doble corregidas"},
		{title:"Índice de Avance"},
		{title:"Consistencia", btn:true},
	],
	// dataSet:[
	// 	['P1', 100, 50, '50%', 0.9, 0.8],
	// 	['P2', 100, 70, '70%', 0.5, 1],
	// 	['P3', 100, 0, '0%', 0.2, 0.9],
	// 	['P4', 100, 20, '20%', 0.9, 0.89],
	// 	['P5', 100, 15, '15%', 0.8, 0.78],
	// 	['P6', 100, 0, '0%', '-', 0.65],
	// 	['P7', 100, 45, '45%', 0.0, 0.1],
	// 	['P8', 100, 100, '100%', 0.9, 0.9],
	// 	['P9', 100, 90, '90%', 0.6, 0.98],
	// 	['P10', 100, 80, '80%', 0.4, 0.87]
	// ]
};

var tablaConsistecia3 = {
	columns:[
		{title:"Preguntas"},
		{title:"Total respuestas (n)"},
		{title:"Distribuidas/Asignadas (n)"},
		{title:"Corregidas (n)"},
		{title:"Consistencia (%)", btn:true},
	],
	dataSet:[
		['P1', 5025, 6049, 7, 0.8],
		['P2', 4888, 7297, 8, 0.5],
		['P3', 3525, 3189, 28, 0.3],
		['P4', 6901, 3527, 6, 0.9],
		['P5', 7057, 7028, 38, 0.8],
		['P6', 3419, 5314, 27, 0.5],
		['P7', 3907, 5338, 18, 0.2],
		['P8', 3887, 3352, 31, 0.8],
		['P9', 7093, 3181, 17, 0.2],
		['P10', 3741, 6238, 36, 0.4]
	]
};


var arrayTabas = [tablaPorCorrector, tablaPorPregunta, tablaConsistecia3];

var donutVal = [
	{
		label: 'Corregidos',
		value: 23
	},
	{
		label: 'No Corregidos',
		value: 77
	}
];

var donutVal2 = [
	{
		label: 'Corregidos',
		value: 8
	},
	{
		label: 'No Corregidos',
		value: 92
	}
];

var detalleCorrector = {
	columns:[
		{title:"ID Pregunta", btn:true, type: 'link'},
		{title:"ID Respuesta", btn:true, type: 'link'},
		{title:"Justificación Asignada"},
		{title:"Código Asignado"},
	],
	dataSet:[
		["P1","R1","A1", "IG"],
		["P1","R2","", ""],
		["P3","R5","B3", "IG"],
		["P3","R7","A2", "PS"],
		["P5","R1","C1", "IG"],
	]
};

var consistenciaDetalle = {
	columns:[
		{title:"ID Pregunta"},
		{title:"ID Respuesta"},
		{title:"C1", detail:"Jose Feliciano 1"},
		{title:"C2", detail:"Jose Feliciano 2"},
		{title:"C3", detail:"Jose Feliciano 3"},
	],
	dataSet:[
		["P1","R1","A", "B", ""],
		["P1","R2","", "B", "C"],
		["P1","R3","A", "", "C"],
		["P1","R4","A", "", "C"],
		["P1","R5","", "B", "C"],
	]
};

var instrumentos = [

	'Instrumento 1',
	'Instrumento 2',
	'Instrumento 3',
];