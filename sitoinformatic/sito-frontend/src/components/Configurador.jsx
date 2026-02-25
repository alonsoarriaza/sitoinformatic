import React, { useState } from 'react';
import axios from 'axios';

function Configurador() {
  const [budget, setBudget] = useState(1000);
  const [mainUse, setMainUse] = useState('Gaming');
  const [includePeripherals, setIncludePeripherals] = useState(false);
  const [config, setConfig] = useState(null);
  // NUEVO: Estado para el mensaje de error
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError(null); // Limpiamos errores previos
    setConfig(null); 
    
    try {
      const requestData = {
        budget: parseFloat(budget),
        mainUse: mainUse,
        includePeripherals: includePeripherals,
        priority: "Rendimiento",
        format: "ATX"
      };

      const response = await axios.post('http://localhost:8080/api/assistant/build', requestData);
      setConfig(response.data);
    } catch (err) {
      console.error("Fallo al conectar:", err);
      // Capturamos el mensaje exacto de tu validación en Java
      const mensajeError = err.response?.data?.message || err.response?.data || "Error de conexión con el servidor";
      setError(mensajeError);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#1e293b' }}>🛠️ Asistente de Configuración</h2>
      
      <form onSubmit={handleGenerate} style={{ 
        background: '#f8fafc', 
        padding: '25px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
      }}>
        {/* ... (inputs de presupuesto y uso se mantienen igual) ... */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Presupuesto Máximo (€):</label>
          <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Uso del Sistema:</label>
          <select value={mainUse} onChange={(e) => setMainUse(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <option value="Gaming">Gaming</option>
            <option value="Oficina">Oficina</option>
            <option value="Streaming">Streaming / Edición</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="checkbox" id="perifericos" checked={includePeripherals} onChange={(e) => setIncludePeripherals(e.target.checked)} />
          <label htmlFor="perifericos">Incluir Periféricos</label>
        </div>

        {/* --- MENSAJE DE ERROR ESTILIZADO --- */}
        {error && (
          <div style={{ 
            backgroundColor: '#fff7ed', 
            color: '#c2410c', 
            padding: '12px', 
            borderRadius: '8px', 
            border: '1px solid #fdba74',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            <span>⚠️</span> {error}
          </div>
        )}

        <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
          Generar Configuración Optimizada
        </button>
      </form>

      {/* ... (renderizado de config se mantiene igual) ... */}
    </div>
  );
}

export default Configurador;