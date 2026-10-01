import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendMessage } from '../../../api/coach';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import SuggestedPrompts from './SuggestedPrompts';
import TypingIndicator from './TypingIndicator';

export default function CoachChatPage() {
  const { t, i18n } = useTranslation('coach');
  const [messages, setMessages] = useState([{ id: 0, role: 'coach', text: t('chat.greeting') }]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = async (text) => {
    setMessages((m) => [...m, { id: Date.now(), role: 'user', text }]);
    setTyping(true);
    try {
      const { reply } = await sendMessage(text, i18n.language);
      setMessages((m) => [...m, { id: Date.now() + 1, role: 'coach', text: reply }]);
    } catch {
      setMessages((m) => [...m, { id: Date.now() + 1, role: 'coach', text: t('error') }]);
    } finally {
      setTyping(false);
    }
  };

  const started = messages.some((m) => m.role === 'user');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 130px)' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <h1 style={{ marginTop: 0 }}>{t('chat.title')}</h1>
        {messages.map((m) => <ChatBubble key={m.id} role={m.role} text={m.text} />)}
        {typing && <TypingIndicator />}
        {!started && <SuggestedPrompts prompts={t('chat.prompts', { returnObjects: true })} onPick={send} />}
        <div ref={endRef} />
      </div>
      <ChatInput onSend={send} disabled={typing} />
    </div>
  );
}
