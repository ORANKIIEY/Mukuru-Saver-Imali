import React from 'react';

/**
 * Shared Card Component for Mukuru UI Kit
 */
export default function Card({
  children,
  variant = 'default', // 'default' | 'highlight' | 'outlined' | 'subtle'
  padding = 'md', // 'none' | 'sm' | 'md' | 'lg'
  onClick,
  className = '',
  style = {},
  ...props
}) {
  const paddingValues = {
    none: '0',
    sm: '12px',
    md: '16px',
    lg: '24px',
  };

  const variantStyles = {
    default: {
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-md)',
    },
    highlight: {
      backgroundColor: 'var(--color-surface)',
      border: '1.5px solid var(--mukuru-orange-border)',
      boxShadow: 'var(--shadow-lg)',
    },
    outlined: {
      backgroundColor: 'transparent',
      border: '1px solid var(--color-border)',
      boxShadow: 'none',
    },
    subtle: {
      backgroundColor: 'var(--color-bg)',
      border: '1px solid var(--color-border-subtle)',
      boxShadow: 'none',
    },
  };

  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: paddingValues[padding],
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
        cursor: onClick ? 'pointer' : 'default',
        ...variantStyles[variant],
        ...style,
      }}
      className={`mukuru-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
