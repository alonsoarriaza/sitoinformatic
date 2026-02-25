import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Aquí traemos el archivo que creaste en la carpeta components
import Navbar from './components/Navbar'; 

// Páginas de prueba (luego las haremos en archivos separados)
const Inicio = () => <div style={{padding: '20px'}}><h2>🏠 Bienvenida a SitoInformatic</h2><p>Tu tienda de confianza.</p></div>;
const Configurador = () => <div style={{padding: '20px'}}><h2>⚙️ Asistente de Configuración</h2><p>Aquí es donde ocurrirá la magia del TFG.</p></div>;
const Login = () => <div style={{padding: '20px'}}><h2>👤 Acceso de Usuarios</h2><p>Inicia sesión para guardar tu PC.</p></div>;

function App() {
  return (
    <Router>
      {/* Ponemos el Navbar fuera de Routes para que se vea siempre arriba */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/configurador" element={<Configurador />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;