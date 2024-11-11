import React, { useState } from "react";
import Cadastrar from "./Cadastrar";
import Listar from "./Listar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [activeComponent, setActiveComponent] = useState(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'cadastrar':
                return <Cadastrar />;
            case 'listar':
                return <Listar />;
            default:
                return <div>Selecione uma opção no menu</div>;
        }
    };

    return (
        <div className="d-flex">
            <div className="bg-light p-3" style={{ width: '250px', minHeight: '100vh' }}>
                <h4>Menu</h4>
                <ul className="list-unstyled">
                    <li>
                        <button 
                            className="btn btn-link" 
                            onClick={() => setActiveComponent('cadastrar')}
                        >
                            Cadastrar Cliente
                        </button>
                    </li>
                    <li>
                        <button 
                            className="btn btn-link" 
                            onClick={() => setActiveComponent('listar')}
                        >
                            Listar Clientes
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex-grow-1 p-4">
                {renderComponent()}
            </div>
        </div>
    );
}

export default App;