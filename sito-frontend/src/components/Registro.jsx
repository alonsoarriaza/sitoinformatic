import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [enviando, setEnviando] = useState(false);

  const handleFinalizarRegistro = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje({ texto: "Procesando tu solicitud...", tipo: "info" });

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", formData);
      
      // Si el servidor responde con 200 o 201, es un éxito total
      if (res.status === 200 || res.status === 201) {
        setMensaje({ texto: "¡Cuenta creada con éxito! Bienvenido a SitoInformatic.", tipo: "success" });
        
        // Esperamos un poco para que el usuario lea el mensaje de éxito antes de redirigir
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch (err) {
      // Solo mostramos error si realmente ha fallado (ej: email duplicado)
      const errorMsg = err.response?.data?.message || "Error al crear la cuenta. Inténtalo de nuevo.";
      setMensaje({ texto: errorMsg, tipo: "error" });
      setEnviando(false);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.formWrapper}>
        <div style={styles.card}>
          <div style={styles.iconHeader}>✨</div>
          <h1 style={styles.title}>Crea tu cuenta</h1>
          <p style={styles.subtitle}>Únete a la comunidad de SitoInformatic para gestionar tus configuraciones IA.</p>

          {mensaje.texto && (
            <div style={{
              ...styles.msg, 
              backgroundColor: mensaje.tipo === 'success' ? 'rgba(16, 185, 129, 0.2)' : mensaje.tipo === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)',
              color: mensaje.tipo === 'success' ? '#10b981' : mensaje.tipo === 'error' ? '#f87171' : '#60a5fa',
              border: `1px solid ${mensaje.tipo === 'success' ? '#10b981' : mensaje.tipo === 'error' ? '#ef4444' : '#3b82f6'}`
            }}>
              {mensaje.texto}
            </div>
          )}

          <form style={styles.form} onSubmit={handleFinalizarRegistro}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nombre de Usuario</label>
              <input 
                type="text" 
                placeholder="Tu nombre o alias" 
                style={styles.input} 
                required 
                onChange={(e) => setFormData({...formData, username: e.target.value})} 
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Correo Electrónico</label>
              <input 
                type="email" 
                placeholder="ejemplo@sito.com" 
                style={styles.input} 
                required 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Contraseña</label>
              <input 
                type="password" 
                placeholder="Mínimo 8 caracteres" 
                style={styles.input} 
                required 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
            </div>
            
            <button 
                type="submit" 
                disabled={enviando}
                style={{
                    ...styles.submitBtn,
                    background: enviando ? '#1e293b' : '#3b82f6',
                    cursor: enviando ? 'not-allowed' : 'pointer'
                }}
            >
              {enviando ? "Creando cuenta..." : "Finalizar Registro"}
            </button>
          </form>
          
          <p style={styles.footerText}>
            ¿Ya tienes cuenta? <span style={styles.link} onClick={() => navigate("/login")}>Inicia sesión aquí</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: "#020617", minHeight: "100vh", color: "#f8fafc", fontFamily: "'Inter', sans-serif" },
  formWrapper: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px" },
  card: { 
    backgroundColor: "#0f172a", 
    padding: "50px 40px", 
    borderRadius: "32px", 
    width: "100%", 
    maxWidth: "460px", 
    border: "1px solid #1e293b",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
  },
  iconHeader: { fontSize: "3rem", marginBottom: "20px", textAlign: "center" },
  title: { fontSize: "2.2rem", fontWeight: "800", marginBottom: "10px", textAlign: "center", letterSpacing: "-1px" },
  subtitle: { color: "#94a3b8", textAlign: "center", marginBottom: "35px", fontSize: "1rem", lineHeight: "1.5" },
  msg: { padding: '16px', borderRadius: '12px', marginBottom: '25px', textAlign: 'center', fontSize: '0.95rem', fontWeight: '600' },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "10px" },
  label: { fontSize: "0.85rem", color: "#cbd5e1", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" },
  input: { padding: "16px", borderRadius: "14px", backgroundColor: "#020617", border: "1px solid #334155", color: "#ffffff", outline: "none", fontSize: "1rem", transition: "0.3s" },
  submitBtn: { padding: "18px", color: "white", border: "none", borderRadius: "14px", fontWeight: "800", fontSize: "1.1rem", marginTop: "10px", transition: "0.3s", boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)" },
  footerText: { textAlign: "center", marginTop: "30px", color: "#94a3b8", fontSize: "0.95rem" },
  link: { color: "#3b82f6", cursor: "pointer", fontWeight: "700", textDecoration: "underline" }
};

export default Registro;