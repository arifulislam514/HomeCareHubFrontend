import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // 👈 import your provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>   {/* 👈 wrap your app here */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
