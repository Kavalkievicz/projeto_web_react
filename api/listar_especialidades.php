<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'db_config.php';

$query = $pdo->query("SELECT id, especialidade FROM tb_especialidades WHERE TRUE AND ativo = 1");
$especialidades = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($especialidades);
?>