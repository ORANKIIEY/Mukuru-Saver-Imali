import React from 'react';
import { ShoppingCart, Users, Target, Shield, Zap, Bus, Tag, Smartphone, TrendingUp, HelpCircle } from 'lucide-react';

/**
 * Shared CategoryTag Component for Mukuru UI Kit
 * Supports Airtime, Income, Family Support, Groceries, Savings, Emergency, Transport, Utilities, and an "Other" fallback.
 */
export default function CategoryTag({
  category = 'other',
  label,
  size = 'md',
}) {
  const categoryConfig = {
    groceries: {
      bg: '#FEF3C7',
      color: '#B45309',
      Icon: ShoppingCart,
      defaultLabel: 'Groceries',
    },
    family: {
      bg: '#E0E7FF',
      color: '#4338CA',
      Icon: Users,
      defaultLabel: 'Family Support',
    },
    'family support': {
      bg: '#E0E7FF',
      color: '#4338CA',
      Icon: Users,
      defaultLabel: 'Family Support',
    },
    savings: {
      bg: 'var(--mukuru-orange-subtle)',
      color: 'var(--mukuru-orange)',
      Icon: Target,
      defaultLabel: 'Savings',
    },
    emergency: {
      bg: '#FEE2E2',
      color: '#B91C1C',
      Icon: Shield,
      defaultLabel: 'Emergency Safe',
    },
    utilities: {
      bg: '#E0F2FE',
      color: '#0369A1',
      Icon: Zap,
      defaultLabel: 'Utilities',
    },
    transport: {
      bg: '#ECE9FE',
      color: '#6D28D9',
      Icon: Bus,
      defaultLabel: 'Transport',
    },
    airtime: {
      bg: '#FDF2F8',
      color: '#BE185D',
      Icon: Smartphone,
      defaultLabel: 'Airtime',
    },
    income: {
      bg: '#ECFDF5',
      color: '#047857',
      Icon: TrendingUp,
      defaultLabel: 'Income',
    },
    other: {
      bg: '#F1F5F9',
      color: '#475569',
      Icon: Tag,
      defaultLabel: 'Other',
    },
  };

  const key = (category || 'other').toString().toLowerCase();
  const config = categoryConfig[key] || categoryConfig.other;
  const displayLabel = label || config.defaultLabel;
  const IconComponent = config.Icon || HelpCircle;

  const iconSize = size === 'sm' ? 12 : 14;

  const sizeStyle = size === 'sm'
    ? { padding: '2px 8px', fontSize: '0.75rem', gap: '4px' }
    : { padding: '4px 10px', fontSize: '0.825rem', gap: '6px' };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: '600',
        borderRadius: 'var(--radius-full)',
        backgroundColor: config.bg,
        color: config.color,
        ...sizeStyle,
      }}
    >
      <IconComponent size={iconSize} />
      <span>{displayLabel}</span>
    </span>
  );
}
