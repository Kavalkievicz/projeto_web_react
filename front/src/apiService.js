const API_URL = "http://localhost/projeto_web_react/api/";

export const listarEspecialidades = async () => {
    try {
        const response = await fetch(`${API_URL}listar_especialidades.php`);

        return await response.json();
    } catch (error) {
        console.error("Erro ao carregar especialidades:", error);
        throw error;
    }
};

export const cadastrarRestaurante = async (dados) => {
    try {
        const response = await fetch(`${API_URL}cadastrar.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        return await response.json();
    } catch (error) {
        console.error("Erro ao cadastrar restaurante:", error);
        throw error;
    }
};