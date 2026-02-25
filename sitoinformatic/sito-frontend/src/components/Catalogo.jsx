import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Catalogo() {
  // Estado para almacenar los productos que traigamos del servidor
  const [productos, setProductos] = useState([]);

  // Hook para ejecutar la carga de datos al iniciar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      // Llamada al endpoint de Java para obtener todos los componentes
      const response = await axios.get('http://localhost:8080/api/components');
      // Actualización del estado con el array de objetos recibidos
      setProductos(response.data);
    } catch (error) {
      console.error("Error al recuperar el catálogo:", error);
      // Datos de respaldo para pruebas locales si falla el servidor
      setProductos([
        { id: 1, nombre: "Gráfica de prueba", precio: 500 },
        { id: 2, nombre: "CPU de prueba", precio: 300 }
      ]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Catálogo Principal</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Renderizado dinámico de la lista de productos */}
        {productos.map(prod => (
          <div key={prod.id} style={{ 
            border: '1px solid #ccc', 
            padding: '15px', 
            borderRadius: '8px', 
            width: '220px',
            textAlign: 'center'
          }}>
            <div style={{ height: '150px', background: '#eee', marginBottom: '10px' }}>
              {/* Espacio para la imagen del componente */}
              IMG
            </div>
            <h4>{prod.nombre}</h4>
            <p style={{ fontWeight: 'bold' }}>{prod.precio}€</p>
            <button style={{ 
              cursor: 'pointer', 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '8px', 
              borderRadius: '4px' 
            }}>
              Añadir al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;