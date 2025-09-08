// screens/DemoScreen.tsx
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
import NotificationListModel from '../models/NotificationListModel';
import { useUnifiedLocalization } from '../hooks/useUnifiedLocalization';

// Import all styles from the new structure
import { demoScreenStyles } from '../config/styles/screens/DemoScreenStyles';
import { demoScreenHeaderStyles } from '../config/styles/molecules/DemoScreenHeaderStyles';
import { notificationListStyles } from '../config/styles/organisms/NotificationListStyles';
import { notificationCardStyles } from '../config/styles/molecules/NotificationCardStyles';
import { notificationDotStyles } from '../config/styles/atoms/NotificationDotStyles';

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
        style={notificationCardStyles.notificationCard}
        onLongPress={() => handleLongPress(item)}
        delayLongPress={500}
      >
        <View style={notificationCardStyles.notificationContent}>
          {!item.isRead && <View style={notificationDotStyles.unreadDot} />}
          <View style={notificationCardStyles.textContent}>
            <Text style={notificationCardStyles.notificationTitle}>{item.title}</Text>
            <Text style={notificationCardStyles.notificationMessage} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={notificationCardStyles.timestamp}>{formatDate(item.date)}</Text>
          </View>
          <Image 
            source={{ uri: item.image }} 
            style={notificationCardStyles.thumbnail}
            defaultSource={{ uri: 'https://via.placeholder.com/60' }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={demoScreenStyles.container}>
      <View style={demoScreenHeaderStyles.header}>
        <Typography variant="title">{strings.title}</Typography>
        <TouchableOpacity 
          style={demoScreenHeaderStyles.languageToggle}
          onPress={switchLanguage}
        >
          <Text style={demoScreenHeaderStyles.languageText}>
            {currentLanguage.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          notifications.length === 0 
            ? notificationListStyles.emptyListContent 
            : notificationListStyles.listContent
        }
        ListEmptyComponent={
          <View style={notificationListStyles.emptyContainer}>
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