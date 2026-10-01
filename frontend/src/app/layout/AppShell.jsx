import React from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

/**
 * Mobile-First & Desktop App Shell Frame Component
 * Owned by Role 4
 */
export default function AppShell({ children, user }) {
  const location = useLocation();
  const isWelcomeScreen = location.pathname === '/';

  return (
    <div className="app-frame">
      {!isWelcomeScreen && <TopBar user={user} />}
      <main
        style={{
          flex: 1,
          padding: isWelcomeScreen ? '0' : '20px 16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {children}
      </main>
      {!isWelcomeScreen && <BottomNav />}
    </div>
  );
}
