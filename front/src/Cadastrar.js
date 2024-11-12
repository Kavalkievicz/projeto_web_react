import React, { useState } from "react";

function Cadastrar() {
    const [cnpj, setCnpj] = useState("");
    const [razaoSocial, setRazaoSocial] = useState("");
    const [nomeFantasia, setNomeFantasia] = useState("");
    const [endereco, setEndereco] = useState("");
    const [uf, setUf] = useState("");
    const [cidade, setCidade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [especialidade, setEspecialidade] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const clienteData = {
            cnpj,
            razaoSocial,
            nomeFantasia,
            endereco,
            uf,
            cidade,
            telefone,
            especialidade,
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
            <div className="card p-4" style={{ width: '600px' }}>
                <h2 className="text-center">Cadastrar Restaurante</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">CNPJ:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={cnpj}
                                onChange={(e) => setCnpj(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Telefone:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Razão Social:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={razaoSocial}
                                onChange={(e) => setRazaoSocial(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nome Fantasia:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nomeFantasia}
                                onChange={(e) => setNomeFantasia(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Endereço:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">UF:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={uf}
                                onChange={(e) => setUf(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Cidade:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Especialidade:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={especialidade}
                                onChange={(e) => setEspecialidade(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
                </form>
            </div>
        </div>
    );    
}

export default Cadastrar;