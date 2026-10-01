import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../../../components/Button';
import { createGoal } from '../../../../api/goals';
import StepChooseGoal from './StepChooseGoal';
import StepPickProduct from './StepPickProduct';
import StepNameGoal from './StepNameGoal';
import StepTargetDate from './StepTargetDate';
import StepPlan from './StepPlan';
import '../../money.css';

const STEP_COMPONENTS = {
  choose: StepChooseGoal,
  product: StepPickProduct,
  name: StepNameGoal,
  target: StepTargetDate,
  plan: StepPlan,
};

export default function GoalCreatorFlow() {
  const { t } = useTranslation('money');
  const navigate = useNavigate();
  const [draft, setDraft] = useState({});
  const [index, setIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // The product step only appears for goals that need one (e.g. a fridge).
  const steps = ['choose', ...(draft.needsProduct ? ['product'] : []), 'name', 'target', 'plan'];
  const step = steps[index];
  const Step = STEP_COMPONENTS[step];
  const update = (patch) => setDraft((d) => ({ ...d, ...patch }));

  const finish = async (extra = {}) => {
    const d = { ...draft, ...extra };
    setSaving(true);
    setSaveError(false);
    try {
      const goal = await createGoal({
        name: d.name.trim(), type: d.type, icon: d.icon,
        target: d.target, targetDate: d.targetDate, weeklyAmount: d.weeklyAmount,
      });
      navigate(`/goals/${goal.id}`);
    } catch {
      setSaveError(true);
      setSaving(false);
    }
  };

  const onNext = (extra) => (index === steps.length - 1 ? finish(extra) : setIndex((i) => i + 1));

  return (
    <main className="mm-page">
      <p className="mm-steps" aria-live="polite">{t('creator.stepOf', { current: index + 1, total: steps.length })}</p>
      <Step draft={draft} update={update} onNext={onNext} saving={saving} saveError={saveError} />
      {index > 0 && <Button variant="ghost" onClick={() => setIndex((i) => i - 1)}>{t('common.back')}</Button>}
    </main>
  );
}
