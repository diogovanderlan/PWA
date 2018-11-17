$(document).ready( function(){

	//funcao para funcionar o menu do materialize
	$(".button-collapse").sideNav();

	// funcao par 


})
function retornaId() {
		//pregar a url - endereço
		url = window.location.href;
		console.log(url);
		//separar o id 
		id = url.split("=");
		id = id[1];
		//retornar o valor
		return id;
	}