import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

export default function MilestoneBadge({ level, reached }) {
  const { t } = useTranslation('money');
  return (
    <span className="mm-badge" data-reached={reached} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      {reached && <Check size={12} />}
      {t('goals.milestone', { level })}
    </span>
  );
}