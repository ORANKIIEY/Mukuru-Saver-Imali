import React from 'react';
import Card from '../../components/Card';
import CategoryTag from '../../components/CategoryTag';
import { useLanguage } from '../../i18n';
import { ShoppingBag } from 'lucide-react';

/**
 * GroceryAlertCard Component (Tier 3 feature)
 * Fully translated dynamically via i18n
 * Owned by Role 4
 */
export default function GroceryAlertCard({ alert }) {
  const { t } = useLanguage();

  if (!alert || alert.active === false) return null;

  const title = t('dashboard.groceryAlert.item', alert?.item || 'Mealie Meal Special at Shoprite');
  const description = t('dashboard.groceryAlert.content', alert?.description || 'Mealie Meal is 12% cheaper at Shoprite this week! Save R25 on 10kg.');

  return (
    <Card
      style={{
        backgroundColor: '#FFFBEB',
        border: '1.5px dashed #F59E0B',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <CategoryTag category="groceries" label={t('dashboard.groceryAlert.title', 'Grocery Alert')} size="sm" />
        <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#B45309' }}>
          {alert.discount || '12% OFF'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div
          style={{
            backgroundColor: '#FEF3C7',
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            color: '#B45309',
          }}
        >
          <ShoppingBag size={20} />
        </div>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#78350F' }}>
            {title}
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#92400E', marginTop: '2px' }}>
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
