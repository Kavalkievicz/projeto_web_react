<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'db_config.php';

$query = "
    SELECT
        nome,
        telefone,
        cpf
    FROM
        clientes
    WHERE TRUE
        AND ativo = 1
";

$stmt = $pdo->query($query);

if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => 'Erro ao consultar clientes.']);
    exit();
}

$clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($clientes);
?>