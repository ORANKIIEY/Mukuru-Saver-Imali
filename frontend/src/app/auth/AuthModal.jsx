import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, COUNTRY_REGIONS } from '../../context/UserContext';
import { useLanguage } from '../../i18n';
import { X, Lock, Phone, User, Globe, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';

export default function AuthModal({ isOpen, onClose, initialTab = 'signin' }) {
  const navigate = useNavigate();
  const { signUp, signIn, regions } = useUser();
  const { t } = useLanguage();
  const [tab, setTab] = useState(initialTab); // 'signin' | 'signup'

  // Sign In State
  const [signInId, setSignInId] = useState('');
  const [signInPass, setSignInPass] = useState('');

  // Sign Up State
  const [signUpName, setSignUpName] = useState('');
  const [signUpSurname, setSignUpSurname] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(COUNTRY_REGIONS[0].code); // ZA default
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPass, setSignUpPass] = useState('');
  const [signUpConfirmPass, setSignUpConfirmPass] = useState('');
  const [signUpReferralCode, setSignUpReferralCode] = useState('');

  // Status
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const currentRegionObj = regions.find((r) => r.code === selectedRegion) || COUNTRY_REGIONS[0];

  const handleRegionChange = (e) => {
    const code = e.target.value;
    setSelectedRegion(code);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      signIn({ identifier: signInId, password: signInPass });
      setSuccessMsg(t('common.auth.successSignIn', 'Signed in successfully! Redirecting...'));
      setTimeout(() => {
        onClose();
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      setErrorMsg(err.message || t('common.auth.errorSignIn', 'Failed to sign in.'));
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      signUp({
        name: signUpName,
        surname: signUpSurname,
        region: selectedRegion,
        dialCode: currentRegionObj.dialCode,
        phone: signUpPhone,
        password: signUpPass,
        confirmPassword: signUpConfirmPass,
        referralCode: signUpReferralCode,
      });
      setSuccessMsg(t('common.auth.successSignUp', 'Account created successfully! Welcome to Mukuru Money Coach.'));
      setTimeout(() => {
        onClose();
        navigate('/dashboard');
      }, 600);
    } catch (err) {
      setErrorMsg(err.message || t('common.auth.errorSignUp', 'Failed to create account.'));
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        {/* Header Banner */}
        <div
          style={{
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            padding: '20px',
            position: 'relative',
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          }}
        >
          <button
            onClick={onClose}
            aria-label={t('common.auth.closeModal', 'Close Authentication Modal')}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--mukuru-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1rem',
                color: '#FFFFFF',
              }}
            >
              M
            </div>
            <span style={{ fontFamily: 'var(--font-family-heading)', fontWeight: '800', fontSize: '1rem', letterSpacing: '-0.01em' }}>
              MUKURU <span style={{ color: 'var(--mukuru-orange)' }}>MONEY COACH</span>
            </span>
          </div>

          <p style={{ fontSize: '0.825rem', color: '#94A3B8' }}>
            {tab === 'signin'
              ? t('common.auth.signInSubtitle', 'Sign in to access your money coach & goals')
              : t('common.auth.signUpSubtitle', 'Create a secure account to start saving')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: '#F8FAFC',
          }}
        >
          <button
            onClick={() => {
              setTab('signin');
              setErrorMsg('');
            }}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              backgroundColor: tab === 'signin' ? '#FFFFFF' : 'transparent',
              fontWeight: '700',
              fontSize: '0.9rem',
              color: tab === 'signin' ? 'var(--mukuru-orange)' : 'var(--color-text-secondary)',
              borderBottom: tab === 'signin' ? '3px solid var(--mukuru-orange)' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {t('common.auth.tabSignIn', 'Sign In')}
          </button>
          <button
            onClick={() => {
              setTab('signup');
              setErrorMsg('');
            }}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              backgroundColor: tab === 'signup' ? '#FFFFFF' : 'transparent',
              fontWeight: '700',
              fontSize: '0.9rem',
              color: tab === 'signup' ? 'var(--mukuru-orange)' : 'var(--color-text-secondary)',
              borderBottom: tab === 'signup' ? '3px solid var(--mukuru-orange)' : '3px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {t('common.auth.tabSignUp', 'Sign Up')}
          </button>
        </div>

        {/* Content Form Body */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {errorMsg && (
            <div
              style={{
                backgroundColor: '#FEE2E2',
                color: '#991B1B',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.825rem',
                marginBottom: '14px',
                border: '1px solid #FCA5A5',
              }}
            >
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div
              style={{
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.825rem',
                marginBottom: '14px',
                border: '1px solid #6EE7B7',
                fontWeight: '600',
              }}
            >
              {successMsg}
            </div>
          )}

          {tab === 'signin' ? (
            /* Sign In Form */
            <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  {t('common.auth.labelPhone', 'Cellphone Number')}
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--color-text-muted)' }}>
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0821234567"
                    value={signInId}
                    onChange={(e) => setSignInId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  {t('common.auth.labelPassword', 'Password')}
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--color-text-muted)' }}>
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder={t('common.auth.placeholderPassword', 'Enter your password')}
                    value={signInPass}
                    onChange={(e) => setSignInPass(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 36px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth icon={<ArrowRight size={18} />}>
                {t('common.auth.buttonSignIn', 'Sign In to Mukuru')}
              </Button>
            </form>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleSignUpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                    {t('common.auth.labelFirstName', 'First Name')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('common.auth.labelFirstName', 'First Name')}
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                    {t('common.auth.labelSurname', 'Surname')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('common.auth.labelSurname', 'Surname')}
                    value={signUpSurname}
                    onChange={(e) => setSignUpSurname(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Globe size={14} color="var(--mukuru-orange)" /> {t('common.auth.labelRegion', 'Select Region / Country')}
                </label>
                <select
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.85rem', backgroundColor: '#FFFFFF', fontWeight: '600', outline: 'none' }}
                >
                  {regions.map((r) => (
                    <option key={r.code} value={r.code}>{r.name} ({r.dialCode})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  {t('common.auth.labelPhone', 'Cellphone Number')}
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ padding: '9px 14px', backgroundColor: 'var(--mukuru-orange)', border: '1px solid var(--mukuru-orange)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: '800', color: '#FFFFFF', display: 'flex', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                    {currentRegionObj.dialCode}
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="82 123 4567"
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    style={{ flex: 1, padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                    {t('common.auth.labelPassword', 'Password')}
                  </label>
                  <input
                    type="password"
                    required
                    placeholder={t('common.auth.labelPassword', 'Password')}
                    value={signUpPass}
                    onChange={(e) => setSignUpPass(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                    {t('common.auth.labelConfirmPassword', 'Confirm Password')}
                  </label>
                  <input
                    type="password"
                    required
                    placeholder={t('common.auth.placeholderConfirm', 'Confirm')}
                    value={signUpConfirmPass}
                    onChange={(e) => setSignUpConfirmPass(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '6px', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Gift size={14} color="var(--mukuru-orange)" /> {t('common.auth.labelReferral', 'Referral Code (Optional)')}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--mukuru-orange)', backgroundColor: 'var(--mukuru-orange-subtle)', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>
                    {t('common.auth.referralBonus', 'Get R50 Bonus!')}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. MUKURU-FRIEND"
                  value={signUpReferralCode}
                  onChange={(e) => setSignUpReferralCode(e.target.value.toUpperCase())}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px dashed var(--mukuru-orange-border)', fontSize: '0.85rem', backgroundColor: 'var(--mukuru-orange-subtle)', color: 'var(--mukuru-dark)', fontWeight: '700', outline: 'none', letterSpacing: '0.05em' }}
                />
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth icon={<ShieldCheck size={18} />}>
                {t('common.auth.buttonCreate', 'Create Mukuru Account')}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
