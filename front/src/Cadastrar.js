import React, { useState, useEffect } from "react";
import CadastrarEspecialidade from "./CadastrarEspecialidade";
import Swal from "sweetalert2";

function Cadastrar() {
    const [cnpj, setCnpj] = useState("");
    const [razaoSocial, setRazaoSocial] = useState("");
    const [nomeFantasia, setNomeFantasia] = useState("");
    const [endereco, setEndereco] = useState("");
    const [uf, setUf] = useState("");
    const [cidade, setCidade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [especialidades, setEspecialidades] = useState([]);
    const [showEspecialidadeModal, setShowEspecialidadeModal] = useState(false);

    useEffect(() => {
        atualizarEspecialidades();
    }, []);

    const atualizarEspecialidades = () => {
        fetch("http://localhost/projeto_web_react/api/listar_especialidades.php")
            .then((response) => response.json())
            .then((data) => setEspecialidades(data))
            .catch((error) => console.error("Erro ao carregar especialidades:", error));
    };

    const handleOpenEspecialidadeModal = () => setShowEspecialidadeModal(true);
    const handleCloseEspecialidadeModal = () => setShowEspecialidadeModal(false);

    const formatCNPJ = (value) => {
        return value
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    };

    const handleCnpjChange = (e) => {
        const formattedCnpj = formatCNPJ(e.target.value);
        setCnpj(formattedCnpj);
    };

    const handleTelefoneChange = (e) => {
        let value = e.target.value;

        value = value.replace(/\D/g, "");

        setTelefone(value);
    };

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

        fetch("http://localhost/projeto_web_react/api/cadastrar.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clienteData),
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                icon: data.status,
                title: data.status,
                text: data.message || 'Cadastro realizado com sucesso!',
            });

            setCnpj("");
            setRazaoSocial("");
            setNomeFantasia("");
            setEndereco("");
            setUf("");
            setCidade("");
            setTelefone("");
            setEspecialidade("");
        })
        .catch(error => {
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
                            <input type="text" className="form-control" value={cnpj} onChange={handleCnpjChange} maxLength={18}/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Telefone:</label>
                            <input type="text" className="form-control" value={telefone} onChange={handleTelefoneChange} maxLength={11}/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Razão Social:</label>
                            <input type="text" className="form-control" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)}/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nome Fantasia:</label>
                            <input type="text" className="form-control" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)}/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Endereço:</label>
                            <input type="text" className="form-control" value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">UF:</label>
                            <input type="text" className="form-control" value={uf} onChange={(e) => setUf(e.target.value)} maxLength={2}/>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Cidade:</label>
                            <input type="text" className="form-control" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Especialidade:</label>
                            <div className="d-flex align-items-center">
                                <select className="form-control" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)}>
                                    <option value="">Selecione</option>
                                    {especialidades.map((esp) => (
                                        <option key={esp.id} value={esp.especialidade}>{esp.especialidade}</option>
                                    ))}
                                </select>
                            <button type="button" className="btn btn-link" onClick={handleOpenEspecialidadeModal}>
                                +
                            </button>
                        </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
                </form>
            </div>

            {showEspecialidadeModal && (
                <CadastrarEspecialidade onClose={handleCloseEspecialidadeModal} onEspecialidadeCadastrada={atualizarEspecialidades}/>
            )}
        </div>
    );
}

export default Cadastrar;