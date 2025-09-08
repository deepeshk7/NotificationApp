import React, { useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { NotificationBottomSheet } from '../components/organisms/NotificationBottomSheet/NotificationBottomSheet';
import { ConfirmationModal } from '../components/molecules/ConfirmationModal/ConfirmationModal';
import { NotificationBottomSheetViewModel, Notification } from '../viewmodels/NotificationBottomSheetViewModel';
import { Typography } from '../components/atoms/Typography/Typography';

// Mock data for demonstration
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Trump anuncia nuevos aranceles',
    message: 'El expresidente propone imponer aranceles del 10% a todos los productos importados',
    timestamp: '12 nov 2025 | 14:49 CST',
    isRead: false,
    image: 'https://via.placeholder.com/100'
  },
  {
    id: '2',
    title: 'Nuevo episodio disponible',
    message: 'Ya puedes ver el nuevo capítulo de "Las Noticias con Erik Camacho y Yoselin Sánchez"',
    timestamp: '12 nov 2025 | 14:49 CST',
    isRead: false,
    image: 'https://via.placeholder.com/100'
  },
  {
    id: '3',
    title: '¿Te interesan las noticias internacionales?',
    message: 'Puedes seguir los temas globales más relevantes desde tu perfil.',
    timestamp: '12 nov 2025 | 14:49 CST',
    isRead: true,
    image: 'https://via.placeholder.com/100'
  }
];

export const DemoScreen: React.FC = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // Initialize ViewModel
  const viewModel = new NotificationBottomSheetViewModel(
    notifications,
    setNotifications,
    (message, type) => {
      Alert.alert(
        t(`demoScreen.${type}`),
        message
      );
    }
  );

  const handleLongPress = (notification: Notification) => {
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

  const renderNotification = ({ item }: { item: Notification }) => (
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
            {item.message}
          </Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.thumbnail} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Typography variant="title">{t('demoScreen.title')}</Typography>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Typography variant="body">{t('demoScreen.emptyMessage')}</Typography>
          </View>
        }
      />

      <NotificationBottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        onUnreadNotifications={() => {
          viewModel.handleUnreadNotifications();
        }}
        onMarkAsRead={() => {
          viewModel.markAllAsRead();
        }}
        onDeleteNotifications={() => {
          viewModel.handleDeleteNotifications();
        }}
        onDeleteAll={handleDeleteAll}
        onAdminNotifications={() => {
          viewModel.handleAdminNotifications();
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
    borderBottomColor: '#e0e0e0'
  },
  listContent: {
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
    width: 80,
    height: 80,
    borderRadius: 4
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100
  }
});