// config/localization/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en, es } from './translations';

const LANGUAGE_KEY = '@app_language';

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};

// Function to get saved language
export const getSavedLanguage = async (): Promise<'en' | 'es'> => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    return (savedLanguage as 'en' | 'es') || 'es'; // Default to Spanish if nothing saved
  } catch (error) {
    console.error('Error loading saved language:', error);
    return 'es';
  }
};

// Function to save language preference
export const saveLanguage = async (language: 'en' | 'es'): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

// Initialize i18n without async (will be initialized in App.tsx)
i18n.use(initReactI18next).init({
  resources,
  lng: 'es', // Default language Spanish (will be overridden by saved preference)
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false
  }
});

// Function to initialize with saved language
export const initializeI18nWithSavedLanguage = async (): Promise<void> => {
  const savedLanguage = await getSavedLanguage();
  await i18n.changeLanguage(savedLanguage);
};

export default i18n;