import { apiClient } from './client';

/**
 * Fetch Dashboard Overview Data
 */
export async function getDashboardData() {
  return apiClient('/api/dashboard');
}

/**
 * Fetch Coach Insights Data
 */
export async function getCoachInsights() {
  return apiClient('/api/insights');
}
