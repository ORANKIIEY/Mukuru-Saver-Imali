import { useTranslation } from 'react-i18next';
import Card from '../../../components/Card';
import MoneyText from '../../../components/MoneyText';

export default function SpendingSplitBar({ transactions }) {
  const { t } = useTranslation('money');
  const family = transactions.filter((x) => x.category === 'family').reduce((s, x) => s + x.amount, 0);
  const spending = transactions.filter((x) => x.category !== 'family').reduce((s, x) => s + x.amount, 0);
  const total = family + spending || 1;
  const familyPct = Math.round((family / total) * 100);

  return (
    <Card>
      <div className="mm-stack">
        <p className="mm-strong">{t('transactions.split.title')}</p>
        <div className="mm-split" role="img"
          aria-label={`${t('transactions.split.family')} ${familyPct}%, ${t('transactions.split.spending')} ${100 - familyPct}%`}>
          <div className="mm-split-family" style={{ width: `${familyPct}%` }} />
          <div className="mm-split-spend" style={{ width: `${100 - familyPct}%` }} />
        </div>
        <div className="mm-legend">
          <span><i className="mm-dot mm-split-family" />{t('transactions.split.family')} <MoneyText amount={family} /></span>
          <span><i className="mm-dot mm-split-spend" />{t('transactions.split.spending')} <MoneyText amount={spending} /></span>
        </div>
      </div>
    </Card>
  );
}