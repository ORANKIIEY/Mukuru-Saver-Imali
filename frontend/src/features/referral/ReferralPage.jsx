import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import {
  Gift,
  Copy,
  Check,
  Share2,
  RefreshCw,
  MessageCircle,
  MessageSquare,
  Facebook,
  Twitter,
  Send,
  Mail,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';

export default function ReferralPage() {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [sessionToken, setSessionToken] = useState(() => Date.now().toString(36));

  const userName = user?.name || 'Saver';
  const referralCode = user?.referralCode || `MUKURU-${userName.toUpperCase()}-2026`;

  // Dynamically generated invitation link based on session state & user account
  const dynamicReferralLink = `https://mukuru-moneycoach.app/invite?code=${referralCode}&t=${sessionToken}`;

  // Automatically refresh dynamic session link when page mounts or on refresh button
  const handleRefreshLink = () => {
    setSessionToken(Date.now().toString(36));
  };

  const shareText = `Join me on Mukuru Money Coach to track spending, protect remittances & reach your savings goals! Use my code: ${referralCode} to get a R50 bonus: ${dynamicReferralLink}`;

  // Social Share URLs
  const socialShares = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: '#25D366',
      bgColor: '#DCF8C6',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'SMS Text',
      icon: MessageSquare,
      color: '#0284C7',
      bgColor: '#E0F2FE',
      url: `sms:?body=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
      bgColor: '#E7F1FF',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(dynamicReferralLink)}`,
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: '#0F172A',
      bgColor: '#F1F5F9',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: '#229ED9',
      bgColor: '#E0F7FC',
      url: `https://t.me/share/url?url=${encodeURIComponent(dynamicReferralLink)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: '#EA4335',
      bgColor: '#FCE8E6',
      url: `mailto:?subject=${encodeURIComponent('Join Mukuru Money Coach & Get R50 Bonus')}&body=${encodeURIComponent(shareText)}`,
    },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(dynamicReferralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          color: '#FFFFFF',
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--mukuru-orange)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Gift size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#FFFFFF' }}>
              Referral Rewards Program
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
              Earn R50 for every friend who joins Mukuru Money Coach
            </p>
          </div>
        </div>

        {/* Stats Summary Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: '600' }}>Active Bonus Balance</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#34D399', marginTop: '2px' }}>
              R{user?.bonusBalance || 50}
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', padding: '10px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.725rem', color: '#94A3B8', fontWeight: '600' }}>Friends Invited</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--mukuru-orange-light)', marginTop: '2px' }}>
              2 Friends
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Referral Link Generator Card */}
      <Card variant="default">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={18} color="var(--mukuru-orange)" /> Your Dynamic Referral Link
          </h4>
          <button
            onClick={handleRefreshLink}
            title="Refresh dynamic link token"
            style={{
              fontSize: '0.75rem',
              color: 'var(--mukuru-orange-dark)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <RefreshCw size={14} /> Auto-Refresh Link
          </button>
        </div>

        {/* Code Box */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
            Personal Referral Code
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div
              style={{
                flex: 1,
                padding: '10px 14px',
                backgroundColor: 'var(--mukuru-orange-subtle)',
                border: '1.5px dashed var(--mukuru-orange-border)',
                borderRadius: 'var(--radius-md)',
                fontWeight: '800',
                fontSize: '1rem',
                color: 'var(--mukuru-orange-dark)',
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}
            >
              {referralCode}
            </div>
            <Button
              variant={copied ? 'secondary' : 'primary'}
              onClick={handleCopyCode}
              icon={copied ? <Check size={16} /> : <Copy size={16} />}
              style={{ backgroundColor: copied ? '#10B981' : 'var(--mukuru-orange)', color: '#FFFFFF' }}
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </Button>
          </div>
        </div>

        {/* Link Box */}
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
            Shareable Web Link
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              readOnly
              value={dynamicReferralLink}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontSize: '0.78rem',
                backgroundColor: '#F8FAFC',
                color: 'var(--color-text-secondary)',
                fontWeight: '600',
              }}
            />
            <Button
              variant={copiedLink ? 'secondary' : 'outline'}
              onClick={handleCopyLink}
              icon={copiedLink ? <Check size={16} /> : <Copy size={16} />}
            >
              {copiedLink ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Share on Social Platforms */}
      <Card variant="default">
        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Share2 size={18} color="var(--mukuru-orange)" /> Share via Social Media & Messaging
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {socialShares.map((social) => {
            const Icon = social.icon;
            return (
              <button
                key={social.name}
                onClick={() => handleSocialClick(social.url)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '12px 8px',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${social.bgColor}`,
                  backgroundColor: social.bgColor,
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease',
                }}
              >
                <Icon size={22} color={social.color} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                  {social.name}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* How it Works Guide */}
      <Card variant="default">
        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Users size={18} color="var(--mukuru-orange)" /> How Mukuru Referral Works
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--mukuru-orange-subtle)', color: 'var(--mukuru-orange)', fontWeight: '800', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0 }}>
              1
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>Send Your Unique Link</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                Share your dynamic referral link with friends via WhatsApp, SMS, or Social Media.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--mukuru-orange-subtle)', color: 'var(--mukuru-orange)', fontWeight: '800', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0 }}>
              2
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>Friend Signs Up</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                Your friend registers a new account using your referral code.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--mukuru-orange-subtle)', color: 'var(--mukuru-orange)', fontWeight: '800', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0 }}>
              3
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>Get R50 Reward Each</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                Both you and your friend receive a R50 bonus credited straight to your safe-to-save buffer!
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
