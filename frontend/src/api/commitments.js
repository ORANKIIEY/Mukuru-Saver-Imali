import client from './client';
import mock from '../mocks/commitments.json';

const useMocks = () => localStorage.getItem('mukuru_use_mocks') !== 'false';

// GET /api/commitments -> { commitments: [...] }
export async function getCommitments() {
  const res = useMocks() ? mock : await client.get('/api/commitments');
  return res.commitments;
}