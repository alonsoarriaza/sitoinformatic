import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const styles = {
  pageWrapper: { background: '#020617', minHeight: '100vh', color: 'white', fontFamily: "'Inter', sans-serif" },
  mainContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '85vh', padding: '40px 20px' },
  
  // TARJETA DEL TOTAL (Novedad)
  amountCard: {
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid #10b981',
    padding: '20px 40px',
    borderRadius: '20px',
    marginBottom: '30px',
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease-out'
  },
  totalLabel: { fontSize: '0.9rem', color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 },
  totalAmount: { fontSize: '3rem', color: '#10b981', fontWeight: '900', margin: '5px 0 0 0', textShadow: '0 0 20px rgba(16, 185, 129, 0.3)' },

  paymentCard: { 
    background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)', 
    padding: '40px', 
    borderRadius: '32px', 
    width: '100%', 
    maxWidth: '500px', 
    border: '1px solid #1e293b',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    position: 'relative'
  },
  label: { fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', display: 'block' },
  input: { 
    width: '100%',
    padding: '14px 16px', 
    borderRadius: '12px', 
    background: 'rgba(30, 41, 59, 0.5)', 
    border: '1px solid #334155', 
    color: 'white', 
    fontSize: '1.1rem',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '20px'
  },
  payBtn: { 
    width: '100%',
    padding: '18px', 
    borderRadius: '16px', 
    border: 'none', 
    color: 'white', 
    fontWeight: '800', 
    fontSize: '1.1rem', 
    cursor: 'pointer', 
    background: '#3b82f6',
    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
    marginTop: '10px'
  },
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 3000 }
};

function Pago() {
  const navigate = useNavigate();
  const [procesando, setProcesando] = useState(false);
  const [completado, setCompletado] = useState(false);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({ card: '', expiry: '', cvv: '', name: '' });

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // Cargamos el total del carrito para mostrarlo en el pago
  useEffect(() => {
    const calcularTotal = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/carrito/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const subtotal = res.data.reduce((acc, i) => acc + (i.component.price * i.quantity), 0);
        setTotal(subtotal * 1.21); // Añadimos el IVA igualamos las imágenes de los cálculos previos
      } catch (err) {
        console.error("Error al obtener el total");
      }
    };
    calcularTotal();
  }, [token, userId]);

  const formatCard = (value) => value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (value) => value.replace(/[^\d]/g, '').replace(/(.{2})/, '$1/').substring(0, 5);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'card') value = formatCard(value);
    if (name === 'expiry') value = formatExpiry(value);
    setFormData({ ...formData, [name]: value });
  };

  const handlePago = async (e) => {
    e.preventDefault();
    setProcesando(true);
    try {
      await new Promise(r => setTimeout(r, 3000));
      await axios.delete(`http://localhost:8080/api/carrito/clear/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.dispatchEvent(new Event('carritoActualizado'));
      setProcesando(false);
      setCompletado(true);
      setTimeout(() => navigate('/'), 4000);
    } catch (error) {
      setProcesando(false);
      alert("Error en el pago.");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      <div style={styles.mainContainer}>
        {!completado ? (
          <>
            {/* CABECERA CON EL TOTAL EN VERDE */}
            <div style={styles.amountCard}>
              <p style={styles.totalLabel}>Total a pagar</p>
              <h1 style={styles.totalAmount}>{total.toFixed(2)} €</h1>
            </div>

            <div style={styles.paymentCard}>
              <h2 style={{marginTop: 0, marginBottom: '25px', textAlign: 'center'}}>Detalles del Pago</h2>
              
              <form onSubmit={handlePago}>
                <label style={styles.label}>Número de Tarjeta</label>
                <input 
                  name="card" 
                  value={formData.card}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000" 
                  maxLength="19"
                  style={styles.input} required 
                />

                <label style={styles.label}>Nombre del Titular</label>
                <input 
                  name="name" 
                  onChange={handleChange}
                  placeholder="NOMBRE COMPLETO" 
                  style={{...styles.input, textTransform: 'uppercase'}} required 
                />

                <div style={{display: 'flex', gap: '20px'}}>
                  <div style={{flex: 1}}>
                    <label style={styles.label}>Vencimiento</label>
                    <input 
                      name="expiry" 
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/AA" 
                      maxLength="5"
                      style={styles.input} required 
                    />
                  </div>
                  <div style={{flex: 1}}>
                    <label style={styles.label}>CVV</label>
                    <input 
                      name="cvv" 
                      onChange={handleChange}
                      placeholder="123" 
                      maxLength="3"
                      style={styles.input} required 
                    />
                  </div>
                </div>

                <button type="submit" style={styles.payBtn}>Pagar Ahora</button>
              </form>
            </div>
          </>
        ) : (
          <div style={{textAlign: 'center', background: '#10b981', padding: '60px', borderRadius: '40px'}}>
             <div style={{fontSize: '5rem', color: 'white'}}>✔</div>
             <h1 style={{color: 'white', margin: '20px 0 0 0'}}>¡Compra Realizada!</h1>
             <p style={{color: 'white', opacity: 0.9}}>Redirigiendo a SitoInformatic...</p>
          </div>
        )}
      </div>

      {procesando && (
        <div style={styles.overlay}>
          <div className="spinner"></div>
          <p style={{marginTop: '25px', fontWeight: 'bold', color: '#10b981'}}>PROCESANDO {total.toFixed(2)} €...</p>
        </div>
      )}

      <style>{`
        .spinner { width: 60px; height: 60px; border: 6px solid rgba(16, 185, 129, 0.2); border-top: 6px solid #10b981; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export default Pago;