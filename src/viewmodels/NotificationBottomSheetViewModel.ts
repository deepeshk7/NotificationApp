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

  // Refresh notifications (simulate API call)
  refreshNotifications = async (): Promise<void> => {
    try {
      // Simulate API delay
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
      
      // In production, this would be an API call:
      // const response = await fetch('/api/notifications');
      // const data = await response.json();
      // NotificationListModel.setNotifications(data);
      
      // For now, just reload from model
      const refreshedNotifications = NotificationListModel.getAllNotifications();
      this.setNotifications(refreshedNotifications);
      
      if (this.showToast) {
        this.showToast(i18n.t('demoScreen.toasts.refreshSuccess', 'Notifications updated'), 'success');
      }
      
      console.log('Notifications refreshed successfully');
    } catch (error) {
      console.error('Error refreshing notifications:', error);
      if (this.showToast) {
        this.showToast(i18n.t('demoScreen.toasts.refreshError'), 'error');
      }
      throw error;
    }
  };

  // Delete all notifications
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

  // Delete a single notification
  deleteSingleNotification = (notificationId: string): void => {
    try {
      // Remove notification from model
      const removed = NotificationListModel.removeNotification(notificationId);
      
      if (removed) {
        // Get updated notifications from model
        const updatedNotifications = NotificationListModel.getAllNotifications();
        this.setNotifications(updatedNotifications);
        
        if (this.showToast) {
          this.showToast(i18n.t('demoScreen.toasts.notificationDeleted', 'Notification deleted'), 'success');
        }
        
        console.log('Notification deleted:', notificationId);
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      if (this.showToast) {
        this.showToast(i18n.t('demoScreen.toasts.deleteError'), 'error');
      }
    }
  };

  // Mark all notifications as read
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

  // Mark a single notification as read
  markSingleAsRead = (notificationId: string): void => {
    try {
      // Mark single notification as read in model
      NotificationListModel.markAsRead(notificationId);
      
      // IMPORTANT: Force a new array to trigger React re-render
      const updatedNotifications = [...NotificationListModel.getAllNotifications()];
      this.setNotifications(updatedNotifications);
      
      if (this.showToast) {
        this.showToast(i18n.t('demoScreen.toasts.markedAsRead', 'Marked as read'), 'success');
      }
      
      console.log('Notification marked as read:', notificationId);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      if (this.showToast) {
        this.showToast(i18n.t('demoScreen.toasts.markReadError'), 'error');
      }
    }
  };

  // Mark a single notification as unread
  markSingleAsUnread = (notificationId: string): void => {
    try {
      // Mark single notification as unread in model
      NotificationListModel.markAsUnread(notificationId);
      
      // Get updated notifications from model
      const updatedNotifications = NotificationListModel.getAllNotifications();
      this.setNotifications(updatedNotifications);
      
      if (this.showToast) {
        this.showToast(i18n.t('demoScreen.toasts.markedAsUnread', 'Marked as unread'), 'success');
      }
      
      console.log('Notification marked as unread:', notificationId);
    } catch (error) {
      console.error('Error marking notification as unread:', error);
      if (this.showToast) {
        this.showToast(i18n.t('demoScreen.toasts.markReadError'), 'error');
      }
    }
  };

  // Get unread count
  getUnreadCount = (): number => {
    return NotificationListModel.getUnreadCount();
  };

  // Get unread notifications
  getUnreadNotifications = (): LocalizedNotificationItem[] => {
    return NotificationListModel.getUnreadNotifications();
  };

  // Get all notifications
  getAllNotifications = (): LocalizedNotificationItem[] => {
    return NotificationListModel.getAllNotifications();
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