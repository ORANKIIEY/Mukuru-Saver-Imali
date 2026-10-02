import React from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import SideNav from './SideNav';
import BottomNav from './BottomNav';

/**
 * Responsive App Shell — web sidebar on desktop, bottom nav on mobile.
 */
export default function AppShell({ children }) {
  const location = useLocation();
  const isWelcomeScreen = location.pathname === '/';

  return (
    <div className="app-frame">
      {!isWelcomeScreen && <TopBar />}

      {isWelcomeScreen ? (
        <main style={{ flex: 1 }}>
          {children}
        </main>
      ) : (
        <>
          <div className="app-body">
            <SideNav />
            <main className="app-main">
              {children}
            </main>
          </div>
          <BottomNav />
        </>
      )}
    </div>
  );
}
