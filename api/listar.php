<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'db_config.php';

$filtro = $_GET['filtro'] ?? 'todos';

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

if ($filtro != 'todos') {
    $query .= " AND categoria = :filtro";
}

$stmt = $pdo->prepare($query);

if ($filtro != 'todos') {
    $stmt->bindParam(':filtro', $filtro, PDO::PARAM_STR);
}

$stmt->execute();
$clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($clientes);
?>