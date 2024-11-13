<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'db_config.php';
include 'Funcoes.php';

$data = json_decode(file_get_contents("php://input"), true);
$razaoSocial = isset($data['razaoSocial']) ? trim($data['razaoSocial']) : '';
$cnpj = isset($data['cnpj']) ? trim($data['cnpj']) : '';
$nomeFantasia = isset($data['nomeFantasia']) ? trim($data['nomeFantasia']) : '';
$endereco = isset($data['endereco']) ? trim($data['endereco']) : '';
$uf = isset($data['uf']) ? trim($data['uf']) : '';
$cidade = isset($data['cidade']) ? trim($data['cidade']) : '';
$especialidade = isset($data['especialidade']) ? trim($data['especialidade']) : '';
$telefone = isset($data['telefone']) ? trim($data['telefone']) : '';

if (!empty($razaoSocial) || !empty($cnpj) || !empty($nomeFantasia) || !empty($endereco) || !empty($uf) || !empty($cidade) || !empty($especialidade)) {
    $restauranteCadastrado = Funcoes::insertRestaurante($pdo, $razaoSocial, $cnpj, $nomeFantasia, $endereco, $uf, $cidade, $especialidade, $telefone);

    if ($restauranteCadastrado) {
        $result = [
            'status' => 'success',
            'message' => 'Restaurante cadastrado com sucesso!'
        ];
    } else {
        $result = [
            'status' => 'error',
            'message' => 'Falha ao cadastrar restaurante.'
        ];
    }
} else {
    $result = [
        'status' => 'error',
        'message' => 'Todos os campos são obrigatórios!'
    ];

    exit();
}

echo json_encode($result);
?>