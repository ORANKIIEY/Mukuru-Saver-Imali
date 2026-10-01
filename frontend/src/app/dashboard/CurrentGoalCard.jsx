import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import MoneyText from '../../components/MoneyText';
import ProgressBar from '../../components/ProgressBar';
import CategoryTag from '../../components/CategoryTag';
import Button from '../../components/Button';
import { useLanguage } from '../../i18n';
import { ChevronRight, Calendar, PartyPopper, Target } from 'lucide-react';

/**
 * CurrentGoalCard Component (Role 4 Owned)
 * Clean UI without emojis. Matches Role 5's goals.json data shape.
 */
export default function CurrentGoalCard({ goal }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const title = goal?.title || goal?.name || 'Frosty Fridge';
  const targetAmount = goal?.targetAmount || 6000;
  const currentSaved = goal?.currentSaved || 1200;
  const remainingAmount = goal?.remainingAmount || Math.max(0, targetAmount - currentSaved);
  const targetDate = goal?.targetDate || '2026-12-15';
  const percentage = goal?.percentage || Math.min(100, Math.round((currentSaved / targetAmount) * 100));
  const isCompleted = goal?.status === 'completed' || goal?.status === 'complete' || percentage >= 100;

  return (
    <Card variant={isCompleted ? 'highlight' : 'default'}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <CategoryTag category="savings" label={isCompleted ? 'Completed Goal' : 'Active Goal'} size="sm" />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} /> {targetDate}
            </span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Target size={20} color="var(--mukuru-orange)" /> {title}
          </h3>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>
            {t('dashboard.currentGoal.progress', 'Progress')}
          </span>
          <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--mukuru-orange)' }}>
            {percentage}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar value={currentSaved} max={targetAmount} height="12px" style={{ marginBottom: '14px' }} />

      {/* Saved vs Target Summary */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--color-bg)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '14px',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>
            {t('dashboard.currentGoal.saved', 'Saved so far')}
          </span>
          <MoneyText amount={currentSaved} size="md" color="orange" />
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>
            {t('dashboard.currentGoal.target', 'Target')}
          </span>
          <MoneyText amount={targetAmount} size="md" color="default" />
        </div>
      </div>

      {/* Celebration Trigger or Details Link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isCompleted ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontWeight: '700', fontSize: '0.85rem' }}>
            <PartyPopper size={18} /> Goal Complete!
          </div>
        ) : (
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            <strong style={{ color: 'var(--mukuru-orange-dark)' }}>R{remainingAmount}</strong> {t('dashboard.currentGoal.remaining', 'away from goal')}
          </p>
        )}

        <Button
          variant={isCompleted ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => navigate(isCompleted ? `/goals/${goal?.id}/celebrate` : '/goals')}
          icon={isCompleted ? <PartyPopper size={16} /> : <ChevronRight size={16} />}
          style={{ color: isCompleted ? '#FFFFFF' : 'var(--mukuru-orange)', fontWeight: '700' }}
        >
          {isCompleted ? 'Celebrate!' : t('common.actions.viewDetails', 'View Details')}
        </Button>
      </div>
    </Card>
  );
}
