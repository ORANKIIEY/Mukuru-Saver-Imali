export default function MockMessageBubble({ from, text, time }) {
  const mine = from === 'me';
  return (
    <div style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', margin: '4px 0' }}>
      <div style={{ maxWidth: '80%', padding: '8px 10px', borderRadius: 8,
        background: mine ? '#DCF8C6' : '#fff', boxShadow: '0 1px 1px rgba(0,0,0,.12)' }}>
        <div>{text}</div>
        <small style={{ display: 'block', textAlign: 'right', color: '#888' }}>{time}</small>
      </div>
    </div>
  );
}
