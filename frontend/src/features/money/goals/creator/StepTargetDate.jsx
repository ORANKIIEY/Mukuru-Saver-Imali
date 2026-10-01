import { useTranslation } from 'react-i18next';
import Button from '../../../../components/Button';

const tomorrow = () => new Date(Date.now() + 864e5).toISOString().slice(0, 10);

export default function StepTargetDate({ draft, update, onNext }) {
  const { t } = useTranslation('money');
  const valid = Number(draft.target) > 0 && draft.targetDate && draft.targetDate >= tomorrow();
  return (
    <div className="mm-stack">
      <h2 className="mm-title">{t('creator.target.title')}</h2>
      <label className="mm-label">
        {t('creator.target.amount')}
        <input className="mm-input" type="number" inputMode="numeric" min="1" value={draft.target || ''}
          onChange={(e) => update({ target: Number(e.target.value) })} />
      </label>
      <label className="mm-label">
        {t('creator.target.date')}
        <input className="mm-input" type="date" min={tomorrow()} value={draft.targetDate || ''}
          onChange={(e) => update({ targetDate: e.target.value })} />
      </label>
      <Button disabled={!valid} onClick={() => onNext()}>{t('common.continue')}</Button>
    </div>
  );
}