<?php
	//criar conexão com o banco
	$servidor = "172.16.1.215";
	$usuario = "1234";
	$senha = "1234";
	$banco = "1234_pwa";


	$servidor = "opmy0003.servidorwebfacil.com:3306";
	$usuario = "burne_usuario";
	$senha = "PWA20!%";
	$banco = "burnes_banco";

	try {
		$pdo = new PDO("mysql:host=$servidor;dbname=$banco;charset=utf8",$usuario,$senha);
	} catch (PDOException $erro) {
		echo "Erro ao conectar: ".$erro->getMessage();
		exit;
	}