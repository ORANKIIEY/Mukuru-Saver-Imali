import client from './client';
import mock from '../mocks/goals.json';

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

// In mock mode, goals created in the UI live here until the page reloads.
const mockGoals = [...mock.goals];

// GET /api/goals -> { goals: [...] }
export async function getGoals() {
  if (useMocks) return mockGoals;
  return (await client.get('/api/goals')).goals;
}

// GET /api/goals/:id -> goal
export async function getGoal(id) {
  if (useMocks) {
    const goal = mockGoals.find((g) => g.id === id);
    if (!goal) throw new Error('Goal not found');
    return goal;
  }
  return client.get(`/api/goals/${id}`);
}

// POST /api/goals -> goal
export async function createGoal(payload) {
  if (useMocks) {
    const goal = { ...payload, id: `g-${Date.now()}`, saved: 0, status: 'active', milestones: [20, 50, 100] };
    mockGoals.push(goal);
    return goal;
  }
  return client.post('/api/goals', payload);
}
