<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'db_config.php';
include 'Funcoes.php';

$filtro = isset($_GET['filtro']) ? $_GET['filtro'] : 'todos';

$restaurantesCadastrados = Funcoes::getRestaurantes($pdo, $filtro);

echo json_encode($restaurantesCadastrados);
?>