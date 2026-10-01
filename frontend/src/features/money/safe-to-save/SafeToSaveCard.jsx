import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../../hooks/useApi';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import { getSafeToSave } from '../../../api/safeToSave';
import { formatMoney } from '../utils';
import SafeToSaveBreakdown from './SafeToSaveBreakdown';
import '../money.css';

/** Fetches its own data, so the dashboard can drop it in anywhere. */
export default function SafeToSaveCard() {
  const { t } = useTranslation('money');
  const { data, loading, error, refetch } = useApi(getSafeToSave, []);
  const [open, setOpen] = useState(false);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState onRetry={refetch} />;

  return (
    <Card>
      <div className="mm-stack">
        <p className="mm-strong">{t('safe.title')}</p>
        <p className="mm-big">{t('safe.available', { amount: formatMoney(data.available) })}</p>
        <p className="mm-sub">{t('safe.suggested', { amount: formatMoney(data.suggested) })}</p>
        <Button variant="ghost" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? t('safe.hide') : t('safe.show')}
        </Button>
        {open && <SafeToSaveBreakdown data={data} />}
        <Link to="/goals/new" className="mm-link">
          <Button>{t('safe.startGoal')}</Button>
        </Link>
      </div>
    </Card>
  );
}