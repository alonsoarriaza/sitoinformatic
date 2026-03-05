import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Configurador() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({ budget: '', mainUse: 'GAMING', includePeripherals: false });
  const [configuracion, setConfiguracion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorServer, setErrorServer] = useState('');
  const [fraseActual, setFraseActual] = useState("Iniciando SitoIA...");
  const [showSuccess, setShowSuccess] = useState(false);

  const frases = ["Analizando compatibilidad...", "Optimizando flujo térmico...", "Buscando stock real...", "Sincronizando frecuencias RAM..."];

  if (!token) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.restrictedContainer}>
          <div style={styles.restrictedCard}>
            <div style={styles.lockIcon}>🔒</div>
            <h2 style={styles.restrictedTitle}>Acceso Restringido</h2>
            <p style={styles.restrictedText}>Necesitas una cuenta para que la IA guarde tu configuración.</p>
            <button onClick={() => navigate('/login')} style={styles.btnPrimary}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
    );
  }

  const obtenerIcono = (categoria) => {
    const cat = categoria.toUpperCase();
    if (cat.includes("CPU") || cat.includes("PROCESADOR")) return "🔳";
    if (cat.includes("GPU") || cat.includes("GRAFICA")) return "📟";
    if (cat.includes("RAM") || cat.includes("MEMORIA")) return "📏";
    if (cat.includes("SSD") || cat.includes("DISCO")) return "💾";
    if (cat.includes("PLACA") || cat.includes("BASE") || cat.includes("MOTHER")) return "🧱";
    if (cat.includes("FUENTE") || cat.includes("PSU")) return "⚡";
    if (cat.includes("CHASIS") || cat.includes("CAJA") || cat.includes("CASE")) return "📦";
    if (cat.includes("MONITOR")) return "🖥️";
    if (cat.includes("TECLADO")) return "⌨️";
    if (cat.includes("RATON") || cat.includes("MOUSE")) return "🖱️";
    return "⚙️";
  };

  const handleGenerar = async (e) => {
    e.preventDefault();
    setErrorServer('');
    const ppto = parseFloat(formData.budget);

    if (formData.mainUse === "GAMING" && ppto < 550) return setErrorServer("Presupuesto insuficiente: Un PC Gaming requiere al menos 550€.");
    if (formData.mainUse === "STREAMING" && ppto < 700) return setErrorServer("Presupuesto insuficiente: Para Streaming y Edición se requieren al menos 700€.");
    if (formData.mainUse === "OFICINA" && ppto < 250) return setErrorServer("Presupuesto insuficiente: El mínimo para oficina son 250€.");

    setLoading(true);
    const int = setInterval(() => setFraseActual(frases[Math.floor(Math.random() * frases.length)]), 1000);

    try {
      const res = await axios.post(`http://localhost:8080/api/components/configurador`, { ...formData, budget: ppto }, { headers: { Authorization: `Bearer ${token}` } });
      setTimeout(() => {
        clearInterval(int);
        setConfiguracion(res.data);
        setLoading(false);
      }, 4000);
    } catch {
      setLoading(false);
      setErrorServer("Error de conexión con la IA. El servidor no pudo procesar la solicitud.");
    }
  };

  const añadirTodo = async () => {
    const idUsuario = localStorage.getItem('userId');
    if (!idUsuario) return setErrorServer("Error de sesión. Por favor, vuelve a entrar.");

    try {
      const piezas = Object.values(configuracion).filter(p => p !== null);
      for (const p of piezas) {
        await axios.post('http://localhost:8080/api/carrito/add', 
          { userId: idUsuario, componentId: p.id, quantity: 1 }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      window.dispatchEvent(new Event('carritoActualizado'));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err) { 
      console.error(err);
      setErrorServer("Error al guardar en el carrito.");
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      
      {showSuccess && (
        <div style={styles.overlay}>
          <div style={styles.successModal}>
            <div style={styles.iconCircle}>✓</div>
            <h2 style={styles.modalTitle}>¡Todo listo!</h2>
            <p style={styles.modalText}>Tu configuración ha sido añadida al carrito correctamente.</p>
          </div>
        </div>
      )}

      <div style={styles.mainContainer}>
        {!loading && !configuracion && (
          <div style={styles.heroSection}>
            <div style={styles.logoBadge}>SI</div>
            <h1 style={styles.heroTitle}>
              PC Configurator <span style={styles.iaBadge}>IA</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Deja que nuestra inteligencia artificial diseñe el equilibrio perfecto para tus necesidades y presupuesto.
            </p>
            
            <div style={styles.formContainer}>
              {errorServer && <div style={styles.errorBanner}>{errorServer}</div>}

              <form onSubmit={handleGenerar} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label htmlFor="budget" style={styles.label}>Presupuesto Máximo (€)</label>
                  <input 
                    type="number" 
                    id="budget"
                    placeholder="Ej. 1200" 
                    onChange={(e)=>setFormData({...formData, budget: e.target.value})} 
                    style={styles.input} 
                    required 
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label htmlFor="mainUse" style={styles.label}>Uso Principal</label>
                  <select 
                    id="mainUse"
                    onChange={(e)=>setFormData({...formData, mainUse: e.target.value})} 
                    style={styles.select}
                  >
                    <option value="GAMING">Gaming & Alto Rendimiento</option>
                    <option value="STREAMING">Streaming & Edición de Video</option>
                    <option value="OFICINA">Oficina & Tareas Básicas</option>
                  </select>
                </div>

                <div style={styles.checkboxGroup}>
                  <div style={styles.checkboxWrapper}>
                    <input 
                      type="checkbox" 
                      id="perif" 
                      checked={formData.includePeripherals} 
                      onChange={(e)=>setFormData({...formData, includePeripherals: e.target.checked})} 
                      style={styles.checkbox}
                    />
                    <label htmlFor="perif" style={styles.checkboxLabel}>Incluir periféricos (Monitor, Teclado, Ratón)</label>
                  </div>
                </div>

                <button type="submit" style={styles.btnPrimaryLarge}>Generar Configuración </button>
              </form>
            </div>
          </div>
        )}

        {loading && (
          <div style={styles.loadingSection}>
            <div className="spinner"></div>
            <div style={styles.loadingTextWrapper}>
              <h3 style={styles.loadingTitle}>SitoIA está trabajando</h3>
              <p style={styles.loadingSubtitle}>{fraseActual}</p>
            </div>
          </div>
        )}

        {configuracion && !loading && (
          <div style={styles.resultsSection}>
            <div style={styles.resultsHeader}>
              <h2 style={styles.resultsTitle}>Tu Configuración Optimizada</h2>
              <div style={styles.totalBadge}>
                Total: <span style={styles.totalAmount}>{Object.values(configuracion).reduce((acc, c) => acc + (c?.price || 0), 0).toFixed(2)} €</span>
              </div>
            </div>
            
            <div style={styles.grid}>
              {Object.entries(configuracion).map(([cat, comp]) => comp && (
                <div key={cat} style={styles.componentCard}>
                  <div style={styles.cardHeader}>
                    <span style={styles.componentIcon}>{obtenerIcono(cat)}</span>
                    <span style={styles.categoryName}>{cat}</span>
                  </div>
                  <h4 style={styles.componentName}>{comp.productName}</h4>
                  <p style={styles.componentPrice}>{comp.price.toFixed(2)} €</p>
                </div>
              ))}
            </div>
            
            <div style={styles.resultsActions}>
              <button onClick={añadirTodo} style={styles.btnSuccessLarge}>🛒 Añadir Todo al Carrito</button>
              <button onClick={() => setConfiguracion(null)} style={styles.btnSecondary}>← Volver a configurar</button>
            </div>
          </div>
        )}
      </div>
      
      {/* Estilos CSS Globales para Spinner y Animaciones */}
      <style>{`
        body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .spinner { width: 60px; height: 60px; border: 5px solid rgba(59, 130, 246, 0.1); border-top: 5px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 30px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes popIn { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

// Objeto de estilos optimizado para una apariencia profesional
const styles = {
  // Base y Layout
  page: { background: '#020617', minHeight: '100vh', color: '#f8fafc' },
  mainContainer: { maxWidth: '1200px', margin: '0 auto', padding: '80px 20px', animation: 'fadeIn 0.5s ease-out' },
  
  // Hero / Form Section
  heroSection: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  logoBadge: { width: '60px', height: '60px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid #3b82f6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '20px' },
  heroTitle: { fontSize: '3rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '15px', marginTop: 0 },
  iaBadge: { background: '#3b82f6', color: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '1rem', verticalAlign: 'middle', marginLeft: '5px' },
  heroSubtitle: { color: '#94a3b8', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 60px', lineHeight: '1.6' },
  
  // Formulario
  formContainer: { width: '100%', maxWidth: '480px', background: '#0f172a', padding: '40px', borderRadius: '24px', border: '1px solid #1e293b', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', textAlign: 'left' },
  form: { display: 'flex', flexDirection: 'column', gap: '25px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  label: { fontSize: '0.9rem', fontWeight: '600', color: '#cbd5e1' },
  input: { padding: '16px', borderRadius: '12px', background: '#020617', border: '1px solid #334155', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' },
  select: { padding: '16px', borderRadius: '12px', background: '#020617', border: '1px solid #334155', color: '#fff', fontSize: '1rem', outline: 'none', cursor: 'pointer', appearance: 'none' },
  
  // Checkbox
  checkboxGroup: { marginTop: '10px' },
  checkboxWrapper: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' },
  checkbox: { width: '20px', height: '20px', accentColor: '#3b82f6', cursor: 'pointer' },
  checkboxLabel: { color: '#94a3b8', fontSize: '0.95rem', cursor: 'pointer' },

  // Botones
  btnPrimaryLarge: { padding: '18px', borderRadius: '14px', background: '#3b82f6', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', border: 'none', transition: 'background 0.2s', marginTop: '10px' },
  btnSuccessLarge: { padding: '20px 40px', background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' },
  btnSecondary: { background: 'none', border: 'none', color: '#64748b', textDecoration: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' },
  btnPrimary: { padding: '12px 24px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },

  // Loading Section
  loadingSection: { textAlign: 'center', marginTop: '100px', animation: 'fadeIn 0.3s ease-out' },
  loadingTextWrapper: { display: 'flex', flexDirection: 'column', gap: '10px' },
  loadingTitle: { fontSize: '1.75rem', fontWeight: '700', margin: 0, color: '#f8fafc' },
  loadingSubtitle: { fontSize: '1.1rem', color: '#3b82f6', fontWeight: '500', margin: 0 },

  // Results Section
  resultsSection: { animation: 'fadeIn 0.5s ease-out' },
  resultsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' },
  resultsTitle: { fontSize: '2.25rem', fontWeight: '800', margin: 0 },
  totalBadge: { color: '#94a3b8', fontSize: '1.1rem', fontWeight: '500' },
  totalAmount: { color: '#10b981', fontWeight: '900', fontSize: '2rem', marginLeft: '10px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
  
  // Component Card
  componentCard: { background: '#0f172a', padding: '25px', borderRadius: '20px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '15px', transition: 'transform 0.2s, box-shadow 0.2s' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid #1e293b' },
  componentIcon: { fontSize: '1.5rem' },
  categoryName: { color: '#3b82f6', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' },
  componentName: { fontSize: '1.1rem', fontWeight: '600', margin: 0, minHeight: '44px', color: '#f8fafc', lineHeight: '1.4' },
  componentPrice: { color: '#10b981', fontWeight: '800', fontSize: '1.3rem', margin: 0, alignSelf: 'flex-end' },
  
  // Acciones Resultados
  resultsActions: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '60px' },

  // Alertas y Modales
  errorBanner: { background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '15px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)', marginBottom: '25px', fontWeight: '600', textAlign: 'center' },
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000, animation: 'fadeIn 0.3s' },
  successModal: { background: '#0f172a', padding: '50px', borderRadius: '28px', border: '2px solid #10b981', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  iconCircle: { width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#10b981', fontSize: '3rem', margin: '0 auto 25px' },
  modalTitle: { fontSize: '2rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 10px 0' },
  modalText: { color: '#94a3b8', fontSize: '1.1rem', margin: 0 },

  // Restricted Access
  restrictedContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' },
  restrictedCard: { background: '#0f172a', padding: '50px', borderRadius: '24px', border: '1px solid #1e293b', textAlign: 'center', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' },
  lockIcon: { fontSize: '4rem', marginBottom: '10px' },
  restrictedTitle: { fontSize: '2rem', fontWeight: '800', margin: 0 },
  restrictedText: { color: '#94a3b8', fontSize: '1.1rem', margin: 0, marginBottom: '10px' }
};

export default Configurador;