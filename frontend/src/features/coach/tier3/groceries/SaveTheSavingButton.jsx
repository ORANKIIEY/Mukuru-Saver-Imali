import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../../components/Button';
import { saveTheSaving } from '../../../../api/groceries';

export default function SaveTheSavingButton({ amount }) {
  const { t } = useTranslation('coach');
  const [status, setStatus] = useState('idle'); // idle | saving | done
  const click = async () => {
    setStatus('saving');
    try { await saveTheSaving(amount); setStatus('done'); } catch { setStatus('idle'); }
  };
  if (status === 'done') return <strong style={{ color: '#1B7F3B' }}>{t('groceries.saved')}</strong>;
  return <Button onClick={click} disabled={status === 'saving'}>{t('groceries.saveButton', { amount })}</Button>;
}
