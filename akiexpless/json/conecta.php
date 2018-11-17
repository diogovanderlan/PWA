<?php
	//conexao com o banco de dados

	//forçar a mostrar os erros
	ini_set("display_errors", 1);
	error_reporting(E_ALL);

	//criar a conexao
	try {

		$servidor = "localhost";
		$usuario = "root";
		$senha = "";
		$banco = "pwa";

		$pdo = new PDO("mysql:host=$servidor;dbname=$banco;charset=utf8",$usuario,$senha);

	} catch (PDOException $e) {

		echo "Erro ao conectar no banco: ". $e->getMessage();

	}