import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Configurador from './components/Configurador';

// Vistas temporales hasta que hagamos los archivos de Login y Catálogo
const CatálogoPrincipal = () => (
  <div style={{ padding: '20px' }}>
    <h2>Catálogo de Componentes</h2>
    <p>Aquí listaremos todas las piezas de la base de datos.</p>
  </div>
);

const LoginRegistro = () => (
  <div style={{ padding: '20px' }}>
    <h2>Área de Usuario</h2>
    <p>Pantalla de Login / Registro con JWT.</p>
  </div>
);

function App() {
  return (
    <Router>
      {/* El Navbar se queda fijo arriba */}
      <Navbar />
      
      <Routes>
        {/* La página principal ahora es el Catálogo, como pediste */}
        <Route path="/" element={<CatálogoPrincipal />} />
        
        {/* El configurador es solo una herramienta más de la lista */}
        <Route path="/configurador" element={<Configurador />} />
        
        {/* Sección de entrada y registro */}
        <Route path="/login" element={<LoginRegistro />} />
      </Routes>
    </Router>
  );
}

export default App;
