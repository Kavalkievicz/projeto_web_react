<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'db_config.php';

$data = json_decode(file_get_contents("php://input"), true);    

$nome = isset($data['nome']) ? trim($data['nome']) : '';
$telefone = isset($data['telefone']) ? trim($data['telefone']) : '';
$cpf = isset($data['cpf']) ? trim($data['cpf']) : '';

if (empty($nome) || empty($telefone) || empty($cpf)) {
    echo json_encode(['status' => 'error', 'message' => 'Todos os campos são obrigatórios!']);
    exit();
}

$query = $pdo->prepare("
    INSERT INTO clientes
    (
        nome,
        telefone,
        cpf
    )
    VALUES
    (
        :nome,
        :telefone,
        :cpf
    )
");

$query->bindParam(':nome', $nome);
$query->bindParam(':telefone', $telefone);
$query->bindParam(':cpf', $cpf);

if ($query->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Cliente cadastrado com sucesso!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Falha ao cadastrar cliente.']);
}
?>