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
        <div className="container d-flex justify-content-center mt-5">
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="text-center">Cadastrar Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Telefone:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">CPF:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
                </form>
            </div>
        </div>
    );    
}

export default Cadastrar;