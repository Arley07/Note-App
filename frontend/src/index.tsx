import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastProvider } from './context/ToastContext'; // Importa el ToastProvider

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Envuelve la aplicación con ToastProvider */}
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación, puedes usar reportWebVitals
reportWebVitals();