<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'db_config.php';
include 'Funcoes.php';

$especialidades = Funcoes::getEspecialidadesAtivas($pdo);

echo json_encode($especialidades);
?>