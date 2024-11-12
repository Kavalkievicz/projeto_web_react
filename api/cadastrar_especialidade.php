<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include 'db_config.php';

$data = json_decode(file_get_contents("php://input"), true);
$especialidade = isset($data['especialidade']) ? trim($data['especialidade']) : '';

if (empty($especialidade)) {
    echo json_encode(['status' => 'error', 'message' => 'Especialidade é obrigatória!']);
    exit();
}

$query = $pdo->prepare("INSERT INTO tb_especialidades (especialidade) VALUES (:especialidade)");
$query->bindParam(':especialidade', $especialidade);

if ($query->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Especialidade cadastrada com sucesso!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Falha ao cadastrar especialidade.']);
}
?>