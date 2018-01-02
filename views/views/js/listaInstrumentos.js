var instrumentos = {};
var nonSelectedText = 'Listar todos los Elementos';

$(document).ready(function(){

	getData(createInstrumentos);
});

function initList(){

	$('.select-filter-instrumento').selectpicker({
		style: 'btn-default',
		size: 4,
		noneSelectedText: nonSelectedText,
		header: 'Filtrar por instrumentos',
	});

	$('.pregunta-filter').selectpicker({
		style: '',
		size: 3,
		noneSelectedText: nonSelectedText,
		header: 'Filtrar por Pregunta',
	});

	setEvents();
}

function setEvents(){

	$('.select-filter-instrumento').on('changed.bs.select', filtrarPorInstrumento);
	$('.pregunta-filter').on('changed.bs.select', filtrarPorPregunta);
}

function filtrarPorInstrumento(e){

	if($(this).selectpicker('val') != null || $(this).selectpicker('val') != undefined){
		
		if(typeof $(this).selectpicker('val')[0] == 'string'){

			var selected = $(this).selectpicker('val');
			var query = '';

			if(selected.length > 0){

				for(var index=0; index < selected.length; index++){

					query += '#' + selected[index].replace(' ', '_')  + '-container';
					if(index+1 < selected.length)	query += ', ';
				
				}

				$('#instrumentosContainer').children().not(query).slideUp();
				$(query).slideDown();
			}else{

				$('#instrumentosContainer').children().slideDown();
			}
		}
	}else{

		$('#instrumentosContainer').children().slideDown();
	}
}

function filtrarPorPregunta(e){

	if($(this).selectpicker('val') != null || $(this).selectpicker('val') != undefined){
		
		if(typeof $(this).selectpicker('val')[0] == 'string'){

			var selected = $(this).selectpicker('val');
			var query = '';

			if(selected.length > 0){

				for(var index=0; index < selected.length; index++){

					query += '.' + selected[index].replace(' ', '_');
					if(index+1 < selected.length)	query += ', ';
				
				}

				console.log(query, $(this).closest('.card').find('.card-instrumento').not(query));

				$(this).closest('.card').find('.card-instrumento').parent().not(query).slideUp();
				$(query).slideDown();
			}else{

				$(this).closest('.card').find('.card-instrumento').parent().slideDown();
			}
		}
	}else{

		$(this).closest('.card').find('.card-instrumento').parent().slideDown();
	}
}

function createInstrumentos(inst){

	// for (var i = 0; i < inst.length; i++) {

		$('.select-filter-instrumento').append('<option>' + inst.title + '</option>');
		// $('.select-filter-instrumento').selectpicker('render');
		
		// $('.select-filter-instrumento').selectpicker('val', inst[i].title);

		var container = document.createElement('div');
			container.id = (inst.title.replace(' ', '_') ) + '-container';
			container.className = 'card bg-gray';

		var containerHeader = document.createElement('div');
			containerHeader.className = 'header';
			containerHeader.innerHTML = inst.title;

		var containerBody = document.createElement('div');
			containerBody.className = 'body';

		var rowContainer = document.createElement('div');
			rowContainer.className = 'row';

		var dropbox = document.createElement('select');
			dropbox.className = 'pregunta-filter';
			$(dropbox).data('live-search', 'true');
			$(dropbox).attr('multiple', 'true');

		containerHeader.appendChild(dropbox);

		var pregs = inst.preguntas;

		for(var cont = 0; cont < pregs.length; cont++){

			var opDD = document.createElement('option');
				opDD.innerHTML = pregs[cont].preguntaTitle.substring(0, 15);
				opDD.value = pregs[cont].preguntaTitle;

			dropbox.appendChild(opDD);

			var resp = pregs[cont].respuestas;

			for (var index = 0; index < resp.length; index++) {
			
				var colCard = document.createElement('div');
					colCard.className = 'col-md-4 preg-' + (index+1);
					colCard.id = 'preg_' + (index+1);
					
				var cardInstrumento = document.createElement('div');
					cardInstrumento.className = 'card card-instrumento';
					cardInstrumento.id_pregunta = pregs[cont].idPregunta;
					cardInstrumento.parte = resp[index].parte;
					cardInstrumento.addEventListener('click', cardEvent, false);

				var cardHeader = document.createElement('div');
					cardHeader.className = 'header';
					cardHeader.innerHTML = pregs[cont].preguntaTitle.substring(0, 125);

				var cardBody = document.createElement('div');
					cardBody.className = 'body';
					cardBody.innerHTML = '<div class="row"><div class="col-md-6">Parte: ' + pregs[cont].respuestas[index].parte + '</div><div class="col-md-6">Cantidad: ' + (pregs[cont].respuestas[index].contestadas + pregs[cont].respuestas[0].duda + pregs[cont].respuestas[0].noContestadas )  + '</div></div>';

				var iconAsignadas = document.createElement('div');
					iconAsignadas.className = 'col-xs-4';
					iconAsignadas.innerHTML = '<i class="material-icons contestadas">check_box</i><span class="icon-cont">: '+resp[index].contestadas + '</span>';

				var iconDudas = document.createElement('div');
					iconDudas.className = 'col-xs-4';
					iconDudas.innerHTML = '<i class="material-icons duda">announcement</i><span class="icon-cont">: '+resp[index].duda + '</span>';

				var iconNoAsignadas = document.createElement('div');
					iconNoAsignadas.className = 'col-xs-4';
					iconNoAsignadas.innerHTML = '<i class="material-icons no-contestadas">check_box_outline_blank</i><span class="icon-cont">: '+resp[index].noContestadas + '</span>';

				var iconCont = document.createElement('div');
					iconCont.className = 'icons-instrumento row';

				iconCont.appendChild(iconAsignadas);
				iconCont.appendChild(iconDudas);
				iconCont.appendChild(iconNoAsignadas);
				cardBody.appendChild(iconCont);
				cardInstrumento.appendChild(cardHeader);
				cardInstrumento.appendChild(cardBody);
				colCard.appendChild(cardInstrumento);
				rowContainer.appendChild(colCard);
			}
		}

		containerBody.appendChild(rowContainer);

		container.appendChild(containerHeader);
		container.appendChild(containerBody);

		$('#instrumentosContainer').append(container);
	// };

	initList();
}

function cardEvent(e){

	sessionStorage.idPregunta = this.id_pregunta;
	sessionStorage.parte = this.parte;

	console.log('click!!');
	window.location = 'http://qualans.com/vistaCorrector.html';
}

function getData(callback){

	// instrumentos = tempIns;

	// var strData;

	$.getJSON( "./persistence/" + sessionStorage.nombre + "-" + sessionStorage.apellidoP + "-" + sessionStorage.apellidoM + "-paquetes.json", function( data ) {

		instrumentos = data;

		console.log(data);

		if(callback != undefined)	callback(instrumentos);
	});

	// callback(instrumentos);
}

var tempIns = [
	{
		id: 0,
		title: 'Intrumento 1',
		preguntas: [
			{
				idPregunta: 1,
				preguntaTitle: 'pregunta 1',
				respuestas: [
					{pregInicio: 1, pregFin: 10, contestadas: 10, duda: 0, noContestadas: 0},
					{pregInicio: 11, pregFin: 20, contestadas: 6, duda: 1, noContestadas: 3},
				]
			},
			{
				idPregunta: 2,
				preguntaTitle: 'pregunta 2',
				respuestas: [
					{pregInicio: 1, pregFin: 10, contestadas: 10, duda: 0, noContestadas: 0},
				]
			},
			{
				idPregunta: 3,
				preguntaTitle: 'pregunta 3',
				respuestas: [
					{pregInicio: 1, pregFin: 7, contestadas: 6, duda: 1, noContestadas: 0},
				]
			},
		]
	},
	{
		id: 1,
		title: 'Intrumento 2',
		preguntas: [
			{
				idPregunta: 10,
				preguntaTitle: 'pregunta 1',
				respuestas: [
					{pregInicio: 1, pregFin: 10, contestadas: 3, duda: 3, noContestadas: 4},
					{pregInicio: 11, pregFin: 20, contestadas: 6, duda: 1, noContestadas: 3},
				]
			},
		],
	},
	{
		id: 2,
		title: 'Intrumento 3',
		preguntas: [
			{
				idPregunta: 7,
				preguntaTitle: 'pregunta 1',
				respuestas: [
					{pregInicio: 1, pregFin: 10, contestadas: 3, duda: 3, noContestadas: 4},
					{pregInicio: 11, pregFin: 20, contestadas: 6, duda: 1, noContestadas: 3},
				]
			},
			{
			idPregunta: 4,
				preguntaTitle: 'pregunta 1',
				respuestas: [
					{pregInicio: 1, pregFin: 10, contestadas: 3, duda: 3, noContestadas: 4},
					{pregInicio: 11, pregFin: 20, contestadas: 6, duda: 1, noContestadas: 3},
				]
			},
			{
			idPregunta: 24,
				preguntaTitle: 'pregunta 1',
				respuestas: [
					{pregInicio: 1, pregFin: 10, contestadas: 3, duda: 3, noContestadas: 4},
					{pregInicio: 11, pregFin: 20, contestadas: 6, duda: 1, noContestadas: 3},
				]
			},
		],
	},
];

// var testCarga ={
//    "carga":[
//       {
//          "id_instrumento":1,
//          "instrumento":"instrumento 1",
//          "id_pregunta":1,
//          "parte":1,
//          "enunciado":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sem quam, pretium eu nunc et, tempor dapibus erat.",
//          "asignaciones":[
//             {
//                "contestadas":0,
//                "duda":3,
//                "noContestadas":7
//             }
//          ]
//       },
//       {
//          "id_instrumento":1,
//          "instrumento":"instrumento 1",
//          "id_pregunta":1,
//          "parte":2,
//          "enunciado":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sem quam, pretium eu nunc et, tempor dapibus erat.",
//          "asignaciones":[
//             {
//                "contestadas":4,
//                "duda":3,
//                "noContestadas":3
//             }
//          ]
//       },
//       {
//          "id_instrumento":1,
//          "instrumento":"instrumento 1",
//          "id_pregunta":1,
//          "parte":3,
//          "enunciado":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sem quam, pretium eu nunc et, tempor dapibus erat.",
//          "asignaciones":[
//             {
//                "contestadas":8,
//                "duda":2,
//                "noContestadas":0
//             }
//          ]
//       },
//       {
//          "id_instrumento":1,
//          "instrumento":"instrumento 1",
//          "id_pregunta":2,
//          "parte":1,
//          "enunciado":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed turpis in felis vulputate gravida.",
//          "asignaciones":[
//             {
//                "contestadas":5,
//                "duda":0,
//                "noContestadas":5
//             }
//          ]
//       }
//    ]
// }