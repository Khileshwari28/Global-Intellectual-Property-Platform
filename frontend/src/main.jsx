// vite-temp/src/main.jsx

import React, { StrictMode } from 'react'; // Ensure React is imported if needed, and StrictMode
import { createRoot } from 'react-dom/client'; 

// 1. IMPORT YOUR GLOBAL STYLES (Use your old index.css or global styles)
import './index.css'; 

// 2. IMPORT YOUR RENAMED APP COMPONENT (Must use .jsx extension)
import App from './App.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);