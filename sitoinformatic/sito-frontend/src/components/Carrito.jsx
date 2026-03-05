import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Definimos los estilos fuera para asegurar que estén disponibles al renderizar [cite: 2026-03-05]
const styles = {
  productCard: {
    background: '#0f172a',
    padding: '25px',
    borderRadius: '20px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #1e293b',
    transition: '0.3s'
  },
  infoArea: { display: 'flex', flexDirection: 'column', gap: '8px' },
  productName: { margin: 0, fontSize: '1.2rem', fontWeight: '700' },
  categoryTag: { margin: 0, fontSize: '0.8rem', color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase' },
  quantityWrapper: { display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' },
  counter: { 
    display: 'flex', 
    alignItems: 'center', 
    background: '#020617', 
    borderRadius: '10px', 
    padding: '5px',
    border: '1px solid #334155'
  },
  countBtn: {
    background: '#1e293b',
    color: 'white',
    border: 'none',
    width: '30px',
    height: '30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  countNumber: { padding: '0 15px', fontWeight: 'bold', fontSize: '1.1rem', color: '#3b82f6' },
  priceArea: { textAlign: 'right' },
  unitPrice: { margin: 0, fontSize: '1.3rem', color: '#10b981', fontWeight: '900' },
  deleteLink: { background: 'none', border: 'none', color: '#ef4444', marginTop: '10px', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem', fontWeight: '600' },
  summaryCard: { width: '350px', background: '#1e293b', padding: '35px', borderRadius: '28px', height: 'fit-content', border: '1px solid #334155', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', color: '#94a3b8', marginBottom: '-5px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #334155', paddingTop: '20px', marginTop: '20px' },
  totalPrice: { color: '#10b981', fontWeight: '900', fontSize: '1.8rem' },
  checkoutBtn: { width: '100%', padding: '18px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '14px', marginTop: '25px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' },
  secureText: { textAlign: 'center', color: '#64748b', fontSize: '0.75rem', marginTop: '15px' }
};

function Carrito() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // Función para cargar los datos del carrito
  const cargarCarrito = async () => {
    if (token && userId) {
      try {
        const res = await axios.get(`http://localhost:8080/api/carrito/${userId}`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        setItems(res.data);
      } catch (err) {
        console.error("Error al cargar carrito");
      }
    }
  };

  useEffect(() => {
    cargarCarrito();
  }, [token, userId]);

  // Cálculos económicos
  const subtotal = items.reduce((acc, i) => acc + (i.component.price * i.quantity), 0);
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  // Función para actualizar la cantidad
  const cambiarCantidad = async (itemId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    try {
      const item = items.find(i => i.id === itemId);
      await axios.post('http://localhost:8080/api/carrito/add', {
        userId: userId,
        componentId: item.component.id,
        quantity: nuevaCantidad - item.quantity 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      cargarCarrito();
      window.dispatchEvent(new Event('carritoActualizado'));
    } catch (err) {
      console.error("Error al actualizar cantidad");
    }
  };

  const eliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/carrito/remove/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setItems(items.filter(i => i.id !== id));
      window.dispatchEvent(new Event('carritoActualizado'));
    } catch { 
      alert("Error al eliminar"); 
    }
  };

  if (!token) {
    return (
      <div style={{background: '#020617', minHeight: '100vh', color: 'white'}}>
        <Navbar />
        <h2 style={{textAlign:'center', marginTop:'100px'}}>Inicia sesión para ver tu carrito.</h2>
      </div>
    );
  }

  return (
    <div style={{background: '#020617', minHeight: '100vh', color: 'white'}}>
      <Navbar />
      <div style={{maxWidth: '1200px', margin: '60px auto', padding: '0 20px', display: 'flex', gap: '40px'}}>
        
        {/* LISTA DE PRODUCTOS */}
        <div style={{flex: 1}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '30px'}}>Tu Cesta 🛒</h2>
          
          {items.length === 0 ? (
            <p style={{color: '#94a3b8', fontSize: '1.2rem'}}>Tu carrito está vacío. ¡Explora el catálogo!</p>
          ) : (
            items.map(item => (
              <div key={item.id} style={styles.productCard}>
                <div style={styles.infoArea}>
                  <h4 style={styles.productName}>{item.component.productName}</h4>
                  <p style={styles.categoryTag}>{item.component.category}</p>
                  
                  <div style={styles.quantityWrapper}>
                    <span style={{color: '#94a3b8', fontSize: '0.9rem'}}>Cantidad:</span>
                    <div style={styles.counter}>
                      <button onClick={() => cambiarCantidad(item.id, item.quantity - 1)} style={styles.countBtn}>-</button>
                      <span style={styles.countNumber}>{item.quantity}</span>
                      <button onClick={() => cambiarCantidad(item.id, item.quantity + 1)} style={styles.countBtn}>+</button>
                    </div>
                  </div>
                </div>

                <div style={styles.priceArea}>
                  <p style={styles.unitPrice}>{(item.component.price * item.quantity).toFixed(2)} €</p>
                  <button onClick={() => eliminar(item.id)} style={styles.deleteLink}>Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RESUMEN DE PAGO */}
        <div style={styles.summaryCard}>
          <h3 style={{marginTop: 0, fontSize: '1.5rem', fontWeight: '700'}}>Resumen del pedido</h3>
          
          <div style={styles.summaryRow}><p>Subtotal</p><p>{subtotal.toFixed(2)} €</p></div>
          <div style={styles.summaryRow}><p>IVA (21%)</p><p>{iva.toFixed(2)} €</p></div>
          
          <div style={styles.totalRow}>
            <p style={{fontWeight: 'bold'}}>TOTAL</p>
            <p style={styles.totalPrice}>{total.toFixed(2)} €</p>
          </div>
          
          {/* BOTÓN DE FINALIZAR INTEGRADO CORRECTAMENTE */}
          <button 
            onClick={() => navigate('/pago')} 
            style={styles.checkoutBtn}
            disabled={items.length === 0}
          >
            Finalizar Pedido
          </button>
          
          <p style={styles.secureText}>🔒 Pago 100% seguro y garantizado</p>
        </div>
      </div>
    </div>
  );
}

export default Carrito;