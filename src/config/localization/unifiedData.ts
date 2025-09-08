// config/localization/unifiedData.ts
// Unified localization data structure with both languages

export interface LocalizedText {
    en: string;
    es: string;
  }
  
  export interface LocalizedNotification {
    id: string;
    title: LocalizedText;
    description: LocalizedText;
    date: string;
    image: string;
    isRead: boolean;
  }
  
  // Bottom Sheet Options
  export const bottomSheetData = {
    title: {
      en: "Options",
      es: "Opciones"
    },
    options: {
      unreadNotifications: {
        en: "Unread notifications",
        es: "Notificaciones sin leer"
      },
      markAsRead: {
        en: "Mark as read",
        es: "Marcar como leído"
      },
      
      markAsUnread: {  // ADD THIS
        en: "Mark as unread",
        es: "Marcar como no leído"
      },
      deleteNotifications: {
        en: "Delete notifications",
        es: "Eliminar notificaciones"
      },
      deleteAllNotifications: {
        en: "Delete all notifications",
        es: "Eliminar todas las notificaciones"
      },
      adminNotifications: {
        en: "Manage notifications",
        es: "Administrar notificaciones"
      }
    }
  };
  
  // Confirmation Modal
  export const confirmationModalData = {
    deleteAll: {
      title: {
        en: "Do you want to delete all notifications?",
        es: "¿Quieres borrar todas las notificaciones?"
      },
      message: {
        en: "Deleting all notifications will remove all content from your notification tray.",
        es: "Borrar todas las notificaciones eliminará todo el contenido de tu bandeja de notificaciones."
      },
      subtitle: {
        en: "This action cannot be undone. Do you want to continue?",
        es: "Esta acción no se puede deshacer. ¿Quieres continuar?"
      },
      confirmButton: {
        en: "Delete all",
        es: "Eliminar todo"
      },
      cancelButton: {
        en: "Cancel",
        es: "Cancelar"
      }
    }
  };
  
  // Demo Screen
  export const demoScreenData = {
    title: {
      en: "My notifications",
      es: "Mis notificaciones"
    },
    emptyMessage: {
      en: "You have no notifications",
      es: "No tienes notificaciones"
    },
    success: {
      en: "Success",
      es: "Éxito"
    },
    error: {
      en: "Error",
      es: "Error"
    },
    toasts: {
      allDeleted: {
        en: "All notifications deleted",
        es: "Todas las notificaciones eliminadas"
      },
      deleteError: {
        en: "Error deleting notifications",
        es: "Error al eliminar notificaciones"
      },
      allMarkedRead: {  // THIS WAS MISSING
        en: "All notifications marked as read",
        es: "Todas las notificaciones marcadas como leídas"
      },
      markReadError: {
        en: "Error marking notifications",
        es: "Error al marcar notificaciones"
      },
      markedAsRead: {  // ADD THIS
        en: "Marked as read",
        es: "Marcado como leído"
      },
      markedAsUnread: {  // ADD THIS
        en: "Marked as unread",
        es: "Marcado como no leído"
      },
      refreshSuccess: {
        en: "Notifications updated",
        es: "Notificaciones actualizadas"
      },
      refreshError: {
        en: "Failed to refresh",
        es: "Error al actualizar"
      }
    }
  };
  
  // Generate dynamic dates based on current time
  const generateDates = () => {
    const now = new Date();
    return {
      minutesAgo: (minutes: number) => new Date(now.getTime() - minutes * 60 * 1000).toISOString(),
      hoursAgo: (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString(),
      daysAgo: (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString(),
    };
  };
  
  const dates = generateDates();
  
  // Notifications Data with localization - All 20 notifications with varied dates and random images
  export const notificationsData: LocalizedNotification[] = [
    {
      id: "1",
      title: {
        en: "Trump announces new tariffs",
        es: "Trump anuncia nuevos aranceles"
      },
      description: {
        en: "The former president proposes imposing 10% tariffs on all imported products.",
        es: "El expresidente propone imponer aranceles del 10% a todos los productos importados."
      },
      date: dates.minutesAgo(30),
      image: "https://picsum.photos/200/200?random=1",
      isRead: false
    },
    
  ];
  
  // Helper function to get text by current language
  export const getText = (localizedText: LocalizedText, language: 'en' | 'es'): string => {
    return localizedText[language];
  };