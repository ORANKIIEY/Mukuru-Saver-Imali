import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Download, Smartphone, Share2 } from 'lucide-react';
import Button from './Button';

export default function ProjectQrCodeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const targetUrl = window.location.origin || 'https://mukuru-app.onrender.com';
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(targetUrl)}&color=EB6619&bgcolor=FFFFFF`;

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = 'Mukuru-Money-Coach-QR.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px',
      }}
      className="animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '380px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--mukuru-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <QrCode size={18} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', margin: 0 }}>Project QR Code</h3>
              <p style={{ fontSize: '0.725rem', color: '#94A3B8', margin: 0 }}>Scan to launch Mukuru Money Coach</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close QR Modal"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* QR Body */}
        <div style={{ padding: '24px 20px', textAlign: 'center' }}>
          {/* Frame & QR Image */}
          <div
            style={{
              display: 'inline-block',
              padding: '16px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--mukuru-orange-border)',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '16px',
            }}
          >
            <img
              src={qrImageUrl}
              alt="Mukuru Money Coach Project QR Code"
              style={{ width: '190px', height: '190px', display: 'block', borderRadius: '8px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
            <Smartphone size={16} color="var(--mukuru-orange)" />
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-text-primary)' }}>
              Open Phone Camera or WhatsApp to Scan
            </span>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: '1.45', marginBottom: '20px' }}>
            Point your mobile camera at this QR code to immediately access Mukuru Money Coach on your smartphone.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleCopyLink}
              icon={copied ? <Check size={16} /> : <Copy size={16} />}
              style={{ backgroundColor: copied ? '#10B981' : 'var(--mukuru-orange)', color: '#FFFFFF' }}
            >
              {copied ? 'Link Copied to Clipboard!' : 'Copy Project Web Link'}
            </Button>

            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={handleDownloadQr}
              icon={<Download size={16} />}
            >
              Download QR Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
