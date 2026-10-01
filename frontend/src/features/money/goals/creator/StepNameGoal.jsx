import { useTranslation } from 'react-i18next';
import Button from '../../../../components/Button';

export default function StepNameGoal({ draft, update, onNext }) {
  const { t } = useTranslation('money');
  return (
    <div className="mm-stack">
      <h2 className="mm-title">{t('creator.name.title')}</h2>
      <p className="mm-sub">{t('creator.name.hint')}</p>
      <label className="mm-label">
        {t('creator.name.label')}
        <input className="mm-input" value={draft.name || ''} maxLength={24} placeholder="Frosty"
          onChange={(e) => update({ name: e.target.value })} />
      </label>
      <Button disabled={!draft.name?.trim()} onClick={() => onNext()}>{t('common.continue')}</Button>
    </div>
  );
}