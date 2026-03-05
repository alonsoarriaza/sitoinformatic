import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// IMPORTACIÓN DE TODOS LOS COMPONENTES
import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Registro'; // Cambiado de Register a Registro
import Catalogo from './components/Catalogo';
import Configurador from './components/Configurador';
import Carrito from './components/Carrito';
import Pago from './components/Pago';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Ruta de registro actualizada */}
          <Route path="/register" element={<Registro />} />
          <Route path="/registro" element={<Registro />} /> 

          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/configurador" element={<Configurador />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pago" element={<Pago />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;