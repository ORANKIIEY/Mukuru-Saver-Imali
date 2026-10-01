import { useTranslation } from 'react-i18next';
import LearnCard from './LearnCard';
import RiskNote from './RiskNote';

export default function GrowMyMoneyPage() {
  const { t } = useTranslation('coach');
  const cards = t('grow.cards', { returnObjects: true });
  return (
    <div style={{ padding: 16 }}>
      <h1>{t('grow.title')}</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {cards.map((c) => <LearnCard key={c.title} title={c.title} text={c.text} />)}
      </div>
      <RiskNote />
    </div>
  );
}
