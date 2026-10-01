// ASSUMES Role 4's client.js exports apiFetch(path, options) -> parsed JSON.
import { apiFetch } from './client';
import mock from '../mocks/simulator.json';

const useMocks = () => import.meta.env.VITE_USE_MOCKS !== 'false';
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const addWeeks = (w) => { const d = new Date(); d.setDate(d.getDate() + w * 7); return d.toISOString(); };

export async function getSimulatorConfig() {
  if (useMocks()) return { sendHome: mock.sendHome, weeklySave: mock.weeklySave };
  return apiFetch('/api/simulator/config');
}

// Mock maths only. In the real app the backend does the maths; the UI just displays it.
function mockRun(scenario, amount) {
  const { goal, baselineWeekly, horizonWeeks } = mock;
  const build = (saved, weekly) => {
    const weeks = Math.ceil((goal.target - saved) / weekly);
    const projected = Math.min(goal.target, saved + weekly * horizonWeeks);
    return { weeks, date: addWeeks(weeks), progress: Math.round((projected / goal.target) * 100) };
  };
  const before = build(goal.saved, baselineWeekly);
  const after = scenario === 'sendHome'
    ? build(Math.max(0, goal.saved - amount), baselineWeekly)
    : build(goal.saved, baselineWeekly + amount);
  return { goal: { name: goal.name, target: goal.target }, horizonWeeks, before, after };
}

export async function runSimulation(scenario, amount) {
  if (useMocks()) { await delay(150); return mockRun(scenario, amount); }
  return apiFetch('/api/simulator', { method: 'POST', body: JSON.stringify({ scenario, amount }) });
}
