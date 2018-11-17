$(document).ready(function() {
	
	id = retornaId();

	console.log(id);


	//verificar se existem dados no localStoragee

	produto = localStorage.getItem("produto"+id);

	//vverifica se nao existe 
	if ( !produto ) {
		console.log("nao existe produto no cache");
		//buscar os dados no json do produto.php
		$.getJSON("json/produto.php?id="+id,
			function(){
				//caregar mensage da div msg
				$("#msg").html("<img src='imgs/load.gif'> Carregando......");

			}).done( function( dados ) {
				//preencher atela 
				preencher( dados );

				//se na oexistirem dados, depois do json jogar os dados  no localStoge
				localStorage.setItem("produto"+id,JSON.stringify(dados));
			})
	} else {
		console.log("produto do cache");
		//pego oos dados do json
		dados = JSON.parse(produto);
		//funcao para preencher a tela 
		preencher( dados );


	}
	//funcao de preencher

	function preencher( dados ) {
		//laço de repeticao para jogar os dados na tela 
		$.each( dados, function(key,val) {
			//key - nome do campo, val e o valor deste campo

			//preparar a tag img - image 
			imagem = "<img src='"+val.imagem+"'class='img'>";
			//adicionar o nome 
			$("h1").html(val.nome);
			//adiciona a imagem
			$(".row").html(imagem);
			//adicionar a descccricao
			$(".row").append(val.descricao);

			$("#msg").html("");
		})
	}

})
	

