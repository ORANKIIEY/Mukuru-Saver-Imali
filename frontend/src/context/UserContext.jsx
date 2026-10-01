import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const PRESET_USERS = [
  {
    id: 'user-grace',
    name: 'Grace',
    fullName: 'Grace M.',
    avatar: 'G',
    income: 8500,
    commitments: 6300,
    available: 2200,
    safeToSave: 500,
    goal: 'Frosty Fridge',
  },
  {
    id: 'user-tendai',
    name: 'Tendai',
    fullName: 'Tendai M.',
    avatar: 'T',
    income: 9200,
    commitments: 6500,
    available: 2700,
    safeToSave: 600,
    goal: 'School Fees',
  },
  {
    id: 'user-sbusiso',
    name: 'Sbusiso',
    fullName: 'Sbusiso D.',
    avatar: 'S',
    income: 8800,
    commitments: 6200,
    available: 2600,
    safeToSave: 550,
    goal: 'Emergency Fund',
  },
];

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('mukuru_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return PRESET_USERS[0];
  });

  useEffect(() => {
    localStorage.setItem('mukuru_active_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchUser = (userIdOrName) => {
    const preset = PRESET_USERS.find((u) => u.id === userIdOrName || u.name.toLowerCase() === userIdOrName.toLowerCase());
    if (preset) {
      setCurrentUser(preset);
    } else {
      const nameClean = userIdOrName.trim() || 'User';
      setCurrentUser({
        id: `user-${Date.now()}`,
        name: nameClean,
        fullName: `${nameClean} M.`,
        avatar: nameClean.charAt(0).toUpperCase(),
        income: 8500,
        commitments: 6300,
        available: 2200,
        safeToSave: 500,
        goal: 'My Savings Goal',
      });
    }
  };

  const loginUser = (name) => {
    const cleanName = name.trim() || 'User';
    switchUser(cleanName);
  };

  return (
    <UserContext.Provider value={{ user: currentUser, switchUser, loginUser, presetUsers: PRESET_USERS }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
