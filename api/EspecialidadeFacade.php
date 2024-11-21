<?php
class EspecialidadeFacade {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function cadastrarEspecialidade($especialidade) {
        // Criação da especialidade através da Factory
        $especialidadeObj = EspecialidadeFactory::create($especialidade);

        // Lógica para inserir no banco
        $insertEspecialidade = Funcoes::insertDados($this->pdo, $especialidadeObj->getEspecialidade());

        return $insertEspecialidade;
    }
}
?>