import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useApi from '../../../hooks/useApi';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import ProgressBar from '../../../components/ProgressBar';
import MoneyText from '../../../components/MoneyText';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import { getGoals } from '../../../api/goals';
import { percent } from '../utils';
import '../money.css';

export default function GoalsPage() {
  const { t } = useTranslation('money');
  const { data, loading, error, refetch } = useApi(getGoals, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState onRetry={refetch} />;

  return (
    <main className="mm-page">
      <div className="mm-row">
        <h1 className="mm-title">{t('goals.title')}</h1>
        <Link to="/goals/new" className="mm-link"><Button>{t('goals.create')}</Button></Link>
      </div>

      {data.length === 0 && <p className="mm-sub">{t('goals.empty')}</p>}

      {data.map((g) => {
        const pct = percent(g.saved, g.target);
        return (
          <Link key={g.id} to={g.status === 'completed' ? `/goals/${g.id}/celebrate` : `/goals/${g.id}`} className="mm-link">
            <Card>
              <div className="mm-stack">
                <div className="mm-row">
                  <p className="mm-strong"><span aria-hidden="true">{g.icon}</span> {g.name}</p>
                  {g.status === 'completed' && <span className="mm-badge" data-reached="true">{t('goals.reached')}</span>}
                </div>
                <ProgressBar value={pct} />
                <div className="mm-row mm-sub">
                  <MoneyText amount={g.saved} />
                  <span>{t('goals.of')} <MoneyText amount={g.target} /></span>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </main>
  );
}