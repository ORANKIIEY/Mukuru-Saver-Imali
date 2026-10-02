import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoneySummaryCard from './MoneySummaryCard';
import CurrentGoalCard from './CurrentGoalCard';
import CoachTipCard from './CoachTipCard';
import NextStepCard from './NextStepCard';
import GroceryAlertCard from './GroceryAlertCard';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useApi } from '../../hooks/useApi';
import { useMockToggle } from '../../hooks/useMockToggle';
import { getDashboardData } from '../../api/dashboard';
import { useLanguage } from '../../i18n';
import { useUser } from '../../context/UserContext';
import { Gift, Copy, Check, Share2 } from 'lucide-react';

/**
 * Referral Program Widget Component
 */
function ReferralCard({ user }) {
  const [copied, setCopied] = useState(false);
  const referralCode = user?.referralCode || `MUKURU-${(user?.name || 'SAVER').toUpperCase()}-2026`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      style={{
        background: 'linear-gradient(135deg, #FFF5F0 0%, #FFFFFF 100%)',
        border: '1.5px solid var(--mukuru-orange-border)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              backgroundColor: 'var(--mukuru-orange)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Gift size={14} />
          </span>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--color-text-primary)' }}>
            Invite Friends & Earn R50
          </h4>
        </div>
        {user?.bonusBalance > 0 && (
          <span style={{ fontSize: '0.7rem', color: '#065F46', backgroundColor: '#D1FAE5', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>
            +R{user.bonusBalance} Bonus Active
          </span>
        )}
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '10px', lineHeight: '1.4' }}>
        Share your unique code with family & friends. When they register, you both get a <strong>R50 savings reward</strong>!
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            flex: 1,
            padding: '8px 12px',
            backgroundColor: '#FFFFFF',
            border: '1px dashed var(--mukuru-orange)',
            borderRadius: 'var(--radius-md)',
            fontWeight: '800',
            fontSize: '0.875rem',
            color: 'var(--mukuru-orange-dark)',
            textAlign: 'center',
            letterSpacing: '0.05em',
          }}
        >
          {referralCode}
        </div>
        <Button
          variant={copied ? 'secondary' : 'primary'}
          size="sm"
          onClick={handleCopy}
          icon={copied ? <Check size={14} /> : <Copy size={14} />}
          style={{ backgroundColor: copied ? '#10B981' : 'var(--mukuru-orange)', color: '#FFFFFF' }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Link to="/referral">
          <Button
            variant="outline"
            size="sm"
            icon={<Share2 size={14} />}
          >
            Socials
          </Button>
        </Link>
      </div>
    </Card>
  );
}

/**
 * DashboardPage Component
 * Primary Responsive Dashboard Screen for Mukuru Money Coach.
 */
export default function DashboardPage() {
  const { t } = useLanguage();
  const { user: activeUser } = useUser();
  const { useMocks } = useMockToggle();
  const { data, loading, error, refetch } = useApi(getDashboardData, [useMocks]);

  if (loading) {
    return <LoadingState message={`Loading ${activeUser?.name || 'User'}'s Mukuru Dashboard...`} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Dashboard Unavailable"
        message={error}
        onRetry={refetch}
      />
    );
  }

  // Use dynamic logged-in user details
  const userName = activeUser?.name || data?.user?.name || 'User';
  const summary = activeUser?.income ? {
    income: activeUser.income,
    commitments: activeUser.commitments,
    available: activeUser.available,
    suggestedSaving: activeUser.safeToSave,
    flexibleSavingMax: activeUser.available - activeUser.safeToSave,
  } : data?.summary;

  const currentGoal = activeUser?.goal ? {
    id: 'active-goal',
    title: typeof activeUser.goal === 'string' ? activeUser.goal : `${userName}'s Savings Goal`,
    name: typeof activeUser.goal === 'string' ? activeUser.goal : `${userName}'s Savings Goal`,
    targetAmount: 6000,
    currentSaved: activeUser.bonusBalance ? 1200 + activeUser.bonusBalance : 1200,
    percentage: activeUser.bonusBalance ? 22 : 20,
    remainingAmount: activeUser.bonusBalance ? 4750 : 4800,
    targetDate: '2026-12-15',
    status: 'in_progress',
  } : data?.currentGoal;

  const coachTip = data?.coachTip;
  const nextStep = data?.nextStep;
  const groceryAlert = data?.groceryAlert;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      {/* Subheader Greeting */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-text-primary)' }}>
          {t('dashboard.welcomeTitle', { name: userName, defaultValue: `Good morning, ${userName}` })}
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          {t('dashboard.welcomeSubtitle', 'Here is your Mukuru money summary for today.')}
        </p>
      </div>

      {/* Responsive Grid Layout for Desktop & Mobile */}
      <div className="dashboard-grid">
        {/* Main Column */}
        <div className="dashboard-col-main">
          {/* Money Summary Card */}
          <MoneySummaryCard summary={summary} />

          {/* Current Goal Card */}
          <CurrentGoalCard goal={currentGoal} />

          {/* Referral Card */}
          <ReferralCard user={activeUser} />
        </div>

        {/* Side Column */}
        <div className="dashboard-col-side">
          {/* Coach Tip Card */}
          <CoachTipCard tip={coachTip} />

          {/* Next Step Card */}
          <NextStepCard nextStep={nextStep} />

          {/* Grocery Price Alert */}
          <GroceryAlertCard alert={groceryAlert} />
        </div>
      </div>
    </div>
  );
}
