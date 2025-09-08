import React, { useEffect, useRef } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions,
  BackHandler,
  Platform,
  Text
} from 'react-native';
import { useUnifiedLocalization } from '../../../hooks/useUnifiedLocalization';
import { CustomIcon } from '../../atoms/Icon/Icon';
import { Overlay } from '../../atoms/Overlay/Overlay';
import { BottomSheetOption } from '../../molecules/BottomSheetOption/BottomSheetOption';
import { fonts } from '../../../config/fonts.ts';
import { spacing, radius } from '../../../config/styleConsts.ts';
import { LocalizedNotificationItem } from '../../../viewmodels/NotificationBottomSheetViewModel';
import { notificationBottomSheetStyles as styles } from '../../../config/styles/organisms/NotificationBottomSheetStyles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface NotificationBottomSheetProps {
  visible: boolean;
  selectedNotification?: LocalizedNotificationItem | null;
  onClose: () => void;
  onUnreadNotifications: () => void;
  onMarkAsRead: () => void;
  onDeleteNotifications: () => void;
  onDeleteAll: () => void;
  onAdminNotifications: () => void;
}

export const NotificationBottomSheet: React.FC<NotificationBottomSheetProps> = ({
  visible,
  selectedNotification,
  onClose,
  onUnreadNotifications,
  onMarkAsRead,
  onDeleteNotifications,
  onDeleteAll,
  onAdminNotifications
}) => {
  const { getBottomSheetStrings } = useUnifiedLocalization();
  const strings = getBottomSheetStrings();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }, [visible, translateY]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [visible, onClose]);

  // Dynamically determine if notification is read
  const isRead = selectedNotification?.isRead || false;

  const options = [
    {
      icon: 'notifications-none',
      iconType: 'material' as const,
      label: strings.options.unreadNotifications,
      onPress: () => {
        onUnreadNotifications();
        onClose();
      }
    },
    {
      // DYNAMICALLY CHANGE ICON AND LABEL
      icon: isRead ? 'markunread' : 'check-circle-outline',
      iconType: 'material' as const,
      label: isRead 
        ? strings.options.markAsUnread
        : strings.options.markAsRead,
      onPress: () => {
        onMarkAsRead();
        onClose();
      }
    },
    {
      icon: 'delete-outline',
      iconType: 'material' as const,
      label: strings.options.deleteNotifications,
      onPress: () => {
        onDeleteNotifications();
        onClose();
      }
    },
    {
      icon: 'delete-sweep',
      iconType: 'material' as const,
      label: strings.options.deleteAllNotifications,
      onPress: () => {
        onDeleteAll();
      }
    },
    {
      icon: 'settings',
      iconType: 'material' as const,
      label: strings.options.adminNotifications,
      onPress: () => {
        onAdminNotifications();
        onClose();
      }
    }
  ];

  return (
    <Overlay visible={visible} onPress={onClose}>
      <Animated.View 
        style={[
          styles.bottomSheet,
          { transform: [{ translateY }] }
        ]}
      >
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {strings.title}
          </Text>
          <TouchableOpacity 
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.closeButton}
          >
            <CustomIcon name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <BottomSheetOption
              key={index}
              icon={option.icon}
              iconType={option.iconType}
              label={option.label}
              onPress={option.onPress}
            />
          ))}
        </View>
        
        <View style={styles.bottomPadding} />
      </Animated.View>
    </Overlay>
  );
};

