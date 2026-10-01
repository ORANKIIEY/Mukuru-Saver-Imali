export default function GoalProgressRing({ percent, size = 140, children }) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="mm-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} role="img" aria-label={`${percent}%`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border, #eadfd4)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-primary, #f26b21)"
          strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - percent / 100)} />
      </svg>
      <div className="mm-ring-label">{children ?? `${percent}%`}</div>
    </div>
  );
}