import React, { useState } from "react";
import { FaTrash } from 'react-icons/fa';

function Listar() {
    const [clientes, setClientes] = useState([]);
    const [filtro, setFiltro] = useState("todos");
    const [isFiltroAplicado, setIsFiltroAplicado] = useState(false);

    const fetchClientes = () => {
        fetch(`http://localhost/web_projeto/listar.php?filtro=${filtro}`)
            .then((response) => response.json())
            .then((data) => {
                setClientes(data);
                setIsFiltroAplicado(true);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    };

    const handleFilterChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleGenerateClick = () => {
        fetchClientes();
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Clientes cadastrados</h2>
            <div className="mb-3">
                <label>Filtrar por tipo:</label>
                <select className="form-select" value={filtro} onChange={handleFilterChange}>
                    <option value="todos">Todos</option>
                    <option value="pizza">Pizza</option>
                    <option value="hamburguer">Hambúrguer</option>
                    <option value="japones">Japonês</option>
                </select>
                <button className="btn btn-primary mt-2" onClick={handleGenerateClick}>Gerar</button>
            </div>

            {isFiltroAplicado && (
                <table className="table table-striped table-bordered table-hover mt-4">
                    <thead className="table-primary">
                        <tr>
                            <th className="text-left align-middle">Nome</th>
                            <th className="text-center align-middle">Telefone</th>
                            <th className="text-center align-middle">CPF</th>
                            <th className="text-center align-middle">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.length > 0 ? (
                            clientes.map((cliente, index) => (
                                <tr key={index}>
                                    <td className="text-left align-middle">{cliente.nome}</td>
                                    <td className="text-center align-middle">{cliente.telefone}</td>
                                    <td className="text-center align-middle">{cliente.cpf}</td>
                                    <td className="text-center align-middle">
                                        <button className="btn btn-danger">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Nenhum cliente encontrado com o filtro selecionado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Listar;