import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  Alert
} from 'react-native';
import { NotificationBottomSheet } from '../components/organisms/NotificationBottomSheet/NotificationBottomSheet';
import { ConfirmationModal } from '../components/molecules/ConfirmationModal/ConfirmationModal';
import { NotificationBottomSheetViewModel, LocalizedNotificationItem } from '../viewmodels/NotificationBottomSheetViewModel';
import { Typography } from '../components/atoms/Typography/Typography';
import { RefreshControl } from '../components/atoms/RefreshControl/RefreshControl';
import NotificationListModel from '../models/NotificationListModel';
import { useUnifiedLocalization } from '../hooks/useUnifiedLocalization';

export const DemoScreen: React.FC = () => {
  const { 
    currentLanguage, 
    switchLanguage, 
    getDemoScreenStrings 
  } = useUnifiedLocalization();
  
  const strings = getDemoScreenStrings();
  const [notifications, setNotifications] = useState<LocalizedNotificationItem[]>([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<LocalizedNotificationItem | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load notifications from model on mount and when language changes
  useEffect(() => {
    // Set language in model
    NotificationListModel.setLanguage(currentLanguage);
    // Get localized notifications
    const loadedNotifications = NotificationListModel.getAllNotifications();
    setNotifications(loadedNotifications);
  }, [currentLanguage]);

  // Initialize ViewModel - now with correct types
  const viewModel = new NotificationBottomSheetViewModel(
    setNotifications,
    (message, type) => {
      const alertTitle = type === 'success' ? strings.success : strings.error;
      Alert.alert(alertTitle, message);
    }
  );

  // Pull to refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await viewModel.refreshNotifications();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLongPress = (notification: LocalizedNotificationItem) => {
    setSelectedNotification(notification);
    setShowBottomSheet(true);
  };

  const handleDeleteAll = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteAll = () => {
    viewModel.deleteAllNotifications();
    setShowDeleteConfirmation(false);
    setShowBottomSheet(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const renderNotification = ({ item }: { item: LocalizedNotificationItem }) => {
    return (
      <TouchableOpacity
        style={styles.notificationCard}
        onLongPress={() => handleLongPress(item)}
        delayLongPress={500}
      >
        <View style={styles.notificationContent}>
          {!item.isRead && <View style={styles.unreadDot} />}
          <View style={styles.textContent}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.timestamp}>{formatDate(item.date)}</Text>
          </View>
          <Image 
            source={{ uri: item.image }} 
            style={styles.thumbnail}
            defaultSource={{ uri: 'https://via.placeholder.com/60' }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="title">{strings.title}</Typography>
        <TouchableOpacity 
          style={styles.languageToggle}
          onPress={switchLanguage}
        >
          <Text style={styles.languageText}>
            {currentLanguage.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={notifications.length === 0 ? styles.emptyListContent : styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Typography variant="body">{strings.emptyMessage}</Typography>
          </View>
        }
      />

      <NotificationBottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        onUnreadNotifications={() => {
          viewModel.handleUnreadNotifications();
          setShowBottomSheet(false);
        }}
        onMarkAsRead={() => {
          viewModel.markAllAsRead();
          setShowBottomSheet(false);
        }}
        onDeleteNotifications={() => {
          viewModel.handleDeleteNotifications();
          setShowBottomSheet(false);
        }}
        onDeleteAll={handleDeleteAll}
        onAdminNotifications={() => {
          viewModel.handleAdminNotifications();
          setShowBottomSheet(false);
        }}
      />

      <ConfirmationModal
        visible={showDeleteConfirmation}
        onConfirm={confirmDeleteAll}
        onCancel={() => setShowDeleteConfirmation(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  languageToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#f0f0f0'
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  listContent: {
    padding: 16
  },
  emptyListContent: {
    flex: 1,
    padding: 16
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e53935',
    marginTop: 6,
    marginRight: 8
  },
  textContent: {
    flex: 1,
    marginRight: 12
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20
  },
  timestamp: {
    fontSize: 12,
    color: '#999'
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#f0f0f0'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100
  }
});