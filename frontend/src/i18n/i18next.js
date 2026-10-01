/**
 * react-i18next initialisation
 * Loaded once in main.jsx before <App /> renders.
 *
 * Namespaces:
 *   common    — shared labels
 *   dashboard — dashboard strings
 *   money     — transactions, commitments, goals, safe-to-save
 *   coach     — simulators, chat, Tier 3 screens
 *
 * Supported languages: en (English), zu (isiZulu), sn (chiShona)
 * The language is seeded from localStorage so it stays in sync with LanguageContext.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English
import enCommon    from './locales/en/common.json';
import enDashboard from './locales/en/dashboard.json';
import enMoney     from './locales/en/money.json';
import enCoach     from './locales/en/coach.json';

// isiZulu
import zuCommon    from './locales/zu/common.json';
import zuDashboard from './locales/zu/dashboard.json';
import zuMoney     from './locales/zu/money.json';
import zuCoach     from './locales/zu/coach.json';

// chiShona
import snCommon    from './locales/sn/common.json';
import snDashboard from './locales/sn/dashboard.json';
import snMoney     from './locales/sn/money.json';
import snCoach     from './locales/sn/coach.json';

i18n
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('mukuru_lang') || 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    resources: {
      en: {
        common:    enCommon,
        dashboard: enDashboard,
        money:     enMoney,
        coach:     enCoach,
      },
      zu: {
        common:    zuCommon,
        dashboard: zuDashboard,
        money:     zuMoney,
        coach:     zuCoach,
      },
      sn: {
        common:    snCommon,
        dashboard: snDashboard,
        money:     snMoney,
        coach:     snCoach,
      },
    },
  });

export default i18n;
