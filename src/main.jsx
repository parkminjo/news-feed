import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/auth/AuthProvider';
import { GlobalStyle } from './styles/GlobalStyle';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GlobalStyle />
      <App />
    </AuthProvider>
  </StrictMode>
);
