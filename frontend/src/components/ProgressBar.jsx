import React from 'react';

/**
 * Shared ProgressBar Component for Mukuru UI Kit
 * @param {number} value - current value (e.g., 1200)
 * @param {number} max - target value (e.g., 6000)
 * @param {string} color - CSS background color override
 * @param {string} height - height string (e.g., '10px')
 * @param {boolean} showLabel - display percentage label
 */
export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'var(--mukuru-orange)',
  height = '10px',
  showLabel = false,
  className = '',
  style = {},
}) {
  const percentage = max > 0 ? Math.min(100, Math.max(0, Math.round((value / max) * 100))) : 0;

  return (
    <div style={{ width: '100%', ...style }} className={className}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
          <span>Progress</span>
          <span style={{ fontWeight: '700', color: 'var(--mukuru-orange)' }}>{percentage}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          backgroundColor: '#E2E8F0',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: color === 'var(--mukuru-orange)'
              ? 'linear-gradient(90deg, #FF7733 0%, #FF5500 100%)'
              : color,
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  );
}
