import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from './i18next';

import enCommon from './locales/en/common.json';
import enDashboard from './locales/en/dashboard.json';
import enMoney from './locales/en/money.json';
import enCoach from './locales/en/coach.json';

import zuCommon from './locales/zu/common.json';
import zuDashboard from './locales/zu/dashboard.json';
import zuMoney from './locales/zu/money.json';
import zuCoach from './locales/zu/coach.json';

import snCommon from './locales/sn/common.json';
import snDashboard from './locales/sn/dashboard.json';
import snMoney from './locales/sn/money.json';
import snCoach from './locales/sn/coach.json';

const translations = {
  en: {
    common: enCommon,
    dashboard: enDashboard,
    money: enMoney,
    coach: enCoach,
  },
  zu: {
    common: zuCommon,
    dashboard: zuDashboard,
    money: zuMoney,
    coach: zuCoach,
  },
  sn: {
    common: snCommon,
    dashboard: snDashboard,
    money: snMoney,
    coach: snCoach,
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('mukuru_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('mukuru_lang', lang);
    i18n.changeLanguage(lang);
  }, [lang]);

  const setLanguage = (newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
      i18n.changeLanguage(newLang);
    }
  };

  /**
   * Helper function to translate keys e.g. t('common.nav.home') or t('dashboard.welcomeTitle')
   */
  const t = (path, defaultVal = '') => {
    const keys = path.split('.');
    let current = translations[lang];
    
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if missing
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return defaultVal || path;
          }
        }
        return fallback;
      }
    }

    return typeof current === 'string' ? current : (defaultVal || path);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
