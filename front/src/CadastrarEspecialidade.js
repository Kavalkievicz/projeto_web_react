import React, { useState } from "react";

function CadastrarEspecialidade({ onClose }) {
    const [especialidade, setEspecialidade] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost/projeto_web_react/api/cadastrar_especialidade.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ especialidade }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert("Especialidade cadastrada com sucesso!");
                onClose();
            } else {
                alert(data.message || "Erro ao cadastrar especialidade.");
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar especialidade:", error);
            alert("Erro ao cadastrar especialidade.");
        });
    };

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cadastrar Especialidade</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="especialidade">Especialidade</label>
                                <input
                                    type="text"
                                    id="especialidade"
                                    className="form-control"
                                    value={especialidade}
                                    onChange={(e) => setEspecialidade(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Gravar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastrarEspecialidade;