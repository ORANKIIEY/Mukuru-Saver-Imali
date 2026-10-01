import { useTranslation } from 'react-i18next';
import useAsync from '../../useAsync';
import { getGroceries } from '../../../../api/groceries';
import LoadingState from '../../../../components/LoadingState';
import ErrorState from '../../../../components/ErrorState';
import StapleCard from './StapleCard';

export default function GroceryWatchPage() {
  const { t } = useTranslation('coach');
  const { data, loading, error } = useAsync(getGroceries);
  if (loading) return <LoadingState />;
  if (error || !data) return <ErrorState message={t('error')} />;
  return (
    <div style={{ padding: 16 }}>
      <h1>{t('groceries.title')}</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {data.staples.map((s) => <StapleCard key={s.id} item={s} />)}
      </div>
    </div>
  );
}
