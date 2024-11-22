<?php
class EspecialidadeFacade {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function cadastrarEspecialidade(string $especialidade): bool {
        $especialidadeObj = EspecialidadeConcretaFactory::criarEspecialidade($especialidade);

        return Funcoes::insertDados($this->pdo, $especialidadeObj->getNome());
    }
}