<?php
class EspecialidadeFactory {
    public static function create($especialidade) {
        return new Especialidade($especialidade);
    }
}

class Especialidade {
    private $especialidade;

    public function __construct($especialidade) {
        $this->especialidade = $especialidade;
    }

    public function getEspecialidade() {
        return $this->especialidade;
    }
}
?>