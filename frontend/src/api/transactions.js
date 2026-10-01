import client from './client';
import mock from '../mocks/transactions.json';

const useMocks = () => localStorage.getItem('mukuru_use_mocks') !== 'false';

// GET /api/transactions -> { transactions: [...] }
export async function getTransactions() {
  const res = useMocks() ? mock : await client.get('/api/transactions');
  return res.transactions;
}