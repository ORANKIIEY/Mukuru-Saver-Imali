import React from 'react';

/**
 * Shared Button Component for Mukuru UI Kit
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} props.variant
 * @param {'sm'|'md'|'lg'} props.size
 * @param {boolean} props.fullWidth
 * @param {boolean} props.loading
 * @param {React.ReactNode} props.icon
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon = null,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--transition-fast)',
    outline: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    border: 'none',
    textDecoration: 'none',
  };

  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '0.85rem' },
    md: { padding: '10px 18px', fontSize: '0.95rem' },
    lg: { padding: '14px 24px', fontSize: '1.05rem' },
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--mukuru-orange)',
      color: '#FFFFFF',
      boxShadow: 'var(--shadow-sm)',
    },
    secondary: {
      backgroundColor: 'var(--mukuru-dark)',
      color: '#FFFFFF',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--mukuru-orange)',
      border: '1.5px solid var(--mukuru-orange)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-secondary)',
    },
    danger: {
      backgroundColor: 'var(--color-danger)',
      color: '#FFFFFF',
    },
  };

  const handleMouseEnter = (e) => {
    if (disabled || loading) return;
    if (variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--mukuru-orange-hover)';
    if (variant === 'outline') e.currentTarget.style.backgroundColor = 'var(--mukuru-orange-subtle)';
    if (variant === 'ghost') e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
  };

  const handleMouseLeave = (e) => {
    if (disabled || loading) return;
    if (variant === 'primary') e.currentTarget.style.backgroundColor = 'var(--mukuru-orange)';
    if (variant === 'outline') e.currentTarget.style.backgroundColor = 'transparent';
    if (variant === 'ghost') e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
      className={`mukuru-btn ${className}`}
      {...props}
    >
      {loading ? (
        <span className="pulse" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          Loading...
        </span>
      ) : (
        <>
          {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
