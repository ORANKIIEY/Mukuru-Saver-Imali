import { apiFetch } from './client';
import mock from '../mocks/groceries.json';

const useMocks = () => import.meta.env.VITE_USE_MOCKS !== 'false';
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function getGroceries() {
  if (useMocks()) return mock;
  return apiFetch('/api/groceries');
}

export async function saveTheSaving(amount) {
  if (useMocks()) { await delay(400); return { ok: true, amount }; }
  return apiFetch('/api/groceries/save', { method: 'POST', body: JSON.stringify({ amount }) });
}
