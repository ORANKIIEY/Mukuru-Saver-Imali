import React, { createContext, useContext, useState, useEffect } from 'react';

export const COUNTRY_REGIONS = [
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: 'ZA' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: 'ZW' },
  { code: 'MW', name: 'Malawi', dialCode: '+265', flag: 'MW' },
  { code: 'MZ', name: 'Mozambique', dialCode: '+258', flag: 'MZ' },
  { code: 'ZM', name: 'Zambia', dialCode: '+260', flag: 'ZM' },
  { code: 'BW', name: 'Botswana', dialCode: '+267', flag: 'BW' },
  { code: 'LS', name: 'Lesotho', dialCode: '+266', flag: 'LS' },
  { code: 'SZ', name: 'Eswatini', dialCode: '+268', flag: 'SZ' },
  { code: 'NA', name: 'Namibia', dialCode: '+264', flag: 'NA' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: 'GB' },
  { code: 'CD', name: 'DR Congo', dialCode: '+243', flag: 'CD' },
  { code: 'UG', name: 'Uganda', dialCode: '+256', flag: 'UG' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: 'KE' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: 'NG' },
];

export const DEFAULT_DEMO_USER = {
  id: 'user-grace',
  name: 'Grace',
  surname: 'Moyo',
  fullName: 'Grace Moyo',
  email: 'grace.moyo@mukuru.com',
  region: 'ZA',
  dialCode: '+27',
  phone: '+27821234567',
  password: 'password123',
  avatar: 'G',
  income: 8500,
  commitments: 6300,
  available: 2200,
  safeToSave: 500,
  goal: 'Frosty Fridge',
};

const UserContext = createContext();

export function UserProvider({ children }) {
  // Load stored registered accounts or fallback to DEFAULT_DEMO_USER
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('mukuru_registered_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // fallback
      }
    }
    return [DEFAULT_DEMO_USER];
  });

  // Load active logged-in session user
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('mukuru_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_DEMO_USER;
  });

  // Save registered users list whenever it changes
  useEffect(() => {
    localStorage.setItem('mukuru_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Save active user session whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('mukuru_active_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('mukuru_active_user');
    }
  }, [currentUser]);

  /**
   * Register a new user account with Name, Surname, Email, Region, Phone, Password, Confirm Password
   */
  const signUp = ({ name, surname, email, region, dialCode, phone, password, confirmPassword }) => {
    if (!name || !surname || !email || !phone || !password) {
      throw new Error('Please fill in all required fields.');
    }
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match. Please verify your password.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail || u.phone.replaceAll(' ', '') === phone.replaceAll(' ', '')
    );
    if (existing) {
      throw new Error('An account with this email or phone number already exists. Please sign in instead.');
    }

    const formattedPhone = phone.startsWith('+') ? phone.trim() : `${dialCode}${phone.trim()}`;
    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      surname: surname.trim(),
      fullName: `${name.trim()} ${surname.trim()}`,
      email: cleanEmail,
      region: region || 'ZA',
      dialCode: dialCode || '+27',
      phone: formattedPhone,
      password,
      avatar: name.trim().charAt(0).toUpperCase(),
      income: 8500,
      commitments: 6300,
      available: 2200,
      safeToSave: 500,
      goal: 'My Savings Goal',
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  /**
   * Sign In with Email/Phone and Password
   */
  const signIn = ({ identifier, password }) => {
    if (!identifier || !password) {
      throw new Error('Please enter your email/phone number and password.');
    }

    const cleanId = identifier.trim().toLowerCase();
    const foundUser = registeredUsers.find(
      (u) =>
        u.email.toLowerCase() === cleanId ||
        u.phone.replaceAll(' ', '') === cleanId.replaceAll(' ', '') ||
        u.name.toLowerCase() === cleanId
    );

    if (!foundUser) {
      throw new Error('Account not found. Please check your details or sign up for a new account.');
    }

    if (foundUser.password && foundUser.password !== password) {
      throw new Error('Incorrect password. Please try again.');
    }

    setCurrentUser(foundUser);
    return foundUser;
  };

  /**
   * Sign Out current user session
   */
  const signOut = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        registeredUsers,
        signUp,
        signIn,
        signOut,
        regions: COUNTRY_REGIONS,
      }}
    >
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
