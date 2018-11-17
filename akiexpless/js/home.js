$(document).ready(function(){


	//verificar se aexiste ddados loais 

	produtos = localStorage.getItem("produtos");

	if ( !produtos ) {
	//se nao existirem dados, buscar no json
	console.log("Nao existem produtos no Cache");
	//buscar os dados no jason do produtos.php
	$.getJSON("json/produtos.php?opcao=destaque",
		function(){

			$("#msg").html("<img src='imgs/load.gif'> Carregando....");

	}).done( function( dados ) {	
		//prencher a tela
		preencher( dados );

		//se nao existires, depois do json, jogar os dados no localStorage

		localStorage.setItem("produtos", JSON.stringify(dados));
		
	})

	
	
	} else {
		//pegar o dado do json do produto
		console.log("produtos no cache")

		dados = JSON.parse(produtos);
		//funcao para preenher a tela 
		preencher( dados );

	}

	function preencher( dados ) {
		//laço de repetição para jogar os dados na tela
		$.each( dados, function(key,val)  {
			//key - nome do campo, val é o valor deste campo
			//preparar a tag img - imagem
			imagem = "<img src='"+val.imagem+"' class='img'>";
			//carregar mais um produto nno .row
			$(".row").append("<div class='col l3 center-align'><div class='card'>"+imagem+" <p>"+val.nome+"</p> <a href='produto.html?id="+val.id+"' class='btn red darken-4'>Comprar</a></div></div>");
			//esconder mensagem carregando
			$("#msg").html("");
		})
	}





	
});