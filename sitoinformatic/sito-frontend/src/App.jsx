import { useState } from 'react'
import axios from 'axios'

function App() {
  // Estos son los "estados" (la memoria de tu web)
  const [budget, setBudget] = useState(1000);
  const [mainUse, setMainUse] = useState('Gaming');
  const [includePeripherals, setIncludePeripherals] = useState(false);
  const [config, setConfig] = useState(null);

  // Esta función se conectará con tu Java mañana
  const handleGenerate = async () => {
  try {
    // 1. Preparamos el JSON exacto que espera Java
    const requestData = {
      budget: parseFloat(budget),
      mainUse: mainUse,
      includePeripherals: includePeripherals,
      priority: "Rendimiento", // Valores por defecto para el TFG
      format: "ATX"
    };

    console.log("Enviando a Java:", requestData);

    // 2. Llamada real al servidor
    const response = await axios.post('http://localhost:8080/api/assistant/build', requestData);

    // 3. Guardamos la respuesta en el estado para que se vea en pantalla
    setConfig(response.data);
    
  } catch (error) {
    console.error("Error conectando con el servidor:", error);
    alert("No se pudo conectar con el servidor Java. ¿Está encendido?");
  }
};

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ color: '#2563eb' }}>🖥️ SitoInformatic Assistant</h1>
      <p>Configura tu PC a medida para tu TFG</p>
      <hr />

      <div style={{ marginTop: '20px' }}>
        <label>Presupuesto (€): </label>
        <input 
          type="number" 
          value={budget} 
          onChange={(e) => setBudget(e.target.value)} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginTop: '15px' }}>
        <label>Uso principal: </label>
        <select value={mainUse} onChange={(e) => setMainUse(e.target.value)} style={{ padding: '8px' }}>
          <option value="Gaming">Gaming</option>
          <option value="Oficina">Oficina</option>
          <option value="Streaming">Streaming</option>
        </select>
      </div>

      <div style={{ marginTop: '15px' }}>
        <input 
          type="checkbox" 
          checked={includePeripherals} 
          onChange={(e) => setIncludePeripherals(e.target.checked)} 
        />
        <label> ¿Incluir monitor, teclado y ratón?</label>
      </div>

      <button 
        onClick={handleGenerate}
        style={{ 
          marginTop: '25px', 
          backgroundColor: '#2563eb', 
          color: 'white', 
          padding: '12px 24px', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Generar Configuración
      </button>

      {/* Aquí mostraremos el JSON que devuelve Java más adelante */}
      {config && (
        <div style={{ marginTop: '20px', background: '#f3f4f6', padding: '15px' }}>
          <h3>Tu configuración:</h3>
          <pre>{JSON.stringify(config, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
