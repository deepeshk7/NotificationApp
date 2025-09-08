import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es } from './translations';

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es', // Default language Spanish
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;