<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'db_config.php';
include 'Funcoes.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $excluiRestaurante = Funcoes::exlcuiRestaurante($pdo, $id);

    if ($excluiRestaurante) {
        $result = [
            'success' => true,
            'message' => 'Restaurante desativado com sucesso.'
        ];
    } else {
        $result = [
            'success' => false,
            'message' => 'Erro ao desativar restaurante.'
        ];
    }
} else {
    $result = [
        'success' => false,
        'message' => 'Método de requisição inválido.'
    ];
}

echo json_encode($result);
?>
