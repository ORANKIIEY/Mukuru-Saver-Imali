import React from 'react';

/**
 * Shared MoneyText Component for Mukuru UI Kit
 * Formats South African Rand (R) currency consistently.
 * @param {number|string} amount
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'} size
 * @param {'default'|'positive'|'negative'|'orange'|'muted'} color
 * @param {boolean} showDecimals
 */
export default function MoneyText({
  amount = 0,
  currency = 'R',
  size = 'md',
  color = 'default',
  showDecimals = false,
  className = '',
  style = {},
}) {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;

  const formattedNum = new Intl.NumberFormat('en-ZA', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(Math.abs(num));

  const sizeStyles = {
    sm: { fontSize: '0.875rem', fontWeight: '600' },
    md: { fontSize: '1.1rem', fontWeight: '700' },
    lg: { fontSize: '1.4rem', fontWeight: '800' },
    xl: { fontSize: '1.8rem', fontWeight: '800' },
    '2xl': { fontSize: '2.2rem', fontWeight: '800' },
  };

  const colorStyles = {
    default: { color: 'var(--color-text-primary)' },
    positive: { color: 'var(--color-success)' },
    negative: { color: 'var(--color-danger)' },
    orange: { color: 'var(--mukuru-orange)' },
    muted: { color: 'var(--color-text-muted)' },
  };

  const sign = num < 0 ? '-' : '';

  return (
    <span
      style={{
        fontFamily: 'var(--font-family-heading)',
        letterSpacing: '-0.02em',
        ...sizeStyles[size],
        ...colorStyles[color],
        ...style,
      }}
      className={`money-text ${className}`}
    >
      {sign}{currency}{formattedNum}
    </span>
  );
}
