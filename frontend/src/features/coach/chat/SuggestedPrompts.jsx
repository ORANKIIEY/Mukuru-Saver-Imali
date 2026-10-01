export default function SuggestedPrompts({ prompts, onPick }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '12px 0' }}>
      {prompts.map((p) => (
        <button key={p} onClick={() => onPick(p)} style={{ padding: '8px 12px', borderRadius: 999, cursor: 'pointer',
          border: '1px solid var(--color-primary, #F26B21)', background: '#fff', color: 'var(--color-primary, #F26B21)' }}>
          {p}
        </button>
      ))}
    </div>
  );
}
