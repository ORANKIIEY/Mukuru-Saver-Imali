import client from './client';
import mock from '../mocks/transactions.json';

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

// GET /api/transactions -> { transactions: [...] }
export async function getTransactions() {
  const res = useMocks ? mock : await client.get('/api/transactions');
  return res.transactions;
}