import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Sparkles, CheckCircle2, ShoppingBag, X, ChevronDown, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { useMockToggle } from '../../hooks/useMockToggle';
import { useUser } from '../../context/UserContext';
import AuthModal from '../auth/AuthModal';

/**
 * TopBar Navigation Header Component
 * Contains Mukuru branding, signed-in user account menu, auth modal triggers, notification drawer, and language switcher (EN, ZU, SN).
 */
export default function TopBar() {
  const navigate = useNavigate();
  const { lang, setLanguage, t } = useLanguage();
  const { useMocks, toggleMock } = useMockToggle();
  const { user, signOut } = useUser();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('signin');

  const openAuth = (tabName = 'signin') => {
    setAuthModalTab(tabName);
    setIsAuthModalOpen(true);
    setShowUserModal(false);
  };

  const notifications = [
    {
      id: 'n1',
      title: t('dashboard.notifications.n1_title', 'Safe-to-Save Updated'),
      desc: t('dashboard.notifications.n1_desc', 'Your monthly buffer is calculated at R3,000 after family commitments.'),
      icon: <CheckCircle2 size={16} color="var(--color-success)" />,
      time: 'Just now',
    },
    {
      id: 'n2',
      title: t('dashboard.notifications.n2_title', 'Goal Milestone (20%)'),
      desc: t('dashboard.notifications.n2_desc', 'Frosty Fridge goal reached 20%! You have saved R1,200.'),
      icon: <Sparkles size={16} color="var(--mukuru-orange)" />,
      time: '1h ago',
    },
    {
      id: 'n3',
      title: t('dashboard.notifications.n3_title', 'Grocery Price Alert'),
      desc: t('dashboard.notifications.n3_desc', 'Mealie meal is 12% cheaper at Shoprite this week.'),
      icon: <ShoppingBag size={16} color="#B45309" />,
      time: 'Today',
    },
  ];

  return (
    <>
      <header
        style={{
          backgroundColor: '#1E293B',
          color: '#FFFFFF',
          padding: '12px 18px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Brand & Account Profile Controls */}
          <div style={{ position: 'relative' }}>
            {user ? (
              <button
                onClick={() => setShowUserModal(!showUserModal)}
                aria-label="User Account Menu"
                title="Account Settings & Profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: 'none',
                  background: 'transparent',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-md)',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--mukuru-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    fontSize: '1.1rem',
                    boxShadow: 'var(--shadow-orange)',
                  }}
                >
                  {user.avatar || 'M'}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontWeight: '800',
                        color: 'var(--mukuru-orange)',
                        fontSize: '1rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      MUKURU
                    </span>
                    <span style={{ fontSize: '0.725rem', backgroundColor: '#334155', padding: '2px 6px', borderRadius: '4px', color: '#94A3B8' }}>
                      Money Coach
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{t('common.greeting', 'Good morning')}, <strong style={{ color: '#FFFFFF' }}>{user.name || 'User'}</strong></span>
                    <ChevronDown size={14} color="#94A3B8" />
                  </div>
                </div>
              </button>
            ) : (
              /* Signed Out State -> Show Sign In / Sign Up Buttons */
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontWeight: '800',
                    color: 'var(--mukuru-orange)',
                    fontSize: '1.05rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  MUKURU
                </span>
                <button
                  onClick={() => openAuth('signin')}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '1px solid #475569',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <LogIn size={14} /> Sign In
                </button>
                <button
                  onClick={() => openAuth('signup')}
                  style={{
                    backgroundColor: 'var(--mukuru-orange)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <UserPlus size={14} /> Sign Up
                </button>
              </div>
            )}

            {/* Signed-In Account Card Dropdown */}
            {showUserModal && user && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '46px',
                  width: '290px',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-text-primary)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                  border: '1px solid var(--color-border)',
                  padding: '16px',
                  zIndex: 200,
                }}
                className="animate-fade-in"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={16} color="var(--mukuru-orange)" /> Account Profile
                  </h4>
                  <button onClick={() => setShowUserModal(false)} aria-label="Close Profile Menu" style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                    <X size={16} />
                  </button>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    marginBottom: '14px',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-text-primary)' }}>
                    {user.fullName || user.name}
                  </div>
                  {user.email && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {user.email}
                    </div>
                  )}
                  {user.phone && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      {user.phone}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    signOut();
                    setShowUserModal(false);
                    navigate('/', { replace: true });
                  }}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#FEE2E2',
                    color: '#B91C1C',
                    border: '1px solid #FCA5A5',
                    fontWeight: '700',
                    fontSize: '0.825rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Notification Bell Icon */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Toggle System Alerts and Notifications"
                title="System Alerts & Nudges"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: showNotifications ? 'var(--mukuru-orange)' : '#334155',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  position: 'relative',
                  transition: 'background-color 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <Bell size={18} />
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    backgroundColor: 'var(--mukuru-orange)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #1E293B',
                  }}
                >
                  {notifications.length}
                </span>
              </button>

              {/* Notification Dropdown Panel */}
              {showNotifications && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '44px',
                    width: '310px',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--color-text-primary)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    border: '1px solid var(--color-border)',
                    padding: '12px',
                    zIndex: 200,
                  }}
                  className="animate-fade-in"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: '800' }}>Notifications</h4>
                    <button onClick={() => setShowNotifications(false)} aria-label="Close Notifications" style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                      <X size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'flex-start',
                          padding: '8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--color-bg)',
                        }}
                      >
                        <div style={{ marginTop: '2px' }}>{n.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: '700' }}>
                            <span>{n.title}</span>
                            <span style={{ color: 'var(--color-text-muted)', fontWeight: '400', fontSize: '0.7rem' }}>{n.time}</span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                            {n.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dev-only Mock mode toggle indicator */}
            {import.meta.env.DEV && (
              <button
                onClick={toggleMock}
                aria-label="Toggle Dev API Mocks"
                title="Click to toggle Mock / Live API (Dev-only)"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: useMocks ? '#065F46' : '#991B1B',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {useMocks ? 'MOCKS' : 'LIVE'}
              </button>
            )}

            {/* Language Switcher Pill: EN / ZU / SN */}
            <div
              style={{
                display: 'flex',
                backgroundColor: '#334155',
                borderRadius: 'var(--radius-full)',
                padding: '2px',
              }}
            >
              <button
                onClick={() => setLanguage('en')}
                aria-label="Switch Language to English"
                style={{
                  padding: '4px 7px',
                  fontSize: '0.725rem',
                  fontWeight: '700',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: lang === 'en' ? 'var(--mukuru-orange)' : 'transparent',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('zu')}
                aria-label="Switch Language to isiZulu"
                style={{
                  padding: '4px 7px',
                  fontSize: '0.725rem',
                  fontWeight: '700',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: lang === 'zu' ? 'var(--mukuru-orange)' : 'transparent',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ZU
              </button>
              <button
                onClick={() => setLanguage('sn')}
                aria-label="Switch Language to chiShona"
                style={{
                  padding: '4px 7px',
                  fontSize: '0.725rem',
                  fontWeight: '700',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: lang === 'sn' ? 'var(--mukuru-orange)' : 'transparent',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                SN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </>
  );
}
