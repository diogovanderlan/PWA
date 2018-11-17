// "http://pos.professorburnes.com.br/akiexpress/json/produtos.php?op=categoria&id="+id

$(document).ready(function() {
	var id = retornaPagina();
	console.log( id );

	var categoria = localStorage.getItem("categoria"+id);

	if ( categoria ) {

		console.log("Produtos do Cache");
		var dados = JSON.parse(categoria);
		localStorage.setItem("categoria"+id, JSON.stringify(dados));
		preencher( dados );

	} else {

		//buscar os produtos em destaque
		$.getJSON("https://www.gamefikando.com.br/json/produtos.php?op=categoria&id="+id,
			function() {

			$("#msg").html("<div class='alert alert-warning'><img src='imgs/load.gif'> Carregando...</div>");
		}).done( function (dados) {

			console.log("Produtos armazenados no Cache");
			localStorage.setItem("categoria"+id, JSON.stringify(dados));
			preencher( dados );

		})

	}

	//funcao para preencher os produtos
	function preencher( dados ) {

		$.each( dados, function( key, val ) {
			categoria = val.categoria
			//adicionar os itens no .row
			$(".row").append("<div class='col l3 m6 s12 center-align'><div class='card'>"+val.imagem+"<p>"+val.nome+"</p><p class='valor'>"+val.valor+"</p><a href='produto.html?id="+val.id+"' class='btn red darken-4'>Detalhes</a></div></div>");
		})
		$("h1").html(categoria);
		$("#msg").html("");
	}
})