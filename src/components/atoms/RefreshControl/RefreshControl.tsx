import React from 'react';
import { RefreshControl as RNRefreshControl } from 'react-native';

interface RefreshControlProps {
  refreshing: boolean;
  onRefresh: () => void;
  tintColor?: string;
  colors?: string[];
  progressBackgroundColor?: string;
}

export const RefreshControl: React.FC<RefreshControlProps> = ({
  refreshing,
  onRefresh,
  tintColor = '#e53935',
  colors = ['#e53935'],
  progressBackgroundColor = '#ffffff'
}) => {
  return (
    <RNRefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={tintColor}
      colors={colors}
      progressBackgroundColor={progressBackgroundColor}
    />
  );
};