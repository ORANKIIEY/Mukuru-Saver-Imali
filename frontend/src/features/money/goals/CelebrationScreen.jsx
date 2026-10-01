import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../../hooks/useApi';
import Button from '../../../components/Button';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import { getGoal } from '../../../api/goals';
import { formatMoney } from '../utils';
import '../money.css';

export default function CelebrationScreen() {
  const { id } = useParams();
  const { t } = useTranslation('money');
  const { data: goal, loading, error, refetch } = useApi(() => getGoal(id), [id]);

  if (loading) return <LoadingState />;
  if (error || !goal) return <ErrorState onRetry={refetch} />;

  return (
    <main className="mm-celebrate" role="status">
      <div className="mm-celebrate-icon" aria-hidden="true">{goal.icon || '🎉'}</div>
      <h1 className="mm-title">{t('celebrate.title', { name: goal.name })}</h1>
      <p className="mm-sub">{t('celebrate.body', { amount: formatMoney(goal.target) })}</p>
      <Link to="/goals/new" className="mm-link"><Button>{t('celebrate.next')}</Button></Link>
      <Link to="/" className="mm-link"><Button variant="ghost">{t('celebrate.home')}</Button></Link>
    </main>
  );
}