import React, { useState } from 'react';
import axios from 'axios';

function Configurador() {
  // Estados para controlar el formulario y la respuesta de Java
  const [budget, setBudget] = useState(1000);
  const [mainUse, setMainUse] = useState('Gaming');
  const [config, setConfig] = useState(null);

  // Función para disparar la petición al backend
  const handleGenerate = async (e) => {
    e.preventDefault(); // Evito que la página se refresque al dar al botón
    
    try {
      // Ajusto los datos al formato que espera mi Controller en Spring Boot
      const requestData = {
        budget: parseFloat(budget),
        mainUse: mainUse,
        priority: "Rendimiento",
        format: "ATX"
      };

      // Lanzo el POST.
      const response = await axios.post('http://localhost:8080/api/assistant/build', requestData);
      
      // Si todo va bien, guardo la lista de piezas en el estado
      setConfig(response.data);
      
    } catch (error) {
      console.error("Fallo al conectar con la API de Java:", error);
      alert("Error: Revisa que el Backend esté corriendo en el 8080");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Asistente Inteligente</h2>
      <form onSubmit={handleGenerate}>
        <label>Presupuesto: </label>
        <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
        
        <label> Uso: </label>
        <select value={mainUse} onChange={(e) => setMainUse(e.target.value)}>
          <option value="Gaming">Gaming</option>
          <option value="Oficina">Oficina</option>
        </select>
        
        <button type="submit">Generar PC</button>
      </form>

      {/* Si config tiene datos, pinto el resultado en un bloque de código */}
      {config && (
        <div style={{ marginTop: '20px', background: '#f0f0f0', padding: '10px' }}>
          <h3>Resultado del servidor:</h3>
          <pre>{JSON.stringify(config, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Configurador;