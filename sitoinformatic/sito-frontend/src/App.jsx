import React from 'react';
// Importamos lo justo y necesario para el enrutado
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalogo from './components/Catalogo';
import Configurador from './components/Configurador';

// Nota para programador: Pantalla simple de login para testeo rápido de rutas
const Login = () => <div style={{padding: '20px'}}><h2>Sección de Login</h2></div>;

function App() {
  return (
    <Router>
      {/* El Navbar debe vivir dentro del Router para que funcionen los <Link> */}
      <Navbar />
      
      <Routes>
        {/* Definición de las rutas principales del proyecto */}
        <Route path="/" element={<Catalogo />} />
        <Route path="/configurador" element={<Configurador />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;