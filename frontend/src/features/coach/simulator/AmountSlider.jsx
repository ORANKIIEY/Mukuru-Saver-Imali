import MoneyText from '../../../components/MoneyText';

export default function AmountSlider({ label, value, onChange, min, max, step }) {
  return (
    <div style={{ margin: '16px 0' }}>
      <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
        {label}: <MoneyText amount={value} />
      </label>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--color-primary, #F26B21)' }}
      />
    </div>
  );
}
