import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { CustomIcon } from '../../atoms/Icon/Icon';
import { fonts } from '../../../config/fonts.ts';
import { spacing } from '../../../config/styleConsts.ts';

interface BottomSheetOptionProps {
  icon: string;
  iconType?: 'ionicons' | 'material';
  label: string;
  onPress: () => void;
}

export const BottomSheetOption: React.FC<BottomSheetOptionProps> = ({
  icon,
  iconType = 'ionicons',
  label,
  onPress
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={styles.iconContainer}>
        <CustomIcon name={icon} type={iconType} size={22} color="#4A4A4A" />
      </View>
      <Text style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.m,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 28,
    alignItems: 'center',
  },
  label: {
    marginLeft: spacing.xs,
    flex: 1,
    fontSize: 16,
    color: '#2C2C2C',
    fontWeight: '400',
    fontFamily: fonts.notoSerif,  // Using custom font
    letterSpacing: 0,
    lineHeight: 22,
  }
});