window.onload = function(){

	createDonut('donut1', donutVal);
	createDonutSnd('knotEx', 53);
	createDonut('donut3', donutVal2);

	createUITableTabs(instrumentos);
};

function createUITableTabs(elements){

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
			anchor.href = '#'+elements[index].replace(' ', '_');
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
			table.id = 'tabla'+elements[index].replace(' ', '_');
			table.className = 'table-bordered table-striped table-hover dataTable js-exportable';
			table.style.width = '100%';

		$(tabPanes).append(table);
		$(panesContainer).append(tabPanes);
	}

	$(divContainer).append(ulTabs);
	$(divContainer).append(panesContainer);

	for(var index = 0; index < elements.length; index++){
		
		createTable('tabla'+elements[index].replace(' ', '_'), arrayTabas[index]);
	};
}

function createDonut(id, values){

	var donutContainer = document.getElementById(id);

	Morris.Donut({
		element: donutContainer,
		data: values,
		colors: ['rgb(233, 30, 99)', 'rgb(0, 188, 212)', 'rgb(255, 152, 0)', 'rgb(0, 150, 136)'],
		formatter: function (y) {
			return y + '%'
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

function createTable(id, data){

	var headers = data.columns,
		rows = data.dataSet;

	var table = $('#'+id).DataTable( {
		data: rows,
		columns: headers,
		width: '100%',
		paging: false,
		"createdRow": function ( row, data, index ) {

			if(data[4] < 0.8){
				var btnDetalle = document.createElement('button');
					btnDetalle.type = 'button';
					btnDetalle.className = 'btn btn-default waves-effect m-r-20';
					btnDetalle.dataset.toggle = "modal";
					btnDetalle.dataset.target = "#detailModal";
					btnDetalle.innerHTML = data[4];

				$('td', row).eq(4).addClass('modal-trigger').empty().append($(btnDetalle).clone().click(openModalDetail));
			}
        },
	} );

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

function openModalDetail(){

	clearModal();

	var table = document.createElement('table');
		table.id = 'modalTable';
		table.className = 'table-bordered table-striped table-hover dataTable js-exportable';
		table.style.width = '100%';

	$('#detailModal').find('.modal-body').append(table);
	createTable('modalTable',consistenciaDetalle);
}

function clearModal(){

	$('#detailModal').find('.modal-body').empty();
}




// DATOS FALSOS

var tablaConsistecia = {
	columns:[
		{title:"Preguntas"},
		{title:"Total respuestas (n)"},
		{title:"Distribuidas/Asignadas (n)"},
		{title:"Corregidas (n)"},
		{title:"Consistencia (%)"},
	],
	dataSet:[
		["P1", 5392, 4115, 24, 0.9],
		["P2", 3750, 5913, 24, 0.2],
		["P3", 6704, 6166, 24, 0.6],
		["P4", 6515, 6156, 34, 0.3],
		["P5", 4255, 5712, 38, 0.1],
		["P6", 4523, 5892, 1, 0.0],
		["P7", 6686, 3462, 4, 0.8],
		["P8", 7819, 4887, 21, 0.4],
		["P9", 6270, 7722, 31, 0.4],
		["P10", 5242, 7111, 21, 0.1]
	]
};

var tablaConsistecia2 = {
	columns:[
		{title:"Preguntas"},
		{title:"Total respuestas (n)"},
		{title:"Distribuidas/Asignadas (n)"},
		{title:"Corregidas (n)"},
		{title:"Consistencia (%)"},
	],
	dataSet:[
		['P1', 5660, 5197, 20, 0.9],
		['P2', 7359, 6765, 23, 0.5],
		['P3', 6481, 3695, 3, 0.2],
		['P4', 5354, 5839, 18, 0.9],
		['P5', 7294, 5526, 9, 0.8],
		['P6', 7959, 7187, 40, 0.2],
		['P7', 3593, 4137, 2, 0.0],
		['P8', 3233, 6802, 35, 0.9],
		['P9', 5311, 7468, 36, 0.6],
		['P10', 4753, 4700, 11, 0.4]
	]
};

var tablaConsistecia3 = {
	columns:[
		{title:"Preguntas"},
		{title:"Total respuestas (n)"},
		{title:"Distribuidas/Asignadas (n)"},
		{title:"Corregidas (n)"},
		{title:"Consistencia (%)"},
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


var arrayTabas = [tablaConsistecia, tablaConsistecia2, tablaConsistecia3];

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

var consistenciaDetalle = {
	columns:[
		{title:"ID Respuesta"},
		{title:"C1", detail:"Jose Feliciano 1"},
		{title:"C2", detail:"Jose Feliciano 2"},
		{title:"C3", detail:"Jose Feliciano 3"},
	],
	dataSet:[
		["R1","A", "B", ""],
		["R2","", "B", "C"],
		["R3","A", "", "C"],
		["R4","A", "", "C"],
		["R5","", "B", "C"],
	]
};

var instrumentos = [

	'Instrumento 1',
	'Instrumento 2',
	'Instrumento 3',
];