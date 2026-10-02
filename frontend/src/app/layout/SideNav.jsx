import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Target, Gift, Sparkles, Menu } from 'lucide-react';
import { useLanguage } from '../../i18n';

/**
 * SideNav — Vertical sidebar navigation for desktop web layout.
 * Replaces the mobile BottomNav on screens wider than 768px.
 */
export default function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { key: 'home',     label: t('common.nav.home',     'Home'),     path: '/dashboard', icon: Home },
    { key: 'goals',    label: t('common.nav.goals',    'Goals'),    path: '/goals',     icon: Target },
    { key: 'coach',    label: t('common.nav.coach',    'Coach'),    path: '/coach',     icon: Sparkles },
    { key: 'referral', label: t('common.nav.referral', 'Referral'), path: '/referral',  icon: Gift },
    { key: 'more',     label: t('common.nav.more',     'More'),     path: '/more',      icon: Menu },
  ];

  return (
    <nav className="side-nav" aria-label="Main Navigation">
      {/* Divider label */}
      <p
        style={{
          fontSize: '0.65rem',
          fontWeight: '700',
          letterSpacing: '0.1em',
          color: '#475569',
          textTransform: 'uppercase',
          padding: '0 10px',
          marginBottom: '8px',
        }}
      >
        Navigation
      </p>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          location.pathname === item.path ||
          (item.path === '/dashboard' && location.pathname === '/');

        return (
          <button
            key={item.key}
            onClick={() => navigate(item.path)}
            aria-current={isActive ? 'page' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: isActive ? 'rgba(255, 85, 0, 0.15)' : 'transparent',
              color: isActive ? 'var(--mukuru-orange-light)' : '#94A3B8',
              fontWeight: isActive ? '700' : '500',
              fontSize: '0.9rem',
              textAlign: 'left',
              transition: 'background-color 150ms ease, color 150ms ease',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.color = '#E2E8F0';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#94A3B8';
              }
            }}
          >
            <Icon
              size={20}
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            {item.label}

            {/* Active indicator bar */}
            {isActive && (
              <span
                style={{
                  marginLeft: 'auto',
                  width: '4px',
                  height: '18px',
                  borderRadius: '2px',
                  backgroundColor: 'var(--mukuru-orange)',
                  flexShrink: 0,
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
