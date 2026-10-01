import { useState, useEffect, useCallback } from 'react';

/**
 * Shared Custom Hook for API Fetching
 * @param {Function} fetchFn - API function returning a promise
 * @param {Array} deps - Dependency array
 */
export function useApi(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      console.error('[useApi Error]', err);
      setError(err.message || 'An error occurred while loading data');
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    execute();
  }, deps);

  return { data, loading, error, refetch: execute };
}
