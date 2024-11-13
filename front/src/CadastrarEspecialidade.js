import React, { useState } from "react";
import Swal from "sweetalert2";

function CadastrarEspecialidade({ onClose, onEspecialidadeCadastrada }) {
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
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: data.message || 'Especialidade cadastrada com sucesso!',
                });

                onClose();
                onEspecialidadeCadastrada();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: data.message || 'Erro ao cadastrar especialidade!',
                });
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar especialidade:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao cadastrar especialidade!',
            });
        });
    };

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cadastrar Especialidade</h5>
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
                            <div className="mt-3 d-flex justify-content-between">
                                <button type="submit" className="btn btn-danger">Gravar</button>
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastrarEspecialidade;