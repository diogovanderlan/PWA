$(document).ready(function(){

	id = retornaId(4);
	console.log("Id: "+id);
	
	produto = localStorage.getItem("produto"+id);

	if ( produto ) {
		console.log("Produto do Cache");
		dados = JSON.parse(produto);
		preencher(dados);
	} else{
		console.log("Produto do JSON");
		$.getJSON("json/produto.php?op=produto&id="+id,function(){
			$(".produto").html("<img src='imagens/load.gif'> Carregando produtos...");
		}).done(function(dados){
			preencher(dados);
			cache = JSON.stringify(dados);
			localStorage.setItem("produto"+id,cache);
		}).fail(function(){
			$(".produto").html("Erro ao carregar produtos");
		})
	}


})

function preencher(dados) {
	$.each( dados, function ( key, val ) {
		$(".produto").html(`<div class='row'>
			<div class='col s12 m4 center-align'>
				<img src='${val.foto}' alt='${val.nome}' title='${val.nome}' class='responsive-img'>
				<p class='valor'>R$ ${val.valor}</p>
				<p>
					<a href='carrinho/add/${val.id}' class='btn red darken-4'>Comprar</a>
				</p>
			</div>
			<div class='col s12 m8 center-align'><h4>${val.nome}</h4>
			<p>${val.descricao}</p></div>
		</div>`);
	})
}