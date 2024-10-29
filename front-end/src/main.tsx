import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Background from './components/Background/Background';
import UserProvider from './UserContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <Background />
      <App />
    </UserProvider>
  </StrictMode>
);
