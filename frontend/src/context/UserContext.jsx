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
  role: 'customer',
  avatar: 'G',
  income: 8500,
  commitments: 6300,
  available: 2200,
  safeToSave: 500,
  goal: 'Frosty Fridge',
  referralCode: 'MUKURU-GRACE-2026',
  referredBy: null,
  bonusBalance: 0,
};

export const DEFAULT_ADMIN_USER = {
  id: 'user-admin',
  name: 'Mukuru',
  surname: 'Admin',
  fullName: 'Mukuru Operations Administrator',
  email: 'admin@mukuru.com',
  region: 'ZA',
  dialCode: '+27',
  phone: '+27800000000',
  password: 'adminPassword123',
  role: 'admin',
  avatar: 'A',
  income: 35000,
  commitments: 12000,
  available: 23000,
  safeToSave: 8000,
  goal: 'Platform Operations & Reserve',
  referralCode: 'MUKURU-ADMIN-SYS',
  referredBy: null,
  bonusBalance: 500,
};

const UserContext = createContext();

export function UserProvider({ children }) {
  // Load stored registered accounts or fallback to defaults
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('mukuru_registered_users');
    let list = [DEFAULT_DEMO_USER, DEFAULT_ADMIN_USER];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed.map((u) => ({
            ...u,
            role: u.role || (u.email === 'admin@mukuru.com' ? 'admin' : 'customer'),
          }));
          if (!list.some((u) => u.email === 'admin@mukuru.com' || u.role === 'admin')) {
            list.push(DEFAULT_ADMIN_USER);
          }
        }
      } catch (e) {
        // fallback
      }
    }
    return list;
  });

  // Load active logged-in session user
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('mukuru_active_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          role: parsed.role || (parsed.email === 'admin@mukuru.com' ? 'admin' : 'customer'),
        };
      } catch (e) {
        // fallback
      }
    }
    return null; // Default to signed out
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
   * Register a new user account with Name, Surname, Email (optional), Region, Phone, Password, Confirm Password, Referral Code
   */
  const signUp = ({ name, surname, email, region, dialCode, phone, password, confirmPassword, referralCode }) => {
    if (!name || !surname || !phone || !password) {
      throw new Error('Please fill in all required fields.');
    }
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match. Please verify your password.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const cleanPhoneDigits = phone.replaceAll(/\D/g, '');
    if (cleanPhoneDigits.length < 6) {
      throw new Error('Please enter a valid cellphone number.');
    }

    const formattedPhone = phone.startsWith('+') ? phone.trim() : `${dialCode}${phone.trim()}`;
    const cleanPhone = formattedPhone.replaceAll(' ', '');

    const cleanNameTag = name.trim().toUpperCase().replaceAll(/[^A-Z]/g, '');
    const cleanSurnameTag = surname.trim().toUpperCase().replaceAll(/[^A-Z]/g, '');
    const cleanEmail = email && email.trim()
      ? email.trim().toLowerCase()
      : `${(cleanNameTag || 'user').toLowerCase()}.${(cleanSurnameTag || 'saver').toLowerCase()}@mukuru.com`;

    const existing = registeredUsers.find(
      (u) =>
        (email && u.email && u.email.toLowerCase() === cleanEmail) ||
        (u.phone && (
          u.phone.replaceAll(' ', '') === cleanPhone ||
          u.phone.replaceAll(/\D/g, '') === cleanPhoneDigits
        ))
    );
    if (existing) {
      throw new Error('An account with this cellphone number already exists. Please sign in instead.');
    }

    const userRefCode = `MUKURU-${cleanNameTag || 'SAVER'}-${Math.floor(1000 + Math.random() * 9000)}`;
    const hasReferral = Boolean(referralCode && referralCode.trim());

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
      role: (referralCode && referralCode.trim().toUpperCase() === 'MUKURU-ADMIN-KEY') ? 'admin' : 'customer',
      avatar: name.trim().charAt(0).toUpperCase(),
      income: 8500,
      commitments: 6300,
      available: 2200,
      safeToSave: 500,
      goal: `${name.trim()}'s Savings Goal`,
      referralCode: userRefCode,
      referredBy: hasReferral ? referralCode.trim().toUpperCase() : null,
      bonusBalance: hasReferral ? 50 : 0, // Instant R50 referral welcome bonus!
    };

    const nextUsers = [...registeredUsers, newUser];
    setRegisteredUsers(nextUsers);
    setCurrentUser(newUser);
    localStorage.setItem('mukuru_registered_users', JSON.stringify(nextUsers));
    localStorage.setItem('mukuru_active_user', JSON.stringify(newUser));
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
    const cleanDigits = identifier.replaceAll(/\D/g, '');
    const foundUser = registeredUsers.find(
      (u) =>
        (u.email && u.email.toLowerCase() === cleanId) ||
        (u.phone && (
          u.phone.replaceAll(' ', '') === cleanId.replaceAll(' ', '') ||
          u.phone.replaceAll(/\D/g, '') === cleanDigits ||
          (cleanDigits.length >= 7 && u.phone.replaceAll(/\D/g, '').endsWith(cleanDigits))
        )) ||
        (u.name && u.name.toLowerCase() === cleanId)
    );

    if (!foundUser) {
      throw new Error('Account not found. Please check your details or sign up for a new account.');
    }

    if (foundUser.password && foundUser.password !== password) {
      throw new Error('Incorrect password. Please try again.');
    }

    setCurrentUser(foundUser);
    localStorage.setItem('mukuru_active_user', JSON.stringify(foundUser));
    return foundUser;
  };

  /**
   * Toggle user role (admin <-> customer) for authorized administrators
   */
  const toggleUserRole = (userId) => {
    setRegisteredUsers((prev) => {
      const updated = prev.map((u) => {
        if (u.id === userId) {
          const newRole = u.role === 'admin' ? 'customer' : 'admin';
          return { ...u, role: newRole };
        }
        return u;
      });
      localStorage.setItem('mukuru_registered_users', JSON.stringify(updated));
      return updated;
    });

    if (currentUser && currentUser.id === userId) {
      const updatedCurrent = {
        ...currentUser,
        role: currentUser.role === 'admin' ? 'customer' : 'admin',
      };
      setCurrentUser(updatedCurrent);
      localStorage.setItem('mukuru_active_user', JSON.stringify(updatedCurrent));
    }
  };

  /**
   * Update current user's financial profile from manual edit or budget tools
   */
  const updateUserFinancials = ({ income, commitments, safeToSave, goal }) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      income: income !== undefined ? income : currentUser.income,
      commitments: commitments !== undefined ? commitments : currentUser.commitments,
      available: (income !== undefined ? income : currentUser.income) - (commitments !== undefined ? commitments : currentUser.commitments),
      safeToSave: safeToSave !== undefined ? safeToSave : currentUser.safeToSave,
      goal: goal || currentUser.goal,
    };

    setCurrentUser(updated);

    // Sync with registered users array
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? updated : u))
    );
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
        isAdmin: currentUser?.role === 'admin',
        registeredUsers,
        signUp,
        signIn,
        signOut,
        updateUserFinancials,
        toggleUserRole,
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
