<?php
	//adicionar o cabecalho json
	header("Content-type:application/json");

	//mostrar os produtos em destaque ou produtos de uma categoria

	//incluir o arquivo para conectar no banco
	include "conecta.php";

	$id = trim ( $_GET["id"] );

	$sql = "select p.*, c.nome categoria from produto p
		inner join categoria c on (c.id = p.categoria_id)
		where c.id = ?";
	$consulta = $pdo->prepare($sql);
	$consulta->bindParam(1, $id);
	$consulta->execute();

	while ( $dados = $consulta->fetch(PDO::FETCH_OBJ)) {

			$id = $dados->id;
			$nome = $dados->nome;
			$valor = $dados->valor;
			$imagem = $dados->imagem;
			$categoria = $dados->categoria;

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
				"imagem"=>$imagem,
				"categoria"=>$categoria
			);
		} // fim do while

	echo json_encode($produto);
