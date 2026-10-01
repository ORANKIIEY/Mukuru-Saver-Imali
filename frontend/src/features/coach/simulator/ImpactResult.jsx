import { useTranslation } from 'react-i18next';
import Card from '../../../components/Card';
import ProgressBar from '../../../components/ProgressBar';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';

export default function ImpactResult({ result, loading, error }) {
  const { t, i18n } = useTranslation('coach');
  if (error) return <ErrorState message={t('error')} />;
  if (!result) return <LoadingState />;

  const fmt = (iso) => new Date(iso).toLocaleDateString(i18n.language === 'zu' ? 'zu-ZA' : 'en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
  const delta = result.after.weeks - result.before.weeks;
  const summary = delta > 0 ? t('simulator.impact.laterBy', { weeks: delta })
    : delta < 0 ? t('simulator.impact.soonerBy', { weeks: -delta })
    : t('simulator.impact.noChange');

  const Row = ({ label, data }) => (
    <div style={{ marginBottom: 12 }}>
      <strong>{label}</strong>: {fmt(data.date)}
      <ProgressBar value={data.progress} />
    </div>
  );

  return (
    <Card>
      <div style={{ opacity: loading ? 0.5 : 1, transition: 'opacity .2s' }}>
        <p style={{ margin: '0 0 12px' }}>{t('simulator.impact.goalDate', { goal: result.goal.name })}</p>
        <Row label={t('simulator.impact.before')} data={result.before} />
        <Row label={t('simulator.impact.after')} data={result.after} />
        <p style={{ fontWeight: 700, color: delta > 0 ? '#B3261E' : '#1B7F3B' }}>{summary}</p>
        <small>{t('simulator.impact.progressIn', { weeks: result.horizonWeeks })}</small>
      </div>
    </Card>
  );
}
