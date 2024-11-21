import React, { useState } from "react";
import Swal from "sweetalert2";
import EspecialidadeService from "../src/services/EspecialidadeService";
import { createModal } from "../src/utils/ModalFactory";

function CadastrarEspecialidade({ onClose, onEspecialidadeCadastrada }) {
    const [especialidade, setEspecialidade] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Chamando o serviço (Facade)
        EspecialidadeService.cadastrarEspecialidade(especialidade)
            .then(data => {
                if (data.status === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso!",
                        text: data.message || "Especialidade cadastrada com sucesso!",
                    });
                    onClose(); // Notifica o componente pai (Observer)
                    onEspecialidadeCadastrada(); // Atualiza o estado no pai
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Erro!",
                        text: data.message || "Erro ao cadastrar especialidade!",
                    });
                }
            })
            .catch(error => {
                console.error("Erro ao cadastrar especialidade:", error);
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: "Erro ao cadastrar especialidade!",
                });
            });
    };

    const modalContent = (
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
    );

    return createModal("Cadastrar Especialidade", modalContent, onClose); // Modal dinâmico (Factory)
}

export default CadastrarEspecialidade;