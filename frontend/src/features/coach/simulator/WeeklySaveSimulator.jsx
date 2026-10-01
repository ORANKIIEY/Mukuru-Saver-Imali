import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AmountSlider from './AmountSlider';
import ImpactResult from './ImpactResult';
import useSimulation from './useSimulation';

export default function WeeklySaveSimulator({ config }) {
  const { t } = useTranslation('coach');
  const [amount, setAmount] = useState(config.default);
  const { result, loading, error } = useSimulation('weeklySave', amount);
  return (
    <section>
      <h2>{t('simulator.weeklySave.title')}</h2>
      <AmountSlider label={t('simulator.weeklySave.label')} value={amount} onChange={setAmount}
        min={config.min} max={config.max} step={config.step} />
      <ImpactResult result={result} loading={loading} error={error} />
    </section>
  );
}
