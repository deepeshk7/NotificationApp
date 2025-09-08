// hooks/useUnifiedLocalization.ts
import { useState, useEffect } from 'react';
import i18n from '../config/localization/i18n';
import { saveLanguage } from '../config/localization/i18n';
import {
  LocalizedText,
  getText,
  bottomSheetData,
  confirmationModalData,
  demoScreenData
} from '../config/localization/unifiedData';
import NotificationListModel from '../models/NotificationListModel';

// Make sure the function is exported with 'export'
export const useUnifiedLocalization = () => {
  // Fix: Initialize from i18n current language
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>(
    (i18n.language as 'en' | 'es') || 'es'
  );

  useEffect(() => {
    // Update model language when hook language changes
    NotificationListModel.setLanguage(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    // Listen for language changes from i18n
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng as 'en' | 'es');
      NotificationListModel.setLanguage(lng as 'en' | 'es');
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  // Helper to get localized text
  const t = (data: LocalizedText): string => {
    return getText(data, currentLanguage);
  };

  // Fixed switch language function - now with persistence
  const switchLanguage = async () => {
    const newLang = currentLanguage === 'es' ? 'en' : 'es';
    
    // Save the language preference to AsyncStorage (if saveLanguage is implemented)
    try {
      await saveLanguage(newLang);
    } catch (error) {
      console.log('Could not save language preference:', error);
    }
    
    // Update state and i18n
    setCurrentLanguage(newLang);
    i18n.changeLanguage(newLang);
    NotificationListModel.setLanguage(newLang);
  };

  // Add a specific language setter with persistence
  const setLanguage = async (language: 'en' | 'es') => {
    // Save the language preference to AsyncStorage (if saveLanguage is implemented)
    try {
      await saveLanguage(language);
    } catch (error) {
      console.log('Could not save language preference:', error);
    }
    
    // Update state and i18n
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    NotificationListModel.setLanguage(language);
  };

  // Get all localized strings for components
  const getBottomSheetStrings = () => ({
    title: t(bottomSheetData.title),
    options: {
      unreadNotifications: t(bottomSheetData.options.unreadNotifications),
      markAsRead: t(bottomSheetData.options.markAsRead),
      markAsUnread: t(bottomSheetData.options.markAsUnread || { en: "Mark as unread", es: "Marcar como no leído" }),
      deleteNotifications: t(bottomSheetData.options.deleteNotifications),
      deleteAllNotifications: t(bottomSheetData.options.deleteAllNotifications),
      adminNotifications: t(bottomSheetData.options.adminNotifications)
    }
  });

  const getConfirmationModalStrings = () => ({
    title: t(confirmationModalData.deleteAll.title),
    message: t(confirmationModalData.deleteAll.message),
    subtitle: t(confirmationModalData.deleteAll.subtitle),
    confirmButton: t(confirmationModalData.deleteAll.confirmButton),
    cancelButton: t(confirmationModalData.deleteAll.cancelButton)
  });

  const getDemoScreenStrings = () => ({
    title: t(demoScreenData.title),
    emptyMessage: t(demoScreenData.emptyMessage),
    success: t(demoScreenData.success),
    error: t(demoScreenData.error),
    toasts: {
      allDeleted: t(demoScreenData.toasts.allDeleted),
      deleteError: t(demoScreenData.toasts.deleteError),
      allMarkedRead: t(demoScreenData.toasts.allMarkedRead),
      markReadError: t(demoScreenData.toasts.markReadError),
      refreshSuccess: t(demoScreenData.toasts.refreshSuccess || { en: 'Notifications updated', es: 'Notificaciones actualizadas' }),
      refreshError: t(demoScreenData.toasts.refreshError || { en: 'Failed to refresh', es: 'Error al actualizar' })
    }
  });

  return {
    t,
    currentLanguage,
    switchLanguage,
    setLanguage,
    getBottomSheetStrings,
    getConfirmationModalStrings,
    getDemoScreenStrings
  };
};