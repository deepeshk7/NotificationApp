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
      date: dates.hoursAgo(2),
      image: "https://picsum.photos/200/200?random=2",
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
      date: dates.hoursAgo(5),
      image: "https://picsum.photos/200/200?random=3",
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
      date: dates.hoursAgo(8),
      image: "https://picsum.photos/200/200?random=4",
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
      date: dates.hoursAgo(12),
      image: "https://picsum.photos/200/200?random=5",
      isRead: false
    },
    {
      id: "6",
      title: {
        en: "Sports: Thrilling final",
        es: "Deportes: Final emocionante"
      },
      description: {
        en: "The local team wins in the last minutes and becomes league champion.",
        es: "El equipo local gana en los últimos minutos y se corona campeón de liga."
      },
      date: dates.hoursAgo(18),
      image: "https://picsum.photos/200/200?random=6",
      isRead: false
    },
    {
      id: "7",
      title: {
        en: "New episode available",
        es: "Nuevo episodio disponible"
      },
      description: {
        en: "A new international analysis podcast episode is now live.",
        es: "Un nuevo episodio del podcast de análisis internacional ya está en vivo."
      },
      date: dates.daysAgo(1),
      image: "https://picsum.photos/200/200?random=7",
      isRead: false
    },
    {
      id: "8",
      title: {
        en: "Technology boom",
        es: "Auge tecnológico"
      },
      description: {
        en: "New AI startups are revolutionizing the market worldwide.",
        es: "Nuevas startups de IA están revolucionando el mercado mundial."
      },
      date: dates.daysAgo(1),
      image: "https://picsum.photos/200/200?random=8",
      isRead: false
    },
    {
      id: "9",
      title: {
        en: "New episode available",
        es: "Nuevo episodio disponible"
      },
      description: {
        en: "Don't miss the exclusive interview with international leaders.",
        es: "No te pierdas la entrevista exclusiva con líderes internacionales."
      },
      date: dates.daysAgo(2),
      image: "https://picsum.photos/200/200?random=9",
      isRead: false
    },
    {
      id: "10",
      title: {
        en: "Global economy under pressure",
        es: "Economía global bajo presión"
      },
      description: {
        en: "Analysts warn of inflation and recession risks in 2026.",
        es: "Analistas advierten sobre riesgos de inflación y recesión en 2026."
      },
      date: dates.daysAgo(3),
      image: "https://picsum.photos/200/200?random=10",
      isRead: false
    },
    {
      id: "11",
      title: {
        en: "Public health debate",
        es: "Debate de salud pública"
      },
      description: {
        en: "New healthcare policies spark heated discussions in parliament.",
        es: "Nuevas políticas de salud generan intensas discusiones en el parlamento."
      },
      date: dates.daysAgo(4),
      image: "https://picsum.photos/200/200?random=11",
      isRead: true
    },
    {
      id: "12",
      title: {
        en: "Art and culture",
        es: "Arte y cultura"
      },
      description: {
        en: "International contemporary art exhibition opens in Madrid.",
        es: "Exposición internacional de arte contemporáneo abre en Madrid."
      },
      date: dates.daysAgo(5),
      image: "https://picsum.photos/200/200?random=12",
      isRead: false
    },
    {
      id: "13",
      title: {
        en: "Space technology",
        es: "Tecnología espacial"
      },
      description: {
        en: "A private company announces new plans for Mars missions.",
        es: "Empresa privada anuncia nuevos planes para misiones a Marte."
      },
      date: dates.daysAgo(6),
      image: "https://picsum.photos/200/200?random=13",
      isRead: true
    },
    {
      id: "14",
      title: {
        en: "New episode available",
        es: "Nuevo episodio disponible"
      },
      description: {
        en: "Exclusive interview on economic trends in Latin America.",
        es: "Entrevista exclusiva sobre tendencias económicas en América Latina."
      },
      date: dates.daysAgo(7),
      image: "https://picsum.photos/200/200?random=14",
      isRead: false
    },
    {
      id: "15",
      title: {
        en: "Education in transformation",
        es: "Educación en transformación"
      },
      description: {
        en: "New hybrid models are being introduced in top universities.",
        es: "Nuevos modelos híbridos se implementan en universidades de prestigio."
      },
      date: dates.daysAgo(8),
      image: "https://picsum.photos/200/200?random=15",
      isRead: true
    },
    {
      id: "16",
      title: {
        en: "Government announces reforms",
        es: "Gobierno anuncia reformas"
      },
      description: {
        en: "New labor legislation changes to be implemented next year.",
        es: "Nueva legislación laboral entrará en vigor el próximo año."
      },
      date: dates.daysAgo(10),
      image: "https://picsum.photos/200/200?random=16",
      isRead: true
    },
    {
      id: "17",
      title: {
        en: "Environment at risk",
        es: "Medio ambiente en riesgo"
      },
      description: {
        en: "Reports warn of accelerated deforestation in the Amazon rainforest.",
        es: "Informes alertan sobre deforestación acelerada en la selva amazónica."
      },
      date: dates.daysAgo(12),
      image: "https://picsum.photos/200/200?random=17",
      isRead: true
    },
    {
      id: "18",
      title: {
        en: "Science and health",
        es: "Ciencia y salud"
      },
      description: {
        en: "New scientific discovery could revolutionize medical treatments.",
        es: "Nuevo descubrimiento científico podría revolucionar tratamientos médicos."
      },
      date: dates.daysAgo(14),
      image: "https://picsum.photos/200/200?random=18",
      isRead: false
    },
    {
      id: "19",
      title: {
        en: "Digital security",
        es: "Seguridad digital"
      },
      description: {
        en: "Cyberattacks on companies are increasing, experts advise stronger measures.",
        es: "Aumentan ciberataques a empresas, expertos recomiendan reforzar medidas."
      },
      date: dates.daysAgo(20),
      image: "https://picsum.photos/200/200?random=19",
      isRead: true
    },
    {
      id: "20",
      title: {
        en: "Tourism recovery",
        es: "Recuperación turística"
      },
      description: {
        en: "The global tourism sector shows strong signs of growth.",
        es: "El sector turístico mundial muestra fuertes señales de crecimiento."
      },
      date: dates.daysAgo(30),
      image: "https://picsum.photos/200/200?random=20",
      isRead: true
    }
  ];
  
  // Helper function to get text by current language
  export const getText = (localizedText: LocalizedText, language: 'en' | 'es'): string => {
    return localizedText[language];
  };