import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  type?: 'ionicons' | 'material';
}

export const CustomIcon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = '#333',
  type = 'ionicons' 
}) => {
  if (type === 'material') {
    return <MaterialIcon name={name} size={size} color={color} />;
  }
  return <Icon name={name} size={size} color={color} />;
};