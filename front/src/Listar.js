import React, { useState, useEffect } from "react";

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
        <div>
            <h2>Listar Clientes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>CPF</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.length > 0 ? (
                        clientes.map((cliente, index) => (
                            <tr key={index}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.cpf}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Nenhum cliente cadastrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Listar;