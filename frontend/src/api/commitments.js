import client from './client';
import mock from '../mocks/commitments.json';

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

// GET /api/commitments -> { commitments: [...] }
export async function getCommitments() {
  const res = useMocks ? mock : await client.get('/api/commitments');
  return res.commitments;
}