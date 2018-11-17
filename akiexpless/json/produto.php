<?php
	//adicionar o cabecalho json
	header("Content-type:application/json");

	//mostrar os produtos em destaque ou produtos de uma categoria

	//incluir o arquivo para conectar no banco
	include "conecta.php";

	$id = trim ( $_GET["id"] );

	$sql = "select * from produto 
		where id = ? limit 1";
	$consulta = $pdo->prepare($sql);
	$consulta->bindParam(1, $id);
	$consulta->execute();

	$dados = $consulta->fetch(PDO::FETCH_OBJ);

	$id = $dados->id;
	$nome = $dados->nome;
	$valor = $dados->valor;
	$imagem = $dados->imagem;
	$descricao = $dados->descricao;

	$valor = number_format($valor,2, ",", ".");
	$imagem = "produtos/".$imagem;

	//array
	$produto[$id] = array(
		"id"=>$id,
		"nome"=>$nome,
		"valor"=>$valor,
		"descricao"=>$descricao,
		"imagem"=>$imagem
	);
	echo json_encode($produto);
