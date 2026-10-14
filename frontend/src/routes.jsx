import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Globe, Settings, ShieldCheck, User, LogOut, ShieldAlert, ArrowLeft } from 'lucide-react';
import WelcomeScreen from './app/welcome/WelcomeScreen';
import DashboardPage from './app/dashboard/DashboardPage';
import Card from './components/Card';
import Button from './components/Button';
import { useMockToggle } from './hooks/useMockToggle';
import { useLanguage } from './i18n';
import { useUser } from './context/UserContext';
import AdminConsolePage from './features/admin/AdminConsolePage';

// Money feature screens
import TransactionsPage  from './features/money/transactions/TransactionsPage';
import CommitmentsPage   from './features/money/commitments/CommitmentsPage';
import GoalsPage         from './features/money/goals/GoalsPage';
import GoalDetailPage    from './features/money/goals/GoalDetailPage';
import CelebrationScreen from './features/money/goals/CelebrationScreen';
import GoalCreatorFlow   from './features/money/goals/creator/GoalCreatorFlow';

// Referral screen
import ReferralPage from './features/referral/ReferralPage';

// Coach & What-If simulator screens
import CoachChatPage    from './features/coach/chat/CoachChatPage';
import SimulatorPage    from './features/coach/simulator/SimulatorPage';
import GroceryWatchPage from './features/coach/tier3/groceries/GroceryWatchPage';
import GrowMyMoneyPage  from './features/coach/tier3/grow/GrowMyMoneyPage';
import WhatsAppMockPage from './features/coach/tier3/whatsapp/WhatsAppMockPage';

/**
 * Access Denied Screen for Non-Admin Users / Customers
 */
function AccessDeniedScreen() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
        minHeight: '60vh',
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
          boxShadow: '0 4px 14px rgba(220, 38, 38, 0.2)',
        }}
      >
        <ShieldAlert size={38} />
      </div>
      <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1E293B', marginBottom: '8px' }}>
        Access Restricted (403 Forbidden)
      </h2>
      <p style={{ color: '#64748B', maxWidth: '440px', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '22px' }}>
        The Mukuru Operations & Admin Console is restricted strictly to authorized system administrators. Customer accounts ({user?.fullName || user?.name || 'Customer'}) do not have access privileges.
      </p>
      <Button
        variant="primary"
        onClick={() => navigate('/dashboard')}
        icon={<ArrowLeft size={16} />}
      >
        Return to My Dashboard
      </Button>
    </div>
  );
}

/**
 * Protected Route Wrapper Component
 * Redirects unauthenticated users to the Home/Welcome screen ('/') if not logged in.
 */
function ProtectedRoute({ children }) {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

/**
 * Admin Route Wrapper Component
 * Restricts access exclusively to authenticated administrators (user.role === 'admin').
 * Standard customers/users are completely blocked with AccessDeniedScreen.
 */
function AdminRoute({ children }) {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (user.role !== 'admin') {
    return <AccessDeniedScreen />;
  }
  return children;
}

/**
 * More / Settings Page
 */
function MorePage() {
  const navigate = useNavigate();
  const { useMocks, toggleMock } = useMockToggle();
  const { lang, setLanguage, t } = useLanguage();
  const { user, signOut } = useUser();

  const handleSignOut = () => {
    signOut();
    navigate('/', { replace: true });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>{t('common.nav.more', 'More & Settings')}</h2>

      {/* User Profile Summary & Sign Out */}
      {user && (
        <Card variant="default">
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={18} color="var(--mukuru-orange)" /> Account Profile
          </h4>
          <div style={{ backgroundColor: 'var(--color-bg)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '12px' }}>
            <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--color-text-primary)' }}>
              {user.fullName || user.name}
            </div>
            {user.email && (
              <div style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                {user.email}
              </div>
            )}
            {user.phone && (
              <div style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {user.phone}
              </div>
            )}
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            fullWidth
            icon={<LogOut size={16} />}
            style={{ color: '#B91C1C', borderColor: '#FCA5A5', backgroundColor: '#FEE2E2' }}
          >
            Sign Out
          </Button>
        </Card>
      )}

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
          <ShieldCheck size={16} color="var(--mukuru-orange)" /> Mukuru Money Coach | SheHacks 
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
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/referral"  element={<ProtectedRoute><ReferralPage /></ProtectedRoute>} />
      <Route path="/more"      element={<ProtectedRoute><MorePage /></ProtectedRoute>} />

      {/* Money feature screens */}
      <Route path="/transactions"          element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
      <Route path="/commitments"           element={<ProtectedRoute><CommitmentsPage /></ProtectedRoute>} />
      <Route path="/goals"                 element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
      <Route path="/goals/new"             element={<ProtectedRoute><GoalCreatorFlow /></ProtectedRoute>} />
      <Route path="/goals/:id"             element={<ProtectedRoute><GoalDetailPage /></ProtectedRoute>} />
      <Route path="/goals/:id/celebrate"   element={<ProtectedRoute><CelebrationScreen /></ProtectedRoute>} />

      {/* Coach, What-If Simulator & Tier 3 screens */}
      <Route path="/simulator" element={<ProtectedRoute><SimulatorPage /></ProtectedRoute>} />
      <Route path="/coach"     element={<ProtectedRoute><CoachChatPage /></ProtectedRoute>} />
      <Route path="/groceries" element={<ProtectedRoute><GroceryWatchPage /></ProtectedRoute>} />
      <Route path="/grow"      element={<ProtectedRoute><GrowMyMoneyPage /></ProtectedRoute>} />
      <Route path="/whatsapp"  element={<ProtectedRoute><WhatsAppMockPage /></ProtectedRoute>} />

      {/* Admin Operations Console (Strictly Restricted to Role: Admin) */}
      <Route path="/admin"     element={<AdminRoute><AdminConsolePage /></AdminRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
