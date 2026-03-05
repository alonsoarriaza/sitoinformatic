import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ mostrar: false, mensaje: '', tipo: 'success' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Obtenemos los componentes del servidor para alimentar la interfaz visual
    axios.get('http://localhost:8080/api/components')
      .then(res => setProductos(res.data))
      .catch(err => setError("No se pudo cargar el catálogo."));
  }, []);

  const obtenerIcono = (categoria) => {
    const cat = categoria.toUpperCase();
    if (cat.includes("CPU") || cat.includes("PROCESADOR")) return "🔳";
    if (cat.includes("GPU") || cat.includes("GRAFICA")) return "📟";
    if (cat.includes("RAM") || cat.includes("MEMORIA")) return "📏";
    if (cat.includes("SSD") || cat.includes("DISCO") || cat.includes("ALMACENAMIENTO")) return "💾";
    if (cat.includes("PLACA") || cat.includes("BASE") || cat.includes("MOTHER")) return "🧱";
    if (cat.includes("FUENTE") || cat.includes("ALIMENTACION") || cat.includes("PSU")) return "⚡";
    if (cat.includes("CHASIS") || cat.includes("CAJA") || cat.includes("CASE") || cat.includes("TORRE")) return "📦";
    if (cat.includes("MONITOR") || cat.includes("PANTALLA")) return "🖥️";
    if (cat.includes("TECLADO")) return "⌨️";
    if (cat.includes("RATON") || cat.includes("RATÓN") || cat.includes("MOUSE")) return "🖱️";
    return "⚙️";
  };

  const mostrarAviso = (msg, tipo = 'success') => {
    setToast({ mostrar: true, mensaje: msg, tipo });
    setTimeout(() => setToast({ ...toast, mostrar: false }), 3000);
  };

  const añadirAlCarrito = async (productoId) => {
    if (!token) {
      mostrarAviso("Identifícate para gestionar tu carrito", "error");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    // LEER AQUÍ: Intentamos coger el ID de varias formas por si acaso
    const userIdLogueado = localStorage.getItem('userId') || localStorage.getItem('id');

    // Si sigue saliendo undefined, avisamos al usuario antes de romper el servidor
    if (!userIdLogueado || userIdLogueado === "undefined") {
      alert("⚠️ Error de sesión: No se encuentra tu ID de usuario. Por favor, cierra sesión y vuelve a entrar.");
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/carrito/add', {
        userId: parseInt(userIdLogueado), // Lo convertimos a número para Java
        componentId: productoId,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      mostrarAviso("¡Componente añadido! ✅");
      window.dispatchEvent(new Event('carritoActualizado'));
    } catch (err) {
      mostrarAviso("Error 500: El servidor rechazó la operación.", "error");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <div style={styles.mainContainer}>
        <h2 style={styles.title}>Catálogo Sito<span style={{color:'#3b82f6'}}>Informatic</span></h2>
        <p style={styles.subtitle}>Equipamiento de vanguardia para entusiastas del hardware.</p>

        <div style={styles.grid}>
          {productos.map((p) => (
            <div key={p.id} style={styles.card}>
              <div style={styles.iconArea}>{obtenerIcono(p.category)}</div>
              <div style={styles.contentArea}>
                <div style={styles.categoryLabel}>{p.category}</div>
                <h3 style={styles.productName}>{p.productName}</h3>
                
                <div style={styles.actionRow}>
                  <div style={styles.priceBadge}>
                    {p.price} €
                  </div>
                  <button onClick={() => añadirAlCarrito(p.id)} style={styles.addBtn}>
                    Añadir 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast.mostrar && (
        <div style={{
          ...styles.toast,
          backgroundColor: toast.tipo === 'error' ? '#ef4444' : '#10b981'
        }}>
          {toast.mensaje}
        </div>
      )}
    </div>
  );
}

const styles = {
  pageWrapper: { background: '#020617', minHeight: '100vh', color: '#f8fafc', fontFamily: "'Inter', sans-serif" },
  mainContainer: { maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' },
  title: { fontSize: '2.8rem', fontWeight: '900', textAlign: 'center', marginBottom: '10px' },
  subtitle: { color: '#94a3b8', textAlign: 'center', marginBottom: '60px', fontSize: '1.1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' },
  card: { background: '#0f172a', borderRadius: '24px', border: '1px solid #1e293b', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' },
  iconArea: { fontSize: '4rem', textAlign: 'center', padding: '30px', background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)', borderBottom: '1px solid #1e293b' },
  contentArea: { padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 },
  categoryLabel: { color: '#3b82f6', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' },
  productName: { fontSize: '1.15rem', marginBottom: '25px', fontWeight: '700', minHeight: '56px', lineHeight: '1.4' },
  actionRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  priceBadge: { background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '10px 18px', borderRadius: '12px', fontSize: '1.3rem', fontWeight: '900', border: '2px solid #10b981' },
  addBtn: { background: '#3b82f6', color: 'white', border: 'none', padding: '12px 22px', borderRadius: '12px', cursor: 'pointer', fontWeight: '800', fontSize: '0.95rem', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)', transition: 'all 0.2s ease' },
  toast: { position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', padding: '16px 35px', borderRadius: '14px', color: 'white', fontWeight: 'bold', zIndex: 1000, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }
};

export default Catalogo;