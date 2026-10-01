import React from 'react';
import { AlertTriangle, RefreshCw, Database } from 'lucide-react';
import Button from './Button';
import { useMockToggle } from '../hooks/useMockToggle';

/**
 * Shared ErrorState Component for Mukuru UI Kit
 * Displays friendly error message when backend is offline and offers Retry / Switch to Mocks options.
 */
export default function ErrorState({
  title = 'Dashboard Unavailable',
  message = 'Unable to connect to Mukuru live backend servers. Please ensure backend is running or switch to Mock Mode.',
  onRetry,
}) {
  const { toggleMock } = useMockToggle();

  const handleEnableMocks = () => {
    localStorage.setItem('mukuru_use_mocks', 'true');
    window.location.reload();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        textAlign: 'center',
        backgroundColor: 'var(--color-danger-bg)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid #FCA5A5',
        gap: '14px',
        margin: '16px 0',
      }}
      className="animate-fade-in"
    >
      <AlertTriangle size={40} color="#991B1B" />
      <h3 style={{ color: '#991B1B', fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>{title}</h3>
      <p style={{ color: '#7F1D1D', fontSize: '0.875rem', maxWidth: '360px', lineHeight: '1.5' }}>{message}</p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} icon={<RefreshCw size={14} />} style={{ borderColor: '#991B1B', color: '#991B1B' }}>
            Try Again
          </Button>
        )}

        <Button variant="primary" size="sm" onClick={handleEnableMocks} icon={<Database size={14} />}>
          Switch to Mock Mode
        </Button>
      </div>
    </div>
  );
}
