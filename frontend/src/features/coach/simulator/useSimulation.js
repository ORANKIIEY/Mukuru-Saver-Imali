import { useEffect, useState } from 'react';
import { runSimulation } from '../../../api/simulator';

// Re-runs the simulation (debounced) whenever the slider amount changes.
export default function useSimulation(scenario, amount) {
  const [state, set] = useState({ result: null, loading: true, error: null });
  useEffect(() => {
    let live = true;
    set((s) => ({ ...s, loading: true }));
    const id = setTimeout(() => {
      runSimulation(scenario, amount)
        .then((result) => live && set({ result, loading: false, error: null }))
        .catch((error) => live && set({ result: null, loading: false, error }));
    }, 250);
    return () => { live = false; clearTimeout(id); };
  }, [scenario, amount]);
  return state;
}
