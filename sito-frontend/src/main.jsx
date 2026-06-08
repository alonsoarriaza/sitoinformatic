import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Nota técnica: No incluimos BrowserRouter aquí para evitar duplicidad de contextos

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)