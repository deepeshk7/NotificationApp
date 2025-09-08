import i18n from '../config/localization/i18n';
import NotificationListModel from '../models/NotificationListModel';

// Interface for localized notification (what the UI uses)
export interface LocalizedNotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  isRead: boolean;
}

export class NotificationBottomSheetViewModel {
  private setNotifications: (notifications: LocalizedNotificationItem[]) => void;
  private showToast?: (message: string, type: 'success' | 'error') => void;

  constructor(
    setNotifications: (notifications: LocalizedNotificationItem[]) => void,
    showToast?: (message: string, type: 'success' | 'error') => void
  ) {
    this.setNotifications = setNotifications;
    this.showToast = showToast;
  }

  deleteAllNotifications = (): void => {
    try {
      // Clear notifications in model
      NotificationListModel.deleteAllNotifications();
      
      // Update UI state
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
      // Mark all as read in model
      NotificationListModel.markAllAsRead();
      
      // Get updated notifications from model
      const updatedNotifications = NotificationListModel.getAllNotifications();
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
    return NotificationListModel.getUnreadCount();
  };

  getUnreadNotifications = (): LocalizedNotificationItem[] => {
    return NotificationListModel.getUnreadNotifications();
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