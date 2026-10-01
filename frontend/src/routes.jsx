import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Globe, Settings, ShieldCheck } from 'lucide-react';
import WelcomeScreen from './app/welcome/WelcomeScreen';
import DashboardPage from './app/dashboard/DashboardPage';
import Card from './components/Card';
import Button from './components/Button';
import { useMockToggle } from './hooks/useMockToggle';
import { useLanguage } from './i18n';

// Money feature screens
import TransactionsPage  from './features/money/transactions/TransactionsPage';
import CommitmentsPage   from './features/money/commitments/CommitmentsPage';
import GoalsPage         from './features/money/goals/GoalsPage';
import GoalDetailPage    from './features/money/goals/GoalDetailPage';
import CelebrationScreen from './features/money/goals/CelebrationScreen';
import GoalCreatorFlow   from './features/money/goals/creator/GoalCreatorFlow';

// Coach & What-If simulator screens
import CoachChatPage    from './features/coach/chat/CoachChatPage';
import SimulatorPage    from './features/coach/simulator/SimulatorPage';
import GroceryWatchPage from './features/coach/tier3/groceries/GroceryWatchPage';
import GrowMyMoneyPage  from './features/coach/tier3/grow/GrowMyMoneyPage';
import WhatsAppMockPage from './features/coach/tier3/whatsapp/WhatsAppMockPage';

/**
 * More / Settings Page
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

      {/* Mock Toggle Card for Demo */}
      <Card variant="default">
        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Settings size={18} color="var(--mukuru-orange)" /> {t('common.mockMode.toggle', 'Data Source Mode')}
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
          Currently using: <strong>{useMocks ? 'Local Demo Engine' : 'Live Backend API'}</strong>
        </p>
        <Button
          variant={useMocks ? 'secondary' : 'primary'}
          onClick={toggleMock}
          fullWidth
        >
          Switch to {useMocks ? 'Live Backend API' : 'Local Demo Engine'}
        </Button>
      </Card>

      {/* System Information Card */}
      <Card variant="subtle">
        <h4 style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--color-text-secondary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={16} color="var(--mukuru-orange)" /> Mukuru Money Coach | SheHacks Challenge B
        </h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
          Empowering emerging consumers with transaction categorisation, safe-to-save guidance, goal tracking, and AI coaching.
        </p>
      </Card>
    </div>
  );
}

/**
 * App Routes Definition
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/more" element={<MorePage />} />

      {/* Money feature screens */}
      <Route path="/transactions"          element={<TransactionsPage />} />
      <Route path="/commitments"           element={<CommitmentsPage />} />
      <Route path="/goals"                 element={<GoalsPage />} />
      <Route path="/goals/new"             element={<GoalCreatorFlow />} />
      <Route path="/goals/:id"             element={<GoalDetailPage />} />
      <Route path="/goals/:id/celebrate"   element={<CelebrationScreen />} />

      {/* Coach, What-If Simulator & Tier 3 screens */}
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
