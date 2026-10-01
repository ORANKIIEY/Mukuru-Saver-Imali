import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAsync from '../useAsync';
import { getSimulatorConfig } from '../../../api/simulator';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import SendHomeSimulator from './SendHomeSimulator';
import WeeklySaveSimulator from './WeeklySaveSimulator';

export default function SimulatorPage() {
  const { t } = useTranslation('coach');
  const [tab, setTab] = useState('sendHome');
  const { data: config, loading, error } = useAsync(getSimulatorConfig);

  if (loading) return <LoadingState />;
  if (error || !config) return <ErrorState message={t('error')} />;

  const tabBtn = (id) => ({
    flex: 1, padding: '10px 8px', border: 'none', cursor: 'pointer', fontWeight: 600, background: 'transparent',
    borderBottom: `3px solid ${tab === id ? 'var(--color-primary, #F26B21)' : 'transparent'}`,
  });

  return (
    <div style={{ padding: 16 }}>
      <h1>{t('simulator.title')}</h1>
      <div style={{ display: 'flex', marginBottom: 8 }}>
        <button style={tabBtn('sendHome')} onClick={() => setTab('sendHome')}>{t('simulator.tabs.sendHome')}</button>
        <button style={tabBtn('weeklySave')} onClick={() => setTab('weeklySave')}>{t('simulator.tabs.weeklySave')}</button>
      </div>
      {tab === 'sendHome'
        ? <SendHomeSimulator config={config.sendHome} />
        : <WeeklySaveSimulator config={config.weeklySave} />}
    </div>
  );
}
