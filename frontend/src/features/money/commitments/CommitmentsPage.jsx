import { useTranslation } from 'react-i18next';
import { useApi } from '../../../hooks/useApi';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import MoneyText from '../../../components/MoneyText';
import { getCommitments } from '../../../api/commitments';
import CommitmentCard from './CommitmentCard';
import SafeToSaveCard from '../safe-to-save/SafeToSaveCard';
import '../money.css';

const monthly = (c) => (c.frequency === 'weekly' ? (c.amount * 52) / 12 : c.amount);

export default function CommitmentsPage() {
  const { t } = useTranslation('money');
  const { data, loading, error, refetch } = useApi(getCommitments, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState onRetry={refetch} />;

  const total = data.reduce((s, c) => s + monthly(c), 0);

  return (
    <main className="mm-page">
      <header>
        <h1 className="mm-title">{t('commitments.title')}</h1>
        <p className="mm-sub">{t('commitments.subtitle')}</p>
      </header>
      <div className="mm-stack">
        {data.map((c) => <CommitmentCard key={c.id} commitment={c} />)}
      </div>
      <div className="mm-row">
        <span className="mm-strong">{t('commitments.total')}</span>
        <MoneyText amount={total} />
      </div>
      <SafeToSaveCard />
    </main>
  );
}
