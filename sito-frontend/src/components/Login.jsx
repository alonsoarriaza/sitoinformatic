import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [usuarioNombre, setUsuarioNombre] = useState(''); // Estado para el nombre en el saludo
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', loginData);
      
      const tokenRecibido = res.data.token;
      localStorage.setItem('token', tokenRecibido);

      try {
        const base64Url = tokenRecibido.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        const idExtraido = payload.id;
        localStorage.setItem('userId', idExtraido);
        localStorage.setItem('id', idExtraido);

        const emailExtraido = payload.sub || res.data.email;
        if (emailExtraido) {
          localStorage.setItem('user', emailExtraido);
          setUsuarioNombre(emailExtraido.split('@')[0]); // Sacamos el nombre antes del @
        }
      } catch (errToken) {
        console.error("Error al procesar el token", errToken);
      }

      setExito(true);
      // Notificamos a otros componentes que la sesión ha cambiado
      window.dispatchEvent(new Event('carritoActualizado'));
      
      setTimeout(() => navigate('/'), 2500);
    } catch (err) {
      setError("Credenciales incorrectas o usuario no registrado.");
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        {exito ? (
          /* PANTALLA DE ÉXITO ESTILO PREMIUM */
          <div style={styles.successWrapper}>
            <div style={styles.successCard}>
              <div style={styles.iconCircle}>
                <span style={{fontSize: '3.5rem'}}>👋</span>
              </div>
              <h2 style={styles.welcomeTitle}>¡Bienvenido, {usuarioNombre}!</h2>
              <p style={styles.successSubtitle}>Has iniciado sesión correctamente en SitoInformatic.</p>
              
              <div style={styles.loaderContainer}>
                <div style={styles.loaderBar}></div>
              </div>
              <p style={styles.redirectText}>Preparando tu catálogo personalizado...</p>
            </div>
          </div>
        ) : (
          /* FORMULARIO DE LOGIN */
          <div style={styles.card}>
            <div style={styles.logoBadge}>SI</div>
            <h2 style={styles.title}>Iniciar Sesión</h2>
            <p style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '25px'}}>Accede a tu configurador con IA</p>
            
            {error && <div style={styles.errorBox}>{error}</div>}
            
            <form onSubmit={handleLogin} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Correo Electrónico</label>
                <input type="email" placeholder="ejemplo@sito.com" onChange={(e)=>setLoginData({...loginData, email: e.target.value})} style={styles.input} required />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Contraseña</label>
                <input type="password" placeholder="••••••••" onChange={(e)=>setLoginData({...loginData, password: e.target.value})} style={styles.input} required />
              </div>
              
              <button type="submit" style={styles.button}>Entrar al Sistema</button>
            </form>
          </div>
        )}
      </div>
      
      {/* Animaciones CSS */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: { background: '#020617', minHeight: '100vh', fontFamily: "'Inter', sans-serif" },
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' },
  
  // ESTILOS DEL FORMULARIO
  card: { background: '#0f172a', padding: '45px 40px', borderRadius: '28px', border: '1px solid #1e293b', textAlign: 'center', width: '100%', maxWidth: '380px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' },
  logoBadge: { width: '50px', height: '50px', background: 'rgba(59, 130, 246, 0.1)', border: '2px solid #3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', fontWeight: 'bold', margin: '0 auto 20px' },
  title: { color: 'white', fontSize: '1.8rem', fontWeight: '800', margin: '0 0 5px 0' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { padding: '14px', borderRadius: '12px', background: '#020617', color: 'white', border: '1px solid #334155', outline: 'none', transition: '0.3s' },
  button: { padding: '16px', borderRadius: '12px', background: '#3b82f6', color: 'white', fontWeight: '900', cursor: 'pointer', border: 'none', marginTop: '10px', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' },
  errorBox: { background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '12px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '20px', fontSize: '0.9rem' },

  // ESTILOS DE ÉXITO (MODERNO)
  successWrapper: { animation: 'slideUp 0.5s ease-out' },
  successCard: { 
    background: 'linear-gradient(145deg, #0f172a 0%, #020617 100%)', 
    padding: '60px 50px', 
    borderRadius: '35px', 
    border: '2px solid #10b981', 
    textAlign: 'center', 
    width: '450px',
    boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)'
  },
  iconCircle: { width: '100px', height: '100px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', border: '2px solid #10b981' },
  welcomeTitle: { color: 'white', fontSize: '2.2rem', fontWeight: '900', margin: '0 0 10px 0' },
  successSubtitle: { color: '#94a3b8', fontSize: '1.1rem', marginBottom: '35px', lineHeight: '1.5' },
  loaderContainer: { width: '100%', height: '6px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden', marginBottom: '15px' },
  loaderBar: { height: '100%', background: '#10b981', width: '0%', animation: 'loading 2.5s linear forwards' },
  redirectText: { color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }
};

export default Login;