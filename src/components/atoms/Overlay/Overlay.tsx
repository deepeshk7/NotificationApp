import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native';

interface OverlayProps {
  visible: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

export const Overlay: React.FC<OverlayProps> = ({ visible, onPress, children }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onPress}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  }
});