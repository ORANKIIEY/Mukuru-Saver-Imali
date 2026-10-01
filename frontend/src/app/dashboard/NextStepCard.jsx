import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useLanguage } from '../../i18n';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

/**
 * NextStepCard Component ("One clear action")
 * Fully translated dynamically via i18n
 * Owned by Role 4
 */
export default function NextStepCard({ nextStep }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const title = t('dashboard.nextStep.title', nextStep?.title || 'Lock in R200 for Safe-to-Save');
  const description = t('dashboard.nextStep.content', nextStep?.description || 'Put R200 aside today before weekend spending to hit your monthly savings target 4 days early.');
  const actionText = t('dashboard.nextStep.action', nextStep?.actionText || 'Lock In R200');
  const actionRoute = nextStep?.actionRoute || '/goals';

  return (
    <Card variant="default">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span
          style={{
            backgroundColor: '#E0F2FE',
            color: '#0369A1',
            fontSize: '0.7rem',
            fontWeight: '700',
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <CheckCircle2 size={12} /> {t('dashboard.nextStep.badge', 'NEXT STEP')}
        </span>
      </div>

      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
        {title}
      </h4>

      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.4', marginBottom: '14px' }}>
        {description}
      </p>

      <Button
        variant="primary"
        size="md"
        fullWidth
        onClick={() => navigate(actionRoute)}
        icon={<ArrowUpRight size={18} />}
      >
        {actionText}
      </Button>
    </Card>
  );
}
