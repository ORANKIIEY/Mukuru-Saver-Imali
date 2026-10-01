import { useTranslation } from 'react-i18next';

export default function MilestoneBadge({ level, reached }) {
  const { t } = useTranslation('money');
  return (
    <span className="mm-badge" data-reached={reached}>
      {reached ? '✓ ' : ''}{t('goals.milestone', { level })}
    </span>
  );
}