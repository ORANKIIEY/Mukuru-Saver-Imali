import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../../hooks/useApi';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import MoneyText from '../../../components/MoneyText';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import { getGoal } from '../../../api/goals';
import { formatMoney, formatDate, percent } from '../utils';
import GoalProgressRing from './GoalProgressRing';
import MilestoneBadge from './MilestoneBadge';
import '../money.css';

export default function GoalDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation('money');
  const { data: goal, loading, error, refetch } = useApi(() => getGoal(id), [id]);

  if (loading) return <LoadingState />;
  if (error || !goal) return <ErrorState onRetry={refetch} />;

  const pct = percent(goal.saved, goal.target);
  const away = Math.max(0, goal.target - goal.saved);
  const levels = goal.milestones || [20, 50, 100];

  return (
    <main className="mm-page">
      <h1 className="mm-title"><span aria-hidden="true">{goal.icon}</span> {goal.name}</h1>
      <Card>
        <div className="mm-stack" style={{ alignItems: 'center' }}>
          <GoalProgressRing percent={pct} />
          <p className="mm-strong">{t('goals.away', { name: goal.name, amount: formatMoney(away) })}</p>
          <p className="mm-sub">
            <MoneyText amount={goal.saved} /> {t('goals.of')} <MoneyText amount={goal.target} />
          </p>
        </div>
      </Card>
      <Card>
        <div className="mm-stack">
          <div className="mm-row"><span>{t('goals.targetDate')}</span><span className="mm-strong">{formatDate(goal.targetDate, i18n.language)}</span></div>
          <div className="mm-row"><span>{t('goals.weekly')}</span><MoneyText amount={goal.weeklyAmount} /></div>
        </div>
      </Card>
      <div className="mm-badges">
        {levels.map((l) => <MilestoneBadge key={l} level={l} reached={pct >= l} />)}
      </div>
      {goal.status === 'completed' && (
        <Link to={`/goals/${goal.id}/celebrate`} className="mm-link"><Button>{t('goals.seeCelebration')}</Button></Link>
      )}
    </main>
  );
}