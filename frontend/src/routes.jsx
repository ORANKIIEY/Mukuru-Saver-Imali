import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Construction, Globe, Settings } from 'lucide-react';
import WelcomeScreen from './app/welcome/WelcomeScreen';
import DashboardPage from './app/dashboard/DashboardPage';
import Card from './components/Card';
import Button from './components/Button';
import { useMockToggle } from './hooks/useMockToggle';
import { useLanguage } from './i18n';

// Role 5 — Money screens
import TransactionsPage  from './features/money/transactions/TransactionsPage';
import CommitmentsPage   from './features/money/commitments/CommitmentsPage';
import GoalsPage         from './features/money/goals/GoalsPage';
import GoalDetailPage    from './features/money/goals/GoalDetailPage';
import CelebrationScreen from './features/money/goals/CelebrationScreen';
import GoalCreatorFlow   from './features/money/goals/creator/GoalCreatorFlow';

// Role 6 — Coach & what-if UI
import CoachChatPage    from './features/coach/chat/CoachChatPage';
import SimulatorPage    from './features/coach/simulator/SimulatorPage';
import GroceryWatchPage from './features/coach/tier3/groceries/GroceryWatchPage';
import GrowMyMoneyPage  from './features/coach/tier3/grow/GrowMyMoneyPage';
import WhatsAppMockPage from './features/coach/tier3/whatsapp/WhatsAppMockPage';

/**
 * Placeholder component for routes owned by Roles 5 & 6 until they plug in their screens.
 */
function RolePlaceholder({ role, screenName }) {
  return (
    <Card variant="subtle" style={{ textAlign: 'center', padding: '32px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', color: 'var(--mukuru-orange)' }}>
        <Construction size={36} />
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>
        {screenName} ({role})
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
        This feature module is owned by {role}. The route structure is prepared by Role 4.
      </p>
    </Card>
  );
}

/**
 * More / Settings Page (Role 4)
 */
function MorePage() {
  const { useMocks, toggleMock } = useMockToggle();
  const { lang, setLanguage, t } = useLanguage();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>{t('common.nav.more', 'More & Settings')}</h2>

      {/* Language Preference Card */}
      <Card variant="default">
        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Globe size={18} color="var(--mukuru-orange)" /> {t('common.language.switch', 'Language Preference')}
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          <Button
            variant={lang === 'en' ? 'primary' : 'outline'}
            onClick={() => setLanguage('en')}
            fullWidth
            size="sm"
          >
            English (EN)
          </Button>
          <Button
            variant={lang === 'zu' ? 'primary' : 'outline'}
            onClick={() => setLanguage('zu')}
            fullWidth
            size="sm"
          >
            isiZulu (ZU)
          </Button>
          <Button
            variant={lang === 'sn' ? 'primary' : 'outline'}
            onClick={() => setLanguage('sn')}
            fullWidth
            size="sm"
          >
            chiShona (SN)
          </Button>
        </div>
      </Card>

      {/* Mock Toggle Card for Team Demo */}
      <Card variant="default">
        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Settings size={18} color="var(--mukuru-orange)" /> {t('common.mockMode.toggle', 'Data Source Mode')}
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
          Currently using: <strong>{useMocks ? 'Local JSON Mocks' : 'Live Backend API'}</strong>
        </p>
        <Button
          variant={useMocks ? 'secondary' : 'primary'}
          onClick={toggleMock}
          fullWidth
        >
          Switch to {useMocks ? 'Live Backend API' : 'Local JSON Mocks'}
        </Button>
      </Card>

      {/* Role 4 System Info */}
      <Card variant="subtle">
        <h4 style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
          Mukuru Money Coach Architecture
        </h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          Frontend Role 4: App Shell, Dashboard, UI Kit, i18n & API Client setup.
        </p>
      </Card>
    </div>
  );
}

/**
 * App Routes Definition (Role 4 owned)
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Role 4 Routes */}
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/more" element={<MorePage />} />

      {/* ROLE 5 ROUTES (Money screens & Celebration) */}
      <Route path="/transactions"          element={<TransactionsPage />} />
      <Route path="/commitments"           element={<CommitmentsPage />} />
      <Route path="/goals"                 element={<GoalsPage />} />
      <Route path="/goals/new"             element={<GoalCreatorFlow />} />
      <Route path="/goals/:id"             element={<GoalDetailPage />} />
      <Route path="/goals/:id/celebrate"   element={<CelebrationScreen />} />

      {/* ROLE 6 ROUTES (Coach, What-If UI & Tier 3) */}
      <Route path="/simulator" element={<SimulatorPage />} />
      <Route path="/coach"     element={<CoachChatPage />} />
      <Route path="/groceries" element={<GroceryWatchPage />} />
      <Route path="/grow"      element={<GrowMyMoneyPage />} />
      <Route path="/whatsapp"  element={<WhatsAppMockPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
