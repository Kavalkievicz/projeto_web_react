import React, { useState, useEffect } from "react";
import { FaTrash } from 'react-icons/fa'

function Listar() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetch("http://localhost/web_projeto/listar.php")
            .then((response) => response.json())
            .then((data) => {
                setClientes(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Clientes cadastrados</h2>
            <table className="table table-striped table-bordered table-hover">
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
                                Nenhum cliente cadastrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );    
}

export default Listar;