import React from 'react';
import MoneySummaryCard from './MoneySummaryCard';
import CurrentGoalCard from './CurrentGoalCard';
import CoachTipCard from './CoachTipCard';
import NextStepCard from './NextStepCard';
import GroceryAlertCard from './GroceryAlertCard';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import { useApi } from '../../hooks/useApi';
import { useMockToggle } from '../../hooks/useMockToggle';
import { getDashboardData } from '../../api/dashboard';
import { useLanguage } from '../../i18n';
import { useUser } from '../../context/UserContext';

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
    return <LoadingState message={`Loading ${activeUser?.name || 'Grace'}'s Mukuru Dashboard...`} />;
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

  // Use dynamic logged-in user name
  const userName = activeUser?.name || data?.user?.name || 'Grace';
  const summary = activeUser?.income ? {
    income: activeUser.income,
    commitments: activeUser.commitments,
    available: activeUser.available,
    suggestedSaving: activeUser.safeToSave,
    flexibleSavingMax: activeUser.available - activeUser.safeToSave,
  } : data?.summary;

  const currentGoal = activeUser?.goal ? {
    id: 'active-goal',
    title: activeUser.goal,
    name: activeUser.goal,
    targetAmount: 6000,
    currentSaved: 1200,
    percentage: 20,
    remainingAmount: 4800,
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
          {t('dashboard.welcomeTitle', `Good morning, ${userName}`)}
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
