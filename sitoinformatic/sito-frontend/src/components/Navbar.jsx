import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '15px', background: '#1a1a1a', color: 'white', display: 'flex', gap: '20px' }}>
      <b style={{ fontSize: '1.2rem' }}>SitoInformatic</b>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Catálogo</Link>
      <Link to="/configurador" style={{ color: '#00d4ff', textDecoration: 'none', fontWeight: 'bold' }}>Configurador</Link>
      <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginLeft: 'auto' }}>Entrar</Link>
    </nav>
  );
}

export default Navbar;