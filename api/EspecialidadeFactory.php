<?php
class Especialidade {
    private $nome;

    public function __construct(string $nome) {
        $this->nome = $nome;
    }

    public function getNome(): string {
        return $this->nome;
    }
}

abstract class EspecialidadeFactory {
    abstract public static function criarEspecialidade(string $nome): Especialidade;
}

class EspecialidadeConcretaFactory extends EspecialidadeFactory {
    public static function criarEspecialidade(string $nome): Especialidade {
        return new Especialidade($nome);
    }
}