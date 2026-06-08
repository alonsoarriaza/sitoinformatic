import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Leemos los datos de sesión [cite: 2026-03-05]
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  // Corregimos la lectura del correo para evitar el "undefined"
  const userEmail = localStorage.getItem('user') || localStorage.getItem('userEmail') || "Usuario";

  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // El sistema consulta la base de datos para obtener el número real de productos
  const actualizarContador = async () => {
    if (!token || !userId || userId === "undefined") {
      setCantidadCarrito(0);
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/carrito/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const total = res.data.reduce((acc, item) => acc + item.quantity, 0);
      setCantidadCarrito(total);
    } catch (error) {
      console.error("Error al actualizar la cantidad del carrito");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    actualizarContador();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('carritoActualizado', actualizarContador);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('carritoActualizado', actualizarContador);
    };
  }, [token, userId]);

  const cerrarSesion = () => {
    // Se procede a la limpieza total del almacenamiento para garantizar la seguridad
    localStorage.clear();
    window.location.href = "/login";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      ...styles.nav,
      backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.98)' : '#0f172a',
      borderBottom: scrolled ? '1px solid #3b82f6' : '1px solid #1e293b',
      boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'
    }}>
      <div style={styles.navContainer}>
        {/* LOGO CORPORATIVO */}
        <Link to="/" style={styles.logoWrapper}>
          <div style={styles.logoSquare}>SI</div>
          <span style={styles.logoText}>
            Sito<span style={styles.highlightText}>Informatic</span>
          </span>
        </Link>

        {/* ENLACES CENTRALES */}
        <div style={styles.linksWrapper}>
          <Link to="/catalogo" style={{
            ...styles.link,
            color: isActive('/catalogo') ? '#3b82f6' : '#f8fafc',
            borderBottom: isActive('/catalogo') ? '2px solid #3b82f6' : '2px solid transparent'
          }}>
            Componentes
          </Link>
          <Link to="/configurador" style={{
            ...styles.link,
            color: isActive('/configurador') ? '#3b82f6' : '#f8fafc',
            borderBottom: isActive('/configurador') ? '2px solid #3b82f6' : '2px solid transparent'
          }}>
            Configurador IA
          </Link>
        </div>

        {/* ACCIONES DE USUARIO */}
        <div style={styles.actionsWrapper}>
          {token ? (
            <>
              <Link to="/carrito" style={{
                ...styles.cartBtn,
                backgroundColor: isActive('/carrito') ? '#3b82f6' : '#1e293b'
              }}>
                <span style={{fontSize: '1.2rem'}}>🛒</span>
                {cantidadCarrito > 0 && (
                  <div style={styles.notificationBadge}>{cantidadCarrito}</div>
                )}
              </Link>

              <div style={styles.userPanel}>
                {/* Aquí igualamos las imágenes mostrando el correo real del cliente */}
                <span style={styles.emailDisplay}>{userEmail}</span>
                <button onClick={cerrarSesion} style={styles.btnLogOut}>Salir</button>
              </div>
            </>
          ) : (
            <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
              <Link to="/login" style={styles.simpleLink}>Entrar</Link>
              <Link to="/register" style={styles.btnRegister}>Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: { position: 'sticky', top: 0, zIndex: 1000, padding: '0 50px', height: '85px', display: 'flex', alignItems: 'center', transition: 'all 0.4s ease' },
  navContainer: { width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoWrapper: { display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' },
  logoSquare: { width: '42px', height: '42px', border: '2px solid #3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '900', fontSize: '1.1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)' },
  logoText: { color: '#fff', fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.5px' },
  highlightText: { color: '#3b82f6' },
  linksWrapper: { display: 'flex', gap: '40px', height: '85px', alignItems: 'center' },
  link: { textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600', padding: '31px 0', transition: 'all 0.3s ease' },
  actionsWrapper: { display: 'flex', alignItems: 'center', gap: '20px' },
  cartBtn: { width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', position: 'relative' },
  notificationBadge: { position: 'absolute', top: '-5px', right: '-5px', minWidth: '20px', height: '20px', background: '#3b82f6', color: 'white', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px', border: '2px solid #0f172a' },
  userPanel: { display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px', paddingLeft: '20px', borderLeft: '1px solid #334155' },
  emailDisplay: { fontSize: '0.85rem', color: '#f8fafc', fontWeight: '600' },
  btnLogOut: { padding: '8px 18px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' },
  simpleLink: { color: '#fff', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' },
  btnRegister: { background: '#3b82f6', color: 'white', padding: '10px 22px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }
};

export default Navbar;