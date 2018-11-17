$(document).ready(function(){

	op = retornaId(4);
	console.log(op);

	if ( op == "add" ) {
		console.log("Adicionado produto ao carrinho")
		id = retornaId(5);

		produto = JSON.parse( localStorage.getItem("produto"+id) );
		carrinho = JSON.parse( localStorage.getItem("carrinho") );

		if ( !produto ) {

			$.getJSON("json/produto.php?op=produto&id="+id,function(){
				$(".produto").html("<img src='imagens/load.gif'> Carregando produtos...");
			}).done(function(dados){
				
				cache = JSON.stringify(dados);
				localStorage.setItem("produto"+id,cache);
				produto = JSON.parse( localStorage.getItem("produto"+id) );

			}).fail(function(){
				$(".produto").html("Erro ao carregar produtos");
			})

		}

		//verificar se tem algo no carrinho
		if ( !carrinho ) {
			carrinho = [];
		}

		//objeto a ser inserido no carrinho
		$.each(produto, function( key, val) {
			
			c = buscaCarrinho(carrinho,val.id);
			if ( c == 0 ) {
				produto = {
					id: val.id,
					nome: val.nome,
					foto: val.foto,
					valor: val.valor
				};
				console.log("Adicionando "+val.foto)
				carrinho.push(produto);
				localStorage.setItem("carrinho",JSON.stringify(carrinho) );

			} else {
				alert("Este produto já foi adicionado ao carrinho");
			}

			
		})

		
	}

	mostraCarrinho();
})

function buscaCarrinho(carrinho,id) {
	c = 0;
	$.each(carrinho, function( key, val) {
		if ( val.id == id ) c++;
	})
	return c;
}

function mostraCarrinho() {

	$(".produto").html("<img src='imagens/load.gif'> Carregando produtos...");

	//listar os produtos do carrinho
	carrinho = localStorage.getItem("carrinho");
	console.log(carrinho);

	if ( carrinho ) {

		produto = JSON.parse( carrinho );
		var total = 0;

		$(".produto").html(`<h2>Carrinho de compras:</h2>
			<table>
				<thead>
					<tr>
						<td>Foto</td><td>Produto</td><td>Valor</td><td>Remover</td>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			<br>
			<a href='javascript:limpar()' class='btn red darken-4'>Limpar carrinho</a>`);

		$.each( produto, function( key, val )  {

			$("tbody").append("<tr id='linha"+key+"'><td><img src='"+val.foto+"' width='100px'></td><td>"+val.nome+"</td><td>R$ "+val.valor+"</td><td><button type='button' class='btn red darken-4' onclick='removerItem("+key+")'><i class='material-icons'>remove_shopping_cart</i></button></td></tr>");

	 	})

	} else if ( carrinho == null) {

		$(".produto").html("Nenhum item no seu carrinho");

	}

}


//funcao para remover o item
function removerItem(key) {
	if ( confirm ( "Deseja remover este item?" ) ) {
		var carrinho = localStorage.getItem("carrinho");
		//remover o item
		carrinho = JSON.parse(carrinho);
		carrinho.splice(key, 1);
		localStorage.setItem("carrinho", JSON.stringify(carrinho));
		//apagar a linha
		$("#linha"+key).hide("fast");
		//redirecionar
		mostraCarrinho();
	}
}

function limpar() {
	localStorage.clear("carrinho");
	mostraCarrinho();
}