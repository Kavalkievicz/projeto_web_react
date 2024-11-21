<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include 'db_config.php';
include 'Funcoes.php';
include 'EspecialidadeFactory.php';
include 'EspecialidadeFacade.php';

$data = json_decode(file_get_contents("php://input"), true);
$especialidade = isset($data['especialidade']) ? trim($data['especialidade']) : '';

if (!empty($especialidade)) {
    $especialidadeFacade = new EspecialidadeFacade($pdo);
    $insertEspecialidade = $especialidadeFacade->cadastrarEspecialidade($especialidade);

    if ($insertEspecialidade) {
        $result = [
            'status' => 'success',
            'message' => 'Especialidade cadastrada com sucesso!'
        ];
    } else {
        $result = [
            'status' => 'error',
            'message' => 'Falha ao cadastrar especialidade.'
        ];
    }
} else {
    $result = [
        'status' => 'error',
        'message' => 'Especialidade é obrigatória!'
    ];

    exit();
}

echo json_encode($result);
?>