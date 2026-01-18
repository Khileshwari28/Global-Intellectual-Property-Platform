import React, { StrictMode } from 'react'; // Ensure React is imported if needed, and StrictMode
import { createRoot } from 'react-dom/client'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.css';
import App from './App.jsx'; 
import "./styles/admin.css";

// 1. IMPORT YOUR GLOBAL STYLES (Use your old index.css or global styles)
// import './index.css'; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);