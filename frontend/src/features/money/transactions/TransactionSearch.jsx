import { useTranslation } from 'react-i18next';

export default function TransactionSearch({ value, onChange }) {
  const { t } = useTranslation('money');
  return (
    <input
      type="search"
      className="mm-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t('transactions.search')}
      aria-label={t('transactions.search')}
    />
  );
}