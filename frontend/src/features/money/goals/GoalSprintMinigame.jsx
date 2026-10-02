import React, { useState, useEffect } from 'react';
import { Zap, Trophy, Sparkles, RefreshCw, CheckCircle2, Sliders, ShieldCheck, Flame, Play, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import MoneyText from '../../../components/MoneyText';
import ProgressBar from '../../../components/ProgressBar';
import { updateGoalProgress } from '../../../api/goals';

/**
 * Trigger lightweight CSS/DOM Confetti Particle Burst
 */
function triggerConfettiBurst() {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  const colors = ['#FF5500', '#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6'];

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.floor(Math.random() * 8) + 6;
    const startX = Math.random() * window.innerWidth;
    const startY = -20;
    const endX = startX + (Math.random() * 200 - 100);
    const endY = window.innerHeight + 50;
    const duration = Math.random() * 1.5 + 1.2;

    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.opacity = '1';
    particle.style.transition = `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(particle);

    setTimeout(() => {
      particle.style.left = `${endX}px`;
      particle.style.top = `${endY}px`;
      particle.style.opacity = '0';
      particle.style.transform = `rotate(${Math.random() * 720}deg) scale(1.4)`;
    }, 20);
  }

  setTimeout(() => {
    container.remove();
  }, 3000);
}

/**
 * GoalSprintMinigame Component
 * Interactive Gamified Goal Sprint Minigame & Automations Engine.
 */
export default function GoalSprintMinigame({ goal, onGoalUpdate }) {
  const { t } = useTranslation('money');

  if (!goal) return null;

  const [currentSaved, setCurrentSaved] = useState(goal.saved);
  const [xp, setXp] = useState(350);
  const [automationToast, setAutomationToast] = useState(null);

  // Automated Rules State
  const [automations, setAutomations] = useState({
    fridayAutoLock: true,
    groceryRoundUp: true,
    sprint80PercentBoost: true,
  });

  const target = goal.target;
  const pct = Math.min(100, Math.round((currentSaved / target) * 100));
  const remaining = Math.max(0, target - currentSaved);
  const isClose = pct >= 60 && pct < 100;

  // Sync internal state if prop updates
  useEffect(() => {
    setCurrentSaved(goal.saved);
  }, [goal.saved]);

  /**
   * Apply Boost to Goal
   */
  const handleBoost = (amount, rewardXp, title) => {
    const newAmount = Math.min(target, currentSaved + amount);
    setCurrentSaved(newAmount);
    setXp((prev) => prev + rewardXp);
    triggerConfettiBurst();

    // Persist goal update
    updateGoalProgress(goal.id, amount);
    if (onGoalUpdate) onGoalUpdate(newAmount);
  };

  /**
   * Run Automation Trigger Simulation
   */
  const handleRunAutomation = () => {
    if (automations.fridayAutoLock) {
      handleBoost(20, 60, 'Friday Auto-Lock');
      setAutomationToast(t('sprint.toastFriday'));
    } else if (automations.groceryRoundUp) {
      handleBoost(12, 40, 'Grocery Round-Up');
      setAutomationToast(t('sprint.toastGrocery'));
    } else {
      setAutomationToast(t('sprint.toastDefault'));
    }

    setTimeout(() => setAutomationToast(null), 4000);
  };

  const toggleAutomation = (key) => {
    setAutomations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card
      style={{
        background: isClose
          ? 'linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 100%)'
          : 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        border: isClose ? '2px solid var(--mukuru-orange)' : '1.5px solid var(--color-border)',
        boxShadow: isClose ? 'var(--shadow-orange)' : 'var(--shadow-sm)',
        margin: '16px 0',
      }}
      className="animate-fade-in"
    >
      {/* Toast Alert Notification for Automations */}
      {automationToast && (
        <div
          style={{
            backgroundColor: '#065F46',
            color: '#FFFFFF',
            padding: '10px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.825rem',
            fontWeight: '700',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-md)',
          }}
          className="animate-fade-in"
        >
          <Zap size={16} color="#34D399" /> {automationToast}
        </div>
      )}

      {/* Header Alert Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: isClose ? 'var(--mukuru-orange)' : '#334155',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={20} className={isClose ? 'pulse' : ''} />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {t('sprint.title', 'Goal Sprint Minigame')}
              {isClose && (
                <span style={{ fontSize: '0.7rem', backgroundColor: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: '800' }}>
                  {t('sprint.closeToGoal', 'CLOSE TO GOAL!')}
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
              {t('sprint.subtitle', 'Interactive daily boost & auto-saver rules')}
            </div>
          </div>
        </div>

        {/* Level & XP Badge */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--mukuru-orange-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Flame size={14} color="var(--mukuru-orange)" /> {t('sprint.xpLabel', { xp })}
          </div>
          <div style={{ fontSize: '0.675rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>
            {t('sprint.level', 'Sprint Saver Level 2')}
          </div>
        </div>
      </div>

      {/* Goal Progress Bar & Remaining Distance */}
      <div style={{ backgroundColor: 'var(--color-bg)', padding: '12px 14px', borderRadius: 'var(--radius-md)', marginBottom: '14px', border: '1px solid var(--color-border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
          <span>{goal.name} ({t('sprint.complete', { pct })})</span>
          <span style={{ color: 'var(--mukuru-orange-dark)' }}>
            <MoneyText amount={remaining} /> {t('sprint.remaining', 'remaining')}
          </span>
        </div>
        <ProgressBar value={pct} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
          <span>{t('sprint.saved', 'Saved:')} <MoneyText amount={currentSaved} /></span>
          <span>{t('sprint.target', 'Target:')} <MoneyText amount={target} /></span>
        </div>
      </div>

      {/* Quick Boost Challenge Cards */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '0.825rem', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Trophy size={16} color="var(--mukuru-orange)" /> {t('sprint.boosters', 'Quick Goal Boosters')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          <button
            onClick={() => handleBoost(15, 30, 'Round-Up Change')}
            style={{
              padding: '10px 8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-secondary)' }}>{t('sprint.boostRoundUp', 'Round-Up')}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--mukuru-orange-dark)', margin: '2px 0' }}>+R15</div>
            <div style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: '700' }}>+30 XP</div>
          </button>

          <button
            onClick={() => handleBoost(35, 70, 'Skip Takeout Coffee')}
            style={{
              padding: '10px 8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-secondary)' }}>{t('sprint.boostCoffee', 'Skip Coffee')}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--mukuru-orange-dark)', margin: '2px 0' }}>+R35</div>
            <div style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: '700' }}>+70 XP</div>
          </button>

          <button
            onClick={() => handleBoost(50, 100, 'Friday Goal Lock')}
            style={{
              padding: '10px 8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-text-secondary)' }}>{t('sprint.boostFriday', 'Friday Lock')}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--mukuru-orange-dark)', margin: '2px 0' }}>+R50</div>
            <div style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: '700' }}>+100 XP</div>
          </button>
        </div>
      </div>

      {/* Smart Automations Manager */}
      <div
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          paddingTop: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ fontSize: '0.825rem', fontWeight: '800', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sliders size={16} color="var(--mukuru-orange)" /> {t('sprint.automations', 'Smart Auto-Saver Rules')}
          </div>
          <button
            onClick={handleRunAutomation}
            style={{
              fontSize: '0.725rem',
              fontWeight: '700',
              color: 'var(--mukuru-orange)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Play size={12} /> {t('sprint.testRun', 'Test Rule Run')}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
            <span>{t('sprint.rule1', 'Auto-Lock R20 every Friday')}</span>
            <input
              type="checkbox"
              checked={automations.fridayAutoLock}
              onChange={() => toggleAutomation('fridayAutoLock')}
              style={{ cursor: 'pointer', accentColor: 'var(--mukuru-orange)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
            <span>{t('sprint.rule2', 'Grocery Purchase Spare Change Round-Up')}</span>
            <input
              type="checkbox"
              checked={automations.groceryRoundUp}
              onChange={() => toggleAutomation('groceryRoundUp')}
              style={{ cursor: 'pointer', accentColor: 'var(--mukuru-orange)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
            <span>{t('sprint.rule3', 'Auto-Deposit R50 when goal hits 80%')}</span>
            <input
              type="checkbox"
              checked={automations.sprint80PercentBoost}
              onChange={() => toggleAutomation('sprint80PercentBoost')}
              style={{ cursor: 'pointer', accentColor: 'var(--mukuru-orange)' }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
