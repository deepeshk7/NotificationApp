import i18n from '../config/localization/i18n';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  image?: string;
}

export class NotificationBottomSheetViewModel {
  private notifications: Notification[];
  private setNotifications: (notifications: Notification[]) => void;
  private showToast?: (message: string, type: 'success' | 'error') => void;

  constructor(
    notifications: Notification[],
    setNotifications: (notifications: Notification[]) => void,
    showToast?: (message: string, type: 'success' | 'error') => void
  ) {
    this.notifications = notifications;
    this.setNotifications = setNotifications;
    this.showToast = showToast;
  }

  deleteAllNotifications = (): void => {
    try {
      // Clear the notifications array
      this.setNotifications([]);
      
      // Show success message with localization
      if (this.showToast) {
        this.showToast(i18n.t('demoScreen.toasts.allDeleted'), 'success');
      }
      
      console.log('All notifications deleted successfully');
    } catch (error) {
      console.error('Error deleting notifications:', error);
      if (this.showToast) {
        this.showToast(i18n.t('demoScreen.toasts.deleteError'), 'error');
      }
    }
  };

  markAllAsRead = (): void => {
    try {
      const updatedNotifications = this.notifications.map(notif => ({
        ...notif,
        isRead: true
      }));
      this.setNotifications(updatedNotifications);
      
      if (this.showToast) {
        this.showToast(i18n.t('demoScreen.toasts.allMarkedRead'), 'success');
      }
      
      console.log('All notifications marked as read');
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      if (this.showToast) {
        this.showToast(i18n.t('demoScreen.toasts.markReadError'), 'error');
      }
    }
  };

  getUnreadCount = (): number => {
    return this.notifications.filter(notif => !notif.isRead).length;
  };

  getUnreadNotifications = (): Notification[] => {
    return this.notifications.filter(notif => !notif.isRead);
  };

  // Placeholder methods for navigation - will be implemented by team
  handleUnreadNotifications = (): void => {
    console.log('Navigate to unread notifications');
    console.log(`Unread count: ${this.getUnreadCount()}`);
    // Navigation logic will be added by team
  };

  handleDeleteNotifications = (): void => {
    console.log('Open delete notifications screen');
    // Navigation logic will be added by team
  };

  handleAdminNotifications = (): void => {
    console.log('Open admin notifications settings');
    // Navigation logic will be added by team
  };
}