import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useLanguage } from '../../i18n';
import { Sparkles, MessageSquare } from 'lucide-react';

/**
 * CoachTipCard Component ("One insight at a time")
 * Fully translated dynamically via i18n
 * Owned by Role 4
 */
export default function CoachTipCard({ tip }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const title = t('dashboard.coachTip.title', tip?.title || 'Smart Grocery Insight');
  const content = t('dashboard.coachTip.content', tip?.content || 'You saved R150 on grocery fees this week! Put R100 towards your Frosty Fridge goal to stay on track.');
  const actionText = t('dashboard.coachTip.action', tip?.actionText || 'Chat with Coach');

  return (
    <Card
      style={{
        background: 'linear-gradient(135deg, #FFF0EB 0%, #FFFFFF 100%)',
        border: '1.5px solid var(--mukuru-orange-border)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <span
          style={{
            backgroundColor: 'var(--mukuru-orange)',
            color: '#FFFFFF',
            fontSize: '0.7rem',
            fontWeight: '800',
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Sparkles size={12} /> {t('dashboard.coachTip.badge', 'AI MONEY TIP')}
        </span>
        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--mukuru-dark)' }}>
          {title}
        </h4>
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
        "{content}"
      </p>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/coach')}
          icon={<MessageSquare size={16} />}
        >
          {actionText}
        </Button>
      </div>
    </Card>
  );
}
