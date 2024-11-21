class EspecialidadeService {
    static cadastrarEspecialidade(especialidade) {
        return fetch("http://localhost/projeto_web_react/api/cadastrar_especialidade.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ especialidade }),
        }).then(response => response.json());
    }
}

export default EspecialidadeService;