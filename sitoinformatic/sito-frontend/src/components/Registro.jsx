import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthdate: '',
    rol: 'ROLE_USER' // Coincide con tu lógica de GrantedAuthority
  });
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    try {
      // Llamada a tu AuthController ya creado
      await axios.post('http://localhost:8080/api/auth/register', formData);
      
      setMensaje({ texto: '✨ ¡Cuenta creada! Redirigiendo al login...', tipo: 'exito' });
      
      // Esperamos un poco para que el usuario vea el mensaje y redirigimos
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data || "Error al registrar usuario";
      setMensaje({ texto: errorMsg, tipo: 'error' });
    }
  };

  return (
    <div style={{ padding: '60px 20px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '450px', 
        background: '#ffffff', 
        padding: '40px', 
        borderRadius: '15px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ textAlign: 'center', color: '#000000', marginBottom: '30px', fontSize: '2rem' }}>SitoInformatic</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '30px' }}>Crea tu cuenta para guardar tus configuraciones</p>

        {mensaje.texto && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '0.9rem',
            backgroundColor: mensaje.tipo === 'error' ? '#fef2f2' : '#f0fdf4',
            color: mensaje.tipo === 'error' ? '#dc2626' : '#16a34a',
            border: `1px solid ${mensaje.tipo === 'error' ? '#fecaca' : '#bbf7d0'}`
          }}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={groupStyle}>
            <label style={labelStyle}>Nombre Completo</label>
            <input type="text" name="name" required onChange={handleChange} style={inputStyle} placeholder="Tu nombre" />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Email</label>
            <input type="email" name="email" required onChange={handleChange} style={inputStyle} placeholder="ejemplo@correo.com" />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Contraseña</label>
            <input type="password" name="password" required onChange={handleChange} style={inputStyle} placeholder="••••••••" />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Fecha de Nacimiento</label>
            <input type="date" name="birthdate" required onChange={handleChange} style={inputStyle} />
          </div>

          <button type="submit" style={{ 
            width: '100%', 
            padding: '14px', 
            backgroundColor: '#000000', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}>
            Registrarse ahora
          </button>
        </form>
      </div>
    </div>
  );
}

// Estilos rápidos para mantener el archivo limpio
const groupStyle = { marginBottom: '20px' };
const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#334155' };
const inputStyle = { 
  width: '100%', 
  padding: '12px', 
  borderRadius: '8px', 
  border: '1px solid #cbd5e1', 
  fontSize: '1rem', 
  boxSizing: 'border-box' 
};

export default Registro;