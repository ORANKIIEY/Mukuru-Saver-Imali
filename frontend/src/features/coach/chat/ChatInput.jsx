import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button';

export default function ChatInput({ onSend, disabled }) {
  const { t } = useTranslation('coach');
  const [text, setText] = useState('');
  const submit = () => {
    const v = text.trim();
    if (!v || disabled) return;
    onSend(v);
    setText('');
  };
  return (
    <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #eee' }}>
      <input value={text} onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()} placeholder={t('chat.placeholder')}
        style={{ flex: 1, padding: '10px 12px', borderRadius: 999, border: '1px solid #ccc' }} />
      <Button onClick={submit} disabled={disabled}>{t('chat.send')}</Button>
    </div>
  );
}
