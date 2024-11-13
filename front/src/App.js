import React, { useState } from "react";
import Cadastrar from "./Cadastrar";
import Listar from "./Listar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUtensils, FaList, FaChevronRight, FaChevronLeft } from "react-icons/fa";

function App() {
    const [activeComponent, setActiveComponent] = useState('listar');
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    return (
        <div className="d-flex">
            <div
                className={`bg-dark text-white p-4 ${isMenuOpen ? 'menu-open' : 'menu-closed'}`}
                style={{ minHeight: '100vh', transition: 'width 0.3s', width: isMenuOpen ? '250px' : '80px'}}
            >
                <button className="btn btn-link text-white d-flex align-items-center mb-4" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ textDecoration: 'none' }}>
                    {isMenuOpen ? <FaChevronLeft className="me-2" /> : <FaChevronRight className="me-2" />}
                    {isMenuOpen && <span> Menu</span>}
                </button>

                <ul className="nav flex-column">
                    <li className="nav-item mb-3">
                        <button
                            className={`btn w-100 d-flex align-items-center text-start text-white ${activeComponent === 'cadastrar' ? 'bg-danger' : 'bg-transparent'}`}
                            style={{ borderRadius: '8px', padding: '10px', whiteSpace: 'nowrap', overflow: 'hidden' }}
                            onClick={() => setActiveComponent('cadastrar')}
                        >
                            <FaUtensils className="me-2"/>
                            {isMenuOpen && "Cadastrar Restaurante"}
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`btn w-100 d-flex align-items-center text-start text-white ${activeComponent === 'listar' ? 'bg-danger' : 'bg-transparent'}`}
                            style={{ borderRadius: '8px', padding: '10px', whiteSpace: 'nowrap', overflow: 'hidden' }}
                            onClick={() => setActiveComponent('listar')}
                        >
                            <FaList className="me-2"/>
                            {isMenuOpen && "Listar Restaurantes"}
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex-grow-1 p-4">
                {activeComponent === 'cadastrar' && <Cadastrar/>}
                {activeComponent === 'listar' && <Listar/>}
            </div>
        </div>
    );
}

export default App;