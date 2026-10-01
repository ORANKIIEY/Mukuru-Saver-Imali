import client from './client';
import mock from '../mocks/safeToSave.json';

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

// GET /api/safe-to-save -> { income, commitments, spending, available, suggested }
export async function getSafeToSave() {
  return useMocks ? mock : client.get('/api/safe-to-save');
}