import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Target, Zap } from 'lucide-react';
import { useApi } from '../../../hooks/useApi';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';
import MoneyText from '../../../components/MoneyText';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import GoalSprintMinigame from './GoalSprintMinigame';
import { getGoals } from '../../../api/goals';
import { percent } from '../utils';
import '../money.css';

export default function GoalsPage() {
  const { t } = useTranslation('money');
  const { data, loading, error, refetch } = useApi(getGoals, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState onRetry={refetch} />;

  // Select closest active goal for Sprint Minigame
  const activeGoals = (data || []).filter((g) => g.status !== 'completed');
  const closestGoal = activeGoals.sort((a, b) => (b.saved / b.target) - (a.saved / a.target))[0] || data[0];

  return (
    <main className="mm-page">
      <div className="mm-row">
        <h1 className="mm-title">{t('goals.title')}</h1>
        <Link to="/goals/new" className="mm-link"><Button>{t('goals.create')}</Button></Link>
      </div>

      {/* Gamified Goal Sprint & Automations Minigame Widget */}
      {closestGoal && (
        <GoalSprintMinigame goal={closestGoal} onGoalUpdate={() => refetch()} />
      )}

      {data.length === 0 && <p className="mm-sub">{t('goals.empty')}</p>}

      {data.map((g) => {
        const pct = percent(g.saved, g.target);
        const isNear = pct >= 60 && g.status !== 'completed';

        return (
          <Link key={g.id} to={g.status === 'completed' ? `/goals/${g.id}/celebrate` : `/goals/${g.id}`} className="mm-link">
            <Card style={{ border: isNear ? '1.5px solid var(--mukuru-orange)' : '1px solid var(--color-border)' }}>
              <div className="mm-stack">
                <div className="mm-row">
                  <p className="mm-strong" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Target size={18} color="var(--mukuru-orange)" /> {g.name}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isNear && (
                      <span className="mm-badge" style={{ backgroundColor: '#FEF3C7', color: '#B45309', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Zap size={12} /> {pct >= 80 ? 'Sprint Final Step!' : 'Sprint Active'}
                      </span>
                    )}
                    {g.status === 'completed' && <span className="mm-badge" data-reached="true">{t('goals.reached')}</span>}
                  </div>
                </div>
                <ProgressBar value={pct} />
                <div className="mm-row mm-sub">
                  <MoneyText amount={g.saved} />
                  <span>{t('goals.of')} <MoneyText amount={g.target} /> ({pct}%)</span>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </main>
  );
}