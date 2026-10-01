import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, HeartHandshake, ArrowRight, User } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import MoneyText from '../../components/MoneyText';
import { useLanguage } from '../../i18n';

/**
 * WelcomeScreen Component ("Continue as Grace" Opening Screen)
 * Clean UI without emojis.
 */
export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { lang, setLanguage, t } = useLanguage();

  const handleContinue = () => {
    navigate('/dashboard');
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

        {/* Grace Profile Snapshot Card */}
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
                backgroundColor: 'var(--mukuru-orange-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <User size={22} color="var(--mukuru-orange)" />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: '#FFFFFF' }}>Grace M.</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Income R7,500 • Goal: Frosty Fridge</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#CBD5E1' }}>
            <HeartHandshake size={14} color="var(--mukuru-orange)" />
            <span>Family remittances protected as legitimate commitments</span>
          </div>
        </Card>
      </div>

      {/* Action Footer */}
      <div>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleContinue}
          icon={<ArrowRight size={20} />}
          style={{
            boxShadow: 'var(--shadow-orange)',
            fontSize: '1.1rem',
            padding: '16px',
          }}
        >
          {t('common.actions.continueAsGrace', 'Continue as Grace')}
        </Button>
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748B', marginTop: '12px' }}>
          Mukuru Money Coach • SheHacks Challenge B
        </p>
      </div>
    </div>
  );
}
