export default function ChatBubble({ role, text }) {
  const mine = role === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', margin: '6px 0' }}>
      <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: 16,
        background: mine ? 'var(--color-primary, #F26B21)' : '#F1F1F1', color: mine ? '#fff' : '#222' }}>
        {text}
      </div>
    </div>
  );
}
