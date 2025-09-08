import { useState, useEffect } from 'react';
import i18n from '../config/localization/i18n';
import { 
  LocalizedText, 
  getText,
  bottomSheetData,
  confirmationModalData,
  demoScreenData
} from '../config/localization/unifiedData';
import NotificationListModel from '../models/NotificationListModel';

export const useUnifiedLocalization = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>(
    (i18n.language as 'en' | 'es') || 'es'
  );

  useEffect(() => {
    // Update model language when i18n language changes
    NotificationListModel.setLanguage(currentLanguage);
  }, [currentLanguage]);

  // Helper to get localized text
  const t = (data: LocalizedText): string => {
    return getText(data, currentLanguage);
  };

  // Helper to switch language
  const switchLanguage = () => {
    const newLang = currentLanguage === 'es' ? 'en' : 'es';
    setCurrentLanguage(newLang);
    i18n.changeLanguage(newLang);
    NotificationListModel.setLanguage(newLang);
  };

  // Get all localized strings for components
  const getBottomSheetStrings = () => ({
    title: t(bottomSheetData.title),
    options: {
      unreadNotifications: t(bottomSheetData.options.unreadNotifications),
      markAsRead: t(bottomSheetData.options.markAsRead),
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
      markReadError: t(demoScreenData.toasts.markReadError)
    }
  });

  return {
    t,
    currentLanguage,
    switchLanguage,
    getBottomSheetStrings,
    getConfirmationModalStrings,
    getDemoScreenStrings
  };
};