import React, { useState } from 'react';
import Card from '../../components/Card';
import MoneyText from '../../components/MoneyText';
import { useLanguage } from '../../i18n';
import { Wallet, Calendar, ShieldCheck } from 'lucide-react';

/**
 * MoneySummaryCard Component (Role 4 Owned)
 * Displays monthly overview: Income (R8,500), Commitments (R6,300), Available remainder (R2,200),
 * and suggested Safe to Save (R500), NOT the whole remainder.
 */
export default function MoneySummaryCard({ summary }) {
  const { t } = useLanguage();
  const [timeframe, setTimeframe] = useState('current');

  // Exact figures from the plan
  const dataPresets = {
    current: {
      income: summary?.income || 8500,
      commitments: summary?.commitments || 6300,
      available: summary?.available || 2200,
      suggestedSaving: summary?.suggestedSaving || 500,
      flexibleSavingMax: summary?.flexibleSavingMax || 1700,
      label: 'October 2026',
    },
    previous: {
      income: 8500,
      commitments: 6500,
      available: 2000,
      suggestedSaving: 450,
      flexibleSavingMax: 1550,
      label: 'September 2026',
    },
    average: {
      income: 8500,
      commitments: 6400,
      available: 2100,
      suggestedSaving: 480,
      flexibleSavingMax: 1620,
      label: '3-Month Avg',
    },
  };

  const currentData = dataPresets[timeframe] || dataPresets.current;
  const income = currentData.income;
  const commitments = currentData.commitments;
  const available = currentData.available;
  const suggestedSaving = currentData.suggestedSaving;

  const commitmentsPct = Math.min(100, Math.round((commitments / income) * 100));
  const safeToSavePct = Math.round((suggestedSaving / income) * 100);

  return (
    <Card variant="highlight">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--mukuru-orange-subtle)',
              color: 'var(--mukuru-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Wallet size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', margin: 0 }}>
              {t('dashboard.summary.title', 'Monthly Overview')}
            </h3>
            <span style={{ fontSize: '0.725rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Calendar size={11} /> {currentData.label}
            </span>
          </div>
        </div>

        {/* Timeframe Selector Pill */}
        <div style={{ display: 'flex', backgroundColor: 'var(--color-bg)', padding: '2px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}>
          <button
            onClick={() => setTimeframe('current')}
            style={{
              padding: '3px 8px',
              fontSize: '0.7rem',
              fontWeight: '700',
              borderRadius: 'var(--radius-full)',
              backgroundColor: timeframe === 'current' ? 'var(--mukuru-orange)' : 'transparent',
              color: timeframe === 'current' ? '#FFFFFF' : 'var(--color-text-secondary)',
            }}
          >
            Oct
          </button>
          <button
            onClick={() => setTimeframe('previous')}
            style={{
              padding: '3px 8px',
              fontSize: '0.7rem',
              fontWeight: '700',
              borderRadius: 'var(--radius-full)',
              backgroundColor: timeframe === 'previous' ? 'var(--mukuru-orange)' : 'transparent',
              color: timeframe === 'previous' ? '#FFFFFF' : 'var(--color-text-secondary)',
            }}
          >
            Sep
          </button>
          <button
            onClick={() => setTimeframe('average')}
            style={{
              padding: '3px 8px',
              fontSize: '0.7rem',
              fontWeight: '700',
              borderRadius: 'var(--radius-full)',
              backgroundColor: timeframe === 'average' ? 'var(--mukuru-orange)' : 'transparent',
              color: timeframe === 'average' ? '#FFFFFF' : 'var(--color-text-secondary)',
            }}
          >
            Avg
          </button>
        </div>
      </div>

      {/* Breakdown Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
        <div
          style={{
            backgroundColor: 'var(--color-bg)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '2px' }}>
            {t('dashboard.summary.commitments', 'Commitments')}
          </span>
          <MoneyText amount={commitments} size="md" color="muted" />
          <span style={{ fontSize: '0.675rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '2px' }}>
            Family & Household
          </span>
        </div>

        {/* Suggested Safe to Save: R500 (NOT the whole R2,200 remainder) */}
        <div
          style={{
            backgroundColor: 'var(--mukuru-orange-subtle)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--mukuru-orange-border)',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--mukuru-orange-dark)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <ShieldCheck size={12} /> {t('dashboard.summary.safeToSave', 'Safe-to-Save')}
          </span>
          <MoneyText amount={suggestedSaving} size="lg" color="orange" />
          <span style={{ fontSize: '0.675rem', color: 'var(--mukuru-orange-dark)', display: 'block', marginTop: '2px' }}>
            Suggested (R{available} available)
          </span>
        </div>
      </div>

      {/* Visual Proportion Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
          <span>Commitments ({commitmentsPct}%)</span>
          <span style={{ color: 'var(--mukuru-orange)', fontWeight: '600' }}>Safe-to-Save R{suggestedSaving}</span>
        </div>
        <div
          style={{
            height: '10px',
            width: '100%',
            backgroundColor: '#CBD5E1',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          <div
            style={{
              width: `${commitmentsPct}%`,
              backgroundColor: '#64748B',
              transition: 'width 0.5s ease',
            }}
            title={`Commitments: R${commitments}`}
          />
          <div
            style={{
              width: `${safeToSavePct}%`,
              backgroundColor: 'var(--mukuru-orange)',
              transition: 'width 0.5s ease',
            }}
            title={`Suggested Safe to Save: R${suggestedSaving}`}
          />
        </div>
      </div>
    </Card>
  );
}
