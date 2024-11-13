import React, { useState, useEffect } from "react";
import { FaTrash } from 'react-icons/fa';
import Swal from "sweetalert2";

function Listar() {
    const [clientes, setClientes] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [filtro, setFiltro] = useState("todos");
    const [isFiltroAplicado, setIsFiltroAplicado] = useState(false);

    const fetchClientes = () => {
        fetch(`http://localhost/projeto_web_react/api/listar.php?filtro=${filtro}`)
            .then((response) => response.json())
            .then((data) => {
                setClientes(data);
                setIsFiltroAplicado(true);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    };

    const fetchEspecialidades = () => {
        fetch("http://localhost/projeto_web_react/api/listar_especialidades.php")
            .then((response) => response.json())
            .then((data) => setEspecialidades(data))
            .catch((error) => {
                console.error("Erro ao carregar especialidades:", error);
            });
    };

    useEffect(() => {
        fetchEspecialidades();
    }, []);

    const handleFilterChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleGenerateClick = () => {
        fetchClientes();
    };

    const handleDeleteClick = (id) => {
        fetch("http://localhost/projeto_web_react/api/desativar_restaurante.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ id }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: data.message || 'Restaurante desativado com sucesso!',
                });
                fetchClientes();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: "Erro ao desativar o restaurante: " + data.message,
                });
            }
        })
        .catch((error) => {
            console.error("Erro ao desativar restaurante:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Ocorreu um erro ao tentar desativar o restaurante.',
            });
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Restaurantes cadastrados</h2>
            <div className="mb-3">
                <label>Filtrar por especialidade:</label>
                <select className="form-select" value={filtro} onChange={handleFilterChange}>
                    <option value="todos">Todos</option>
                    {especialidades.map((esp, index) => (
                        <option key={index} value={esp.especialidade}>
                            {esp.especialidade}
                        </option>
                    ))}
                </select>
                <button className="btn btn-danger mt-2" onClick={handleGenerateClick}>Gerar</button>
            </div>

            {isFiltroAplicado && (
                <table className="table table-striped table-bordered table-hover mt-4">
                    <thead className="table-gray">
                        <tr>
                            <th className="text-left align-middle">Nome Fantasia</th>
                            <th className="text-center align-middle">Telefone</th>
                            <th className="text-center align-middle">Endereço</th>
                            <th className="text-center align-middle">Especialidade</th>
                            <th className="text-center align-middle">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.length > 0 ? (
                            clientes.map((cliente, index) => (
                                <tr key={index}>
                                    <td className="text-left align-middle">{cliente.nome_fantasia}</td>
                                    <td className="text-center align-middle">{cliente.telefone}</td>
                                    <td className="text-center align-middle">{cliente.endereco + ", " + cliente.cidade + " - " + cliente.uf}</td>
                                    <td className="text-center align-middle">{cliente.especialidade}</td>
                                    <td className="text-center align-middle">
                                        <button className="btn btn-danger" onClick={() => handleDeleteClick(cliente.id)}>
                                            <FaTrash/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Nenhum restaurante encontrado com a especialidade selecionada.
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