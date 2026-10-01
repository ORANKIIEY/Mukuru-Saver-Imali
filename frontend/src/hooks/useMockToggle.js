import { useState, useEffect } from 'react';

/**
 * Shared Custom Hook to toggle between mock mode and live backend API
 */
export function useMockToggle() {
  const [useMocks, setUseMocks] = useState(() => {
    const stored = localStorage.getItem('mukuru_use_mocks');
    return stored !== null ? stored === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('mukuru_use_mocks', useMocks.toString());
  }, [useMocks]);

  const toggleMock = () => {
    setUseMocks((prev) => !prev);
  };

  return { useMocks, toggleMock, setUseMocks };
}
