import { notificationsData, LocalizedNotification } from '../config/localization/unifiedData';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;  
  date: string;
  image: string;
  isRead: boolean;
}

class NotificationListModel {
  private currentLanguage: 'en' | 'es' = 'es';
  
  // Import notifications from unifiedData
  private notifications: LocalizedNotification[] = notificationsData;

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
  getAllNotifications(): NotificationItem[] {
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
  getRawNotifications(): LocalizedNotification[] {
    return [...this.notifications];
  }

  // Get a single notification by id
  getNotificationById(id: string): NotificationItem | undefined {
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
  addNotification(notification: Omit<LocalizedNotification, 'id'>) {
    const newNotification: LocalizedNotification = {
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
  getUnreadNotifications(): NotificationItem[] {
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