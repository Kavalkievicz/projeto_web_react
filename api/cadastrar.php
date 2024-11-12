<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'db_config.php';

$data = json_decode(file_get_contents("php://input"), true);

$razaoSocial = isset($data['razao_social']) ? trim($data['razao_social']) : '';
$cnpj = isset($data['cnpj']) ? trim($data['cnpj']) : '';
$nomeFantasia = isset($data['nome_fantasia']) ? trim($data['nome_fantasia']) : '';
$endereco = isset($data['endereco']) ? trim($data['endereco']) : '';
$uf = isset($data['uf']) ? trim($data['uf']) : '';
$cidade = isset($data['cidade']) ? trim($data['cidade']) : '';
$especialidade = isset($data['especialidade']) ? trim($data['especialidade']) : '';
$telefone = isset($data['telefone']) ? trim($data['telefone']) : '';

if (empty($razaoSocial) || empty($cnpj) || empty($nomeFantasia) || empty($endereco) || empty($uf) || empty($cidade) || empty($especialidade)) {
    echo json_encode(['status' => 'error', 'message' => 'Todos os campos são obrigatórios!']);
    exit();
}

$query = $pdo->prepare("
    INSERT INTO tb_restaurantes
    (
        razao_social,
        cnpj,
        nome_fantasia,
        endereco,
        uf,
        cidade,
        especialidade,
        telefone
    )
    VALUES
    (
        :razao_social,
        :cnpj,
        :nome_fantasia,
        :endereco,
        :uf,
        :cidade,
        :especialidade,
        :telefone
    )
");

$query->bindParam(':razao_social', $nome);
$query->bindParam(':cnpj', $telefone);
$query->bindParam(':nome_fantasia', $cpf);
$query->bindParam(':endereco', $cpf);
$query->bindParam(':uf', $cpf);
$query->bindParam(':cidade', $cpf);
$query->bindParam(':especialidade', $cpf);
$query->bindParam(':telefone', $telefone);

if ($query->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Restaurante cadastrado com sucesso!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Falha ao cadastrar restaurante.']);
}
?>