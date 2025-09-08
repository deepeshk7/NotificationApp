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
      allMarkedRead: {
        en: "All notifications marked as read",
        es: "Todas las notificaciones marcadas como leídas"
      },
      markReadError: {
        en: "Error marking notifications",
        es: "Error al marcar notificaciones"
      }
    }
  };
  
  // Notifications Data with localization
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
      date: "2025-11-12T18:05:00Z",
      image: "https://via.placeholder.com/200",
      isRead: false
    },
    {
      id: "2",
      title: {
        en: "New episode available",
        es: "Nuevo episodio disponible"
      },
      description: {
        en: "You can now watch the new episode of 'The News with Erik Camacho and Yoselin Sánchez'.",
        es: "Ya puedes ver el nuevo capítulo de 'Las Noticias con Erik Camacho y Yoselin Sánchez'."
      },
      date: "2025-11-12T20:49:00Z",
      image: "https://via.placeholder.com/200",
      isRead: false
    },
    {
      id: "3",
      title: {
        en: "Extreme weather hits Europe",
        es: "Clima extremo golpea Europa"
      },
      description: {
        en: "Storms have caused flight delays and power outages in several cities.",
        es: "Las tormentas han causado retrasos en vuelos y cortes de energía en varias ciudades."
      },
      date: "2025-11-12T20:49:00Z",
      image: "https://via.placeholder.com/200",
      isRead: true
    },
    {
      id: "4",
      title: {
        en: "New episode available",
        es: "Nuevo episodio disponible"
      },
      description: {
        en: "The documentary series on Latin American politics premieres a new episode tonight.",
        es: "La serie documental sobre política latinoamericana estrena nuevo episodio esta noche."
      },
      date: "2025-11-12T20:49:00Z",
      image: "https://via.placeholder.com/200",
      isRead: true
    },
    {
      id: "5",
      title: {
        en: "Financial markets rally",
        es: "Mercados financieros al alza"
      },
      description: {
        en: "European stock markets close higher after announcements from the Federal Reserve.",
        es: "Las bolsas europeas cierran en positivo tras anuncios de la Reserva Federal."
      },
      date: "2025-11-12T20:49:00Z",
      image: "https://via.placeholder.com/200",
      isRead: false
    }
    // Add more notifications as needed...
  ];
  
  // Helper function to get text by current language
  export const getText = (localizedText: LocalizedText, language: 'en' | 'es'): string => {
    return localizedText[language];
  };