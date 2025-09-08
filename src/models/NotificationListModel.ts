export interface NotificationItem {
    id: string;
    title: {
      en: string;
      es: string;
    };
    description: {
      en: string;
      es: string;
    };
    date: string;
    image: string;
    isRead: boolean;
  }
  
  class NotificationListModel {
    private currentLanguage: 'en' | 'es' = 'es';
    
    private notifications: NotificationItem[] = [
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
        isRead: false,
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
        isRead: false,
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
        isRead: true,
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
        isRead: true,
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
        isRead: false,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: false,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: false,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: false,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: false,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: false,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: true,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: false,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: true,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: false,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: true,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: true,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: true,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: false,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: true,
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
        date: "2025-11-12T20:49:00Z",
        image: "https://via.placeholder.com/200",
        isRead: true,
      },
    ];
  
    // Set current language
    setLanguage(language: 'en' | 'es'): void {
      this.currentLanguage = language;
    }
  
    // Get current language
    getCurrentLanguage(): 'en' | 'es' {
      return this.currentLanguage;
    }
  
    // Get localized text helper
    private getLocalizedText(text: { en: string; es: string }): string {
      return text[this.currentLanguage];
    }
  
    // Get all notifications with current language
    getAllNotifications(): any[] {
      return this.notifications.map(notif => ({
        id: notif.id,
        title: this.getLocalizedText(notif.title),
        description: this.getLocalizedText(notif.description),
        date: notif.date,
        image: notif.image,
        isRead: notif.isRead
      }));
    }
  
    // Get raw notifications (with both languages)
    getRawNotifications(): NotificationItem[] {
      return [...this.notifications];
    }
  
    // Get a single notification by id
    getNotificationById(id: string): any | undefined {
      const notif = this.notifications.find(notification => notification.id === id);
      if (!notif) return undefined;
      
      return {
        id: notif.id,
        title: this.getLocalizedText(notif.title),
        description: this.getLocalizedText(notif.description),
        date: notif.date,
        image: notif.image,
        isRead: notif.isRead
      };
    }
  
    // Add a new notification
    addNotification(notification: Omit<NotificationItem, 'id'>) {
      const newNotification: NotificationItem = {
        ...notification,
        id: (this.notifications.length + 1).toString(),
      };
      this.notifications.unshift(newNotification);
      return {
        id: newNotification.id,
        title: this.getLocalizedText(newNotification.title),
        description: this.getLocalizedText(newNotification.description),
        date: newNotification.date,
        image: newNotification.image,
        isRead: newNotification.isRead
      };
    }
  
    // Remove a notification by id
    removeNotification(id: string): boolean {
      const initialLength = this.notifications.length;
      this.notifications = this.notifications.filter(notification => notification.id !== id);
      return this.notifications.length !== initialLength;
    }
  
    // Mark all as read
    markAllAsRead(): void {
      this.notifications = this.notifications.map(notification => ({
        ...notification,
        isRead: true
      }));
    }
  
    // Delete all notifications
    deleteAllNotifications(): void {
      this.notifications = [];
    }
  
    // Get unread notifications
    getUnreadNotifications(): any[] {
      return this.notifications
        .filter(notification => !notification.isRead)
        .map(notif => ({
          id: notif.id,
          title: this.getLocalizedText(notif.title),
          description: this.getLocalizedText(notif.description),
          date: notif.date,
          image: notif.image,
          isRead: notif.isRead
        }));
    }
  
    // Mark single notification as read
    markAsRead(id: string): void {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.isRead = true;
      }
    }
  
    // Get unread count
    getUnreadCount(): number {
      return this.notifications.filter(notif => !notif.isRead).length;
    }
  }
  
  export default new NotificationListModel();