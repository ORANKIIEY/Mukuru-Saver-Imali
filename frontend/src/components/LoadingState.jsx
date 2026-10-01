import React from 'react';

/**
 * Shared LoadingState Component for Mukuru UI Kit
 */
export default function LoadingState({ message = 'Loading Mukuru Money Coach...' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: '4px solid var(--mukuru-orange-border)',
          borderTopColor: 'var(--mukuru-orange)',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
        {message}
      </p>
    </div>
  );
}
