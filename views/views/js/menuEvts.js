$(document).ready(function(){

	setMenuEvents();
});

function setMenuEvents(){

	$('#signOut').click(function(){

		sessionStorage.clear();
		window.location = '../';
	});
}