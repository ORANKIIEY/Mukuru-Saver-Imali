import { useTranslation } from 'react-i18next';

export default function RiskNote() {
  const { t } = useTranslation('coach');
  return (
    <aside style={{ marginTop: 16, padding: 12, borderRadius: 12, background: '#FFF4E5', border: '1px solid #F5C27A' }}>
      <strong>{t('grow.riskTitle')}</strong>
      <p style={{ margin: '4px 0 0' }}>{t('grow.riskText')}</p>
    </aside>
  );
}
