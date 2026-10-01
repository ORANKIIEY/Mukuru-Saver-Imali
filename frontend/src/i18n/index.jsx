import React, { createContext, useContext, useState, useEffect } from 'react';

import enCommon from './locales/en/common.json';
import enDashboard from './locales/en/dashboard.json';
import zuCommon from './locales/zu/common.json';
import zuDashboard from './locales/zu/dashboard.json';
import snCommon from './locales/sn/common.json';
import snDashboard from './locales/sn/dashboard.json';

const translations = {
  en: {
    common: enCommon,
    dashboard: enDashboard,
  },
  zu: {
    common: zuCommon,
    dashboard: zuDashboard,
  },
  sn: {
    common: snCommon,
    dashboard: snDashboard,
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('mukuru_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('mukuru_lang', lang);
  }, [lang]);

  const setLanguage = (newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
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
