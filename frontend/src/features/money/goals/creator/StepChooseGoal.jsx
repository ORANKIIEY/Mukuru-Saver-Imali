import { useTranslation } from 'react-i18next';
import { GraduationCap, Package, Target } from 'lucide-react';
import Button from '../../../../components/Button';

export const GOAL_TYPES = [
  { id: 'school', icon: 'school', IconComp: GraduationCap, needsProduct: false },
  { id: 'fridge', icon: 'fridge', IconComp: Package, needsProduct: true },
  { id: 'custom', icon: 'custom', IconComp: Target, needsProduct: false },
];

export default function StepChooseGoal({ draft, update, onNext }) {
  const { t } = useTranslation('money');
  return (
    <div className="mm-stack">
      <h2 className="mm-title">{t('creator.choose.title')}</h2>
      {GOAL_TYPES.map((g) => {
        const Icon = g.IconComp;
        return (
          <button key={g.id} type="button" className="mm-choice" aria-pressed={draft.type === g.id}
            onClick={() => update({ type: g.id, icon: g.icon, needsProduct: g.needsProduct,
              productId: null, name: g.id === 'school' ? t('creator.choose.school') : '' })}>
            <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <Icon size={24} color="var(--mukuru-orange)" />
            </span>
            {t(`creator.choose.${g.id}`)}
          </button>
        );
      })}
      <Button disabled={!draft.type} onClick={() => onNext()}>{t('common.continue')}</Button>
    </div>
  );
}
