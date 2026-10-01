export default function TypingIndicator() {
  return (
    <div aria-label="typing" style={{ display: 'flex', gap: 4, padding: '10px 14px', background: '#F1F1F1', borderRadius: 16, width: 'fit-content' }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#999',
          animation: `coachDot 1s ${i * 0.15}s infinite ease-in-out` }} />
      ))}
      <style>{`@keyframes coachDot{0%,80%,100%{opacity:.3}40%{opacity:1}}`}</style>
    </div>
  );
}
