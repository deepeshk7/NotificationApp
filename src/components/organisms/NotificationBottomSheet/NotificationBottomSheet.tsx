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
import { useTranslation } from 'react-i18next';
import { CustomIcon } from '../../atoms/Icon/Icon';
import { Overlay } from '../../atoms/Overlay/Overlay';
import { BottomSheetOption } from '../../molecules/BottomSheetOption/BottomSheetOption';
import { fonts } from '../../../config/fonts.ts';
import { spacing, radius } from '../../../config/styleConsts.ts';
import { LocalizedNotificationItem } from '../../../viewmodels/NotificationBottomSheetViewModel';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface NotificationBottomSheetProps {
  visible: boolean;
  selectedNotification?: LocalizedNotificationItem | null; // ADD THIS
  onClose: () => void;
  onUnreadNotifications: () => void;
  onMarkAsRead: () => void;
  onDeleteNotifications: () => void;
  onDeleteAll: () => void;
  onAdminNotifications: () => void;
}

export const NotificationBottomSheet: React.FC<NotificationBottomSheetProps> = ({
  visible,
  selectedNotification, // ADD THIS
  onClose,
  onUnreadNotifications,
  onMarkAsRead,
  onDeleteNotifications,
  onDeleteAll,
  onAdminNotifications
}) => {
  const { t } = useTranslation();
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
      label: t('bottomSheet.options.unreadNotifications'),
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
        ? t('bottomSheet.options.markAsUnread', 'Mark as unread') 
        : t('bottomSheet.options.markAsRead', 'Mark as read'),
      onPress: () => {
        onMarkAsRead();
        onClose();
      }
    },
    {
      icon: 'delete-outline',
      iconType: 'material' as const,
      label: t('bottomSheet.options.deleteNotifications'),
      onPress: () => {
        onDeleteNotifications();
        onClose();
      }
    },
    {
      icon: 'delete-sweep',
      iconType: 'material' as const,
      label: t('bottomSheet.options.deleteAllNotifications'),
      onPress: () => {
        onDeleteAll();
      }
    },
    {
      icon: 'settings',
      iconType: 'material' as const,
      label: t('bottomSheet.options.adminNotifications'),
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
            {t('bottomSheet.title')}
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

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: SCREEN_HEIGHT * 0.75,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#DCDCDC',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#000000',
    fontFamily: fonts.franklinGothicURW,
    letterSpacing: -0.5,
  },
  closeButton: {
    padding: 4,
  },
  optionsContainer: {
    paddingTop: 8,
  },
  bottomPadding: {
    height: Platform.OS === 'ios' ? 34 : spacing.m,
  }
});