var instrumentos = {};

$(document).ready(function(){

	getData(createInstrumentos);
});

function createInstrumentos(inst){


	for (var i = 0; i < inst.length; i++) {

		var container = document.createElement('div');
			container.id = inst[i].title+'Container';
			container.className = 'card bg-gray';

		var containerHeader = document.createElement('div');
			containerHeader.className = 'header';
			containerHeader.innerHTML = inst[i].title;

		var containerBody = document.createElement('div');
			containerBody.className = 'body';

		var rowContainer = document.createElement('div');
			rowContainer.className = 'row';

		var pregs = inst[i].preguntas;

		for(var cont = 0; cont < pregs.length; cont++){

			var resp = pregs[cont].respuestas;

			for (var index = 0; index < resp.length; index++) {
			
				var colCard = document.createElement('div');
					colCard.className = 'col-md-4';
					
				var cardInstrumento = document.createElement('div');
					cardInstrumento.className = 'card';
					cardInstrumento.addEventListener('click', cardEvent, false);

				var cardHeader = document.createElement('div');
					cardHeader.className = 'header';
					cardHeader.innerHTML = pregs[cont].preguntaTitle;

				var cardBody = document.createElement('div');
					cardBody.className = 'body';
					cardBody.innerHTML = resp[index].pregInicio + ' .. ' 
						+ resp[index].pregFin;

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
	};
}

function cardEvent(e){

	console.log('click!!');
}

function getData(callback){

	instrumentos = tempIns;

	callback(instrumentos);
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