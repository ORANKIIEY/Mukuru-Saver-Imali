import { useTranslation } from 'react-i18next';
import useApi from '../../../../hooks/useApi';
import Button from '../../../../components/Button';
import MoneyText from '../../../../components/MoneyText';
import LoadingState from '../../../../components/LoadingState';
import ErrorState from '../../../../components/ErrorState';
import { getSafeToSave } from '../../../../api/safeToSave';
import { formatMoney, formatDate, weeksUntil } from '../../utils';

export default function StepPlan({ draft, onNext, saving, saveError }) {
  const { t, i18n } = useTranslation('money');
  const { data, loading, error, refetch } = useApi(getSafeToSave, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState onRetry={refetch} />;

  const weeks = weeksUntil(draft.targetDate);
  const weekly = Math.ceil(draft.target / weeks);
  const perMonth = (weekly * 52) / 12;
  const tone = perMonth <= data.suggested ? 'ok' : perMonth <= data.available ? 'tight' : 'high';

  return (
    <div className="mm-stack">
      <h2 className="mm-title">{t('creator.plan.title')}</h2>
      <p className="mm-sub">
        {t('creator.plan.summary', { name: draft.name, amount: formatMoney(draft.target), date: formatDate(draft.targetDate, i18n.language) })}
      </p>
      <p className="mm-big"><MoneyText amount={weekly} /> <span className="mm-sub">{t('creator.plan.perWeek')}</span></p>
      <div className="mm-notice" data-tone={tone === 'high' ? 'warn' : 'ok'} role="status">
        {t(`creator.plan.${tone}`, { available: formatMoney(data.available), suggested: formatMoney(data.suggested) })}
      </div>
      {saveError && <div className="mm-notice" data-tone="warn" role="alert">{t('creator.plan.saveError')}</div>}
      <Button onClick={() => onNext({ weeklyAmount: weekly })} disabled={saving}>
        {saving ? t('common.saving') : t('creator.plan.confirm')}
      </Button>
    </div>
  );
}