import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Typography } from '../../atoms/Typography/Typography';

interface ConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const spacing = {
  xs: 12,
  s: 16,
  m: 20,
  l: 24,
  xl: 28,
};

const radius = {
  m: 8,
  l: 14,
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel
}) => {
  const { t } = useTranslation();
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Typography variant="title" style={styles.title}>
            {t('confirmationModal.deleteAll.title')}
          </Typography>
          <Typography variant="body" style={styles.message}>
            {t('confirmationModal.deleteAll.message')}
          </Typography>
          <Typography variant="caption" style={styles.subtitle}>
            {t('confirmationModal.deleteAll.subtitle')}
          </Typography>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onCancel}
              activeOpacity={0.8}
            >
              <Typography variant="body" style={styles.cancelText}>
                {t('confirmationModal.deleteAll.cancelButton')}
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.confirmButton]} 
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Typography variant="body" style={styles.confirmText}>
                {t('confirmationModal.deleteAll.confirmButton')}
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.l
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: radius.l,
    padding: spacing.xl,
    width: '100%',
    maxWidth: SCREEN_WIDTH - 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.xs,
    textAlign: 'center',
    color: '#1a1a1a',
    lineHeight: 24,
  },
  message: {
    fontSize: 15,
    marginBottom: spacing.xs,
    textAlign: 'center',
    color: '#4A4A4A',
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: spacing.l,
    textAlign: 'center',
    color: '#757575',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: '#DC3545',
  },
  cancelText: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 15,
  },
  confirmText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  }
});