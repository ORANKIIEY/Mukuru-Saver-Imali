import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../../hooks/useApi';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import Card from '../../../components/Card';
import { getTransactions } from '../../../api/transactions';
import TransactionRow from './TransactionRow';
import TransactionSearch from './TransactionSearch';
import SpendingSplitBar from './SpendingSplitBar';
import '../money.css';

export default function TransactionsPage() {
  const { t } = useTranslation('money');
  const { data, loading, error, refetch } = useApi(getTransactions, []);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!data) return [];
    if (!q) return data;
    return data.filter((x) =>
      [x.merchant, x.category, x.note].filter(Boolean).some((v) => v.toLowerCase().includes(q)));
  }, [data, query]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState onRetry={refetch} />;

  return (
    <main className="mm-page">
      <h1 className="mm-title">{t('transactions.title')}</h1>
      <SpendingSplitBar transactions={data} />
      <TransactionSearch value={query} onChange={setQuery} />
      <Card>
        {filtered.length === 0 ? (
          <p className="mm-sub">{t('transactions.empty')}</p>
        ) : (
          <ul className="mm-list">
            {filtered.map((tx) => <TransactionRow key={tx.id} transaction={tx} />)}
          </ul>
        )}
      </Card>
    </main>
  );
}