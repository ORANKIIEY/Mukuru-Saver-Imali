import { apiFetch } from './client';
import mock from '../mocks/coach.json';

const useMocks = () => import.meta.env.VITE_USE_MOCKS !== 'false';
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function pick(message) {
  const m = message.toLowerCase();
  if (/frosty|goal|close|ngisondele/.test(m)) return 'goal';
  if (/send|family|home|ekhaya|thumel/.test(m)) return 'family';
  if (/save|saving|gcina|konga/.test(m)) return 'save';
  return 'default';
}

// The language header is added by client.js; `lang` is only used to pick the mock reply.
export async function sendMessage(message, lang = 'en') {
  if (useMocks()) {
    await delay(900);
    const r = mock.replies[pick(message)];
    return { reply: r[lang] || r.en };
  }
  return apiFetch('/api/coach/chat', { method: 'POST', body: JSON.stringify({ message }) });
}
