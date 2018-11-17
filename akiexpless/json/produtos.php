<?php
	//adicionar o cabecalho json
	header("Content-type:application/json");

	//mostrar os produtos em destaque ou produtos de uma categoria

	//incluir o arquivo para conectar no banco
	include "conecta.php";

	$opcao = $_GET["opcao"];

	//se a opcao for destaque
	if ( $opcao == "destaque" ) {
		//mostrar somente as opções em destaque
		$sql = "select * from produto where destaque= 'S' ";
		$consulta = $pdo->prepare($sql);
		$consulta->execute();

		while ( $dados = $consulta->fetch(PDO::FETCH_OBJ)) {

			$id = $dados->id;
			$nome = $dados->nome;
			$valor = $dados->valor;
			$imagem = $dados->imagem;

			$valor = number_format($valor,
				2,
				",",
				".");

			$imagem = "produtos/".$imagem;

			//colocar dentro de um array
			$produto[$id] = array(
				"id"=>$id,
				"nome"=>$nome,
				"valor"=>$valor,
				"imagem"=>$imagem
			);
		} // fim do while

		//print_r( $produto );
		echo json_encode( $produto );

	} else {
		//produtos de uma categoria
		$categoria_id = $_GET["categoria_id"];

		$sql = "select * from produto 
			where categoria_id = ? 
			order by rand()";
		$consulta = $pdo->prepare($sql);
		//passar a categoria como parametro
		$consulta->bindParam(1, $categoria_id);
		$consulta->execute(); 

		while ( $dados = $consulta->fetch(PDO::FETCH_OBJ)) {

			$id = $dados->id;
			$nome = $dados->nome;
			$valor = $dados->valor;
			$imagem = $dados->imagem;

			$valor = number_format($valor,
				2,
				",",
				".");

			$imagem = "produtos/".$imagem;

			//colocar dentro de um array
			$produto[$id] = array(
				"id"=>$id,
				"nome"=>$nome,
				"valor"=>$valor,
				"imagem"=>$imagem
			);
		} // fim do while

		//print_r( $produto );
		echo json_encode( $produto );
	}




