import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, HeartHandshake, ArrowRight, User, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useLanguage } from '../../i18n';
import { useUser } from '../../context/UserContext';
import AuthModal from '../auth/AuthModal';

/**
 * WelcomeScreen Component
 * Responsive landing screen for Mukuru Money Coach with instant Sign In, Sign Up, and Dashboard access.
 */
export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { lang, setLanguage, t } = useLanguage();
  const { user, signIn } = useUser();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signup');

  const openAuthModal = (tabName) => {
    setAuthTab(tabName);
    setIsAuthOpen(true);
  };

  const handleContinueToDashboard = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      try {
        signIn({ identifier: 'grace.moyo@mukuru.com', password: 'password123' });
      } catch (err) {
        // ignore error
      }
      navigate('/dashboard');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 20px',
        background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
      }}
    >
      {/* Top Header & Language Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--mukuru-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.2rem',
              color: '#FFFFFF',
            }}
          >
            M
          </div>
          <span style={{ fontFamily: 'var(--font-family-heading)', fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
            MUKURU <span style={{ color: 'var(--mukuru-orange)' }}>MONEY COACH</span>
          </span>
        </div>

        {/* Language selector pill: EN / ZU / SN */}
        <div style={{ display: 'flex', backgroundColor: '#334155', borderRadius: 'var(--radius-full)', padding: '3px' }}>
          <button
            onClick={() => setLanguage('en')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              fontWeight: '700',
              borderRadius: 'var(--radius-full)',
              backgroundColor: lang === 'en' ? 'var(--mukuru-orange)' : 'transparent',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('zu')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              fontWeight: '700',
              borderRadius: 'var(--radius-full)',
              backgroundColor: lang === 'zu' ? 'var(--mukuru-orange)' : 'transparent',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ZU
          </button>
          <button
            onClick={() => setLanguage('sn')}
            style={{
              padding: '4px 8px',
              fontSize: '0.75rem',
              fontWeight: '700',
              borderRadius: 'var(--radius-full)',
              backgroundColor: lang === 'sn' ? 'var(--mukuru-orange)' : 'transparent',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            SN
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div style={{ margin: '24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 85, 0, 0.15)',
            color: 'var(--mukuru-orange-light)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: '600',
            width: 'fit-content',
            border: '1px solid rgba(255, 85, 0, 0.3)',
          }}
        >
          <Sparkles size={16} /> {t('common.tagline', 'Imali Yakho')}
        </div>

        <h1 style={{ fontSize: '2.1rem', lineHeight: '1.2', fontWeight: '800', color: '#FFFFFF' }}>
          Dream → Save → Stretch → Grow
        </h1>

        <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Track spending, protect family support remittances, and reach your financial goals with your AI Money Coach.
        </p>

        {/* User Account Active / Welcome Card */}
        <Card
          style={{
            backgroundColor: 'rgba(30, 41, 59, 0.85)',
            borderColor: 'rgba(255, 85, 0, 0.35)',
            backdropFilter: 'blur(10px)',
            color: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--mukuru-orange)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1.2rem',
              }}
            >
              {user ? (user.avatar || 'M') : <User size={22} />}
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#FFFFFF' }}>
                {user ? (user.fullName || user.name) : 'Welcome to Mukuru'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                {user ? `Signed in as ${user.email || user.phone}` : 'Create a secure account to save towards your goals'}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#CBD5E1' }}>
            <HeartHandshake size={14} color="var(--mukuru-orange)" />
            <span>Family remittances protected as legitimate commitments</span>
          </div>
        </Card>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {!user && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => openAuthModal('signin')}
              icon={<LogIn size={18} />}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                fontWeight: '700',
              }}
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => openAuthModal('signup')}
              icon={<UserPlus size={18} />}
              style={{
                backgroundColor: 'var(--mukuru-orange)',
                color: '#FFFFFF',
                fontWeight: '800',
                boxShadow: 'var(--shadow-orange)',
              }}
            >
              Sign Up
            </Button>
          </div>
        )}

        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleContinueToDashboard}
          icon={<ArrowRight size={20} />}
          style={{
            backgroundColor: 'var(--mukuru-orange)',
            color: '#FFFFFF',
            fontWeight: '800',
            fontSize: '1.05rem',
            padding: '16px',
            boxShadow: '0 8px 25px rgba(255, 85, 0, 0.4)',
            border: 'none',
          }}
        >
          {user ? `Continue to Dashboard (${user.name})` : 'Try Demo Session (Grace Moyo)'}
        </Button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>
          Mukuru Money Coach • SheHacks Challenge B
        </p>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
      />
    </div>
  );
}
