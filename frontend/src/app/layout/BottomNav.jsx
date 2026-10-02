import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Target, Gift, Sparkles, Menu } from 'lucide-react';
import { useLanguage } from '../../i18n';

/**
 * BottomNav Navigation Bar Component
 * Mobile-first sticky bottom navigation for Home, Goals, Referral, Coach, and More.
 */
export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { key: 'home', label: t('common.nav.home', 'Home'), path: '/dashboard', icon: Home },
    { key: 'goals', label: t('common.nav.goals', 'Goals'), path: '/goals', icon: Target },
    { key: 'coach', label: t('common.nav.coach', 'Coach'), path: '/coach', icon: Sparkles },
    { key: 'referral', label: t('common.nav.referral', 'Referral'), path: '/referral', icon: Gift },
    { key: 'more', label: t('common.nav.more', 'More'), path: '/more', icon: Menu },
  ];

  return (
    <nav
      className="bottom-nav"
      style={{
        position: 'sticky',
        bottom: 0,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--color-border)',
        justifyContent: 'space-around',
        padding: '8px 0 12px 0',
        zIndex: 100,
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');

        return (
          <button
            key={item.key}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              flex: 1,
              border: 'none',
              backgroundColor: 'transparent',
              color: isActive ? 'var(--mukuru-orange)' : 'var(--color-text-muted)',
              transition: 'color var(--transition-fast)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isActive ? 'var(--mukuru-orange-subtle)' : 'transparent',
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span
              style={{
                fontSize: '0.725rem',
                fontWeight: isActive ? '700' : '500',
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
