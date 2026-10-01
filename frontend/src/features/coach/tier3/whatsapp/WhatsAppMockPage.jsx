import { useTranslation } from 'react-i18next';
import MockMessageBubble from './MockMessageBubble';

// Static mock chat for the demo. Messages live in the i18n files.
export default function WhatsAppMockPage() {
  const { t } = useTranslation('coach');
  const messages = t('whatsapp.messages', { returnObjects: true });
  return (
    <div style={{ minHeight: 'calc(100vh - 130px)', background: '#ECE5DD' }}>
      <header style={{ background: '#075E54', color: '#fff', padding: 12, fontWeight: 600 }}>{t('whatsapp.title')}</header>
      <div style={{ padding: 12 }}>
        {messages.map((m, i) => <MockMessageBubble key={i} from={m.from} text={m.text} time={m.time} />)}
      </div>
    </div>
  );
}
