import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './i18n';
import { UserProvider } from './context/UserContext';
import AppShell from './app/layout/AppShell';
import AppRoutes from './routes';
import './styles/global.css';

/**
 * Root App Component
 */
export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <BrowserRouter>
          <AppShell>
            <AppRoutes />
          </AppShell>
        </BrowserRouter>
      </UserProvider>
    </LanguageProvider>
  );
}
