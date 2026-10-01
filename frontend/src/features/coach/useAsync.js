import { useEffect, useState } from 'react';

// Async loading, error, and data hook helper.
export default function useAsync(fn, deps = []) {
  const [state, set] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let live = true;
    set((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((data) => live && set({ data, loading: false, error: null }))
      .catch((error) => live && set({ data: null, loading: false, error }));
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}
