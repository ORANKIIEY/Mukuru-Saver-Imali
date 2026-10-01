import client from './client';
import mock from '../mocks/safeToSave.json';

const useMocks = () => localStorage.getItem('mukuru_use_mocks') !== 'false';

// GET /api/safe-to-save -> { income, commitments, spending, available, suggested }
export async function getSafeToSave() {
  return useMocks() ? mock : client.get('/api/safe-to-save');
}