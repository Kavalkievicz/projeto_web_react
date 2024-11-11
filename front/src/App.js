import React, { useState } from "react";
import Cadastrar from "./Cadastrar";
import Listar from "./Listar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showCadastro, setShowCadastro] = useState(false);
  const [showListagem, setShowListagem] = useState(false);

  return (
    <div>
      <h1 class="bg-success">Projeto de Estacionamento</h1>
      <div>
        <button onClick={() => setShowCadastro(true)}>Cadastrar</button>
        <button onClick={() => setShowListagem(true)}>Listar</button>
      </div>

      {showCadastro && <Cadastrar />}
      {showListagem && <Listar />}
    </div>
  );
}

export default App;