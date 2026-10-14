import React, { useState } from 'react';
import { Target, ShieldCheck, ShoppingBag, Calendar } from 'lucide-react';
import Card from '../../components/Card';
import MoneyText from '../../components/MoneyText';
import { useLanguage } from '../../i18n';

const DEFAULT_GOALS = [
  {
    id: 1,
    key: 'frostyFridge',
    name: 'Frosty Fridge',
    category: 'need', // "need" vs "want"
    targetAmount: 6000,
    savedAmount: 1200,
    targetDate: '2026-12-15',
  },
  {
    id: 2,
    key: 'emergencyBuffer',
    name: 'Emergency Buffer Fund',
    category: 'need',
    targetAmount: 3000,
    savedAmount: 1800,
    targetDate: '2026-11-30',
  },
  {
    id: 3,
    key: 'holidayVisit',
    name: 'Holiday Home Visit',
    category: 'want',
    targetAmount: 2500,
    savedAmount: 500,
    targetDate: '2026-12-24',
  },
  {
    id: 4,
    key: 'smartTv',
    name: 'New Smart TV',
    category: 'want',
    targetAmount: 4000,
    savedAmount: 400,
    targetDate: '2027-03-01',
  },
];

export default function CurrentGoalCard({ goals = DEFAULT_GOALS, goal }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all'); // 'all' | 'need' | 'want'

  const activeGoalList = React.useMemo(() => {
    if (goal && (goal.name || goal.title)) {
      return DEFAULT_GOALS.map((g) => {
        if (g.id === 1) {
          return {
            ...g,
            name: goal.name || goal.title || g.name,
            savedAmount: goal.currentSaved !== undefined ? goal.currentSaved : g.savedAmount,
            targetAmount: goal.targetAmount !== undefined ? goal.targetAmount : g.targetAmount,
          };
        }
        return g;
      });
    }
    return goals;
  }, [goal, goals]);

  const filteredGoals = activeGoalList.filter((g) => filter === 'all' || g.category === filter);

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Header & Category Filter Buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--mukuru-orange-subtle)',
              color: 'var(--mukuru-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Target size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', margin: 0, color: 'var(--color-text-primary)' }}>
              {t('dashboard.activeGoals.title', 'Active Goals')}
            </h3>
            <span style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)' }}>
              {filteredGoals.length} {t('dashboard.activeGoals.filterAll', 'All').toLowerCase()}
            </span>
          </div>
        </div>

        {/* Color-Coded Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setFilter('all')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: '700',
              border: filter === 'all' ? '1.5px solid #1E293B' : '1px solid var(--color-border)',
              backgroundColor: filter === 'all' ? '#1E293B' : '#F8FAFC',
              color: filter === 'all' ? '#FFFFFF' : '#475569',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {t('dashboard.activeGoals.filterAll', 'All')} ({goals.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('need')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              border: filter === 'need' ? '1.5px solid #059669' : '1px solid #A7F3D0',
              backgroundColor: filter === 'need' ? '#059669' : '#ECFDF5',
              color: filter === 'need' ? '#FFFFFF' : '#065F46',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <ShieldCheck size={13} />
            {t('dashboard.activeGoals.filterNeeds', 'Needs')}
          </button>
          <button
            type="button"
            onClick={() => setFilter('want')}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              border: filter === 'want' ? '1.5px solid #D97706' : '1px solid #FDE68A',
              backgroundColor: filter === 'want' ? '#D97706' : '#FFFBEB',
              color: filter === 'want' ? '#FFFFFF' : '#78350F',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <ShoppingBag size={13} />
            {t('dashboard.activeGoals.filterWants', 'Wants')}
          </button>
        </div>
      </div>

      {/* Goal Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredGoals.map((goal) => {
          const isNeed = goal.category === 'need';
          const progress = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));
          const remaining = Math.max(0, goal.targetAmount - goal.savedAmount);

          // Localized goal name
          const goalName = goal.key
            ? t(`dashboard.activeGoals.goals.${goal.key}`, goal.name)
            : goal.name;

          return (
            <div
              key={goal.id}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                border: isNeed ? '1.5px solid #A7F3D0' : '1.5px solid #FDE68A',
                backgroundColor: isNeed ? 'rgba(16, 185, 129, 0.05)' : 'rgba(245, 158, 11, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: '800', fontSize: '0.925rem', color: '#0F172A' }}>
                      {goalName}
                    </span>
                    {/* Category Badge */}
                    <span
                      style={{
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        fontWeight: '800',
                        letterSpacing: '0.04em',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: isNeed ? '#D1FAE5' : '#FEF3C7',
                        color: isNeed ? '#065F46' : '#78350F',
                      }}
                    >
                      {isNeed
                        ? t('dashboard.activeGoals.essentialNeed', 'Essential Need')
                        : t('dashboard.activeGoals.personalWant', 'Personal Want')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    <Calendar size={12} />
                    <span>{t('dashboard.activeGoals.targetDate', { date: goal.targetDate })}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      fontSize: '0.925rem',
                      fontWeight: '800',
                      color: isNeed ? '#059669' : '#D97706',
                    }}
                  >
                    {progress}%
                  </span>
                </div>
              </div>

              {/* Color-Coordinated Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#E2E8F0',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: isNeed ? '#10B981' : '#F59E0B',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.4s ease-in-out',
                  }}
                />
              </div>

              {/* Financial Stats */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569' }}>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {t('dashboard.activeGoals.savedOf', {
                      saved: '',
                      target: '',
                    }).replace('{{saved}}', '').replace('{{target}}', '')}
                  </span>
                  <strong style={{ color: '#0F172A', marginRight: '4px' }}>
                    <MoneyText amount={goal.savedAmount} />
                  </strong>
                  <span style={{ color: 'var(--color-text-muted)', margin: '0 4px' }}>/</span>
                  <MoneyText amount={goal.targetAmount} />
                </div>
                <div style={{ color: 'var(--color-text-muted)' }}>
                  <strong style={{ color: '#334155', marginRight: '3px' }}>
                    <MoneyText amount={remaining} />
                  </strong>
                  <span>{t('dashboard.activeGoals.remaining', { amount: '' }).replace('{{amount}}', '').trim()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}