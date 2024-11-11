import React, { useState } from "react";

function Cadastrar() {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const clienteData = {
            nome,
            telefone,
            cpf,
        };
    
        fetch("http://localhost/web_projeto/cadastrar.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clienteData),
        })
        .then((response) => response.json())
        .then((data) => {
            alert("Cadastro realizado com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao cadastrar:", error);
        });
    };

    return (
        <div>
            <h2>Cadastrar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div>
                    <label>Telefone:</label>
                    <input
                        type="text"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>
                <div>
                    <label>CPF:</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Cadastrar;