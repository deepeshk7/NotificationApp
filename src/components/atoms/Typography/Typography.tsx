import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'title' | 'body' | 'caption';
  style?: TextStyle;
}

const fontSize = {
  xxs: 12,
  xs: 14,
  s: 16,
  m: 18,
  l: 20,
  xl: 22,
};

const lineHeight = {
  s: 16,
  m: 18,
  l: 20,
  xl: 22,
  '2xl': 24,
};

export const Typography: React.FC<TypographyProps> = ({ 
  children, 
  variant = 'body',
  style 
}) => {
  return (
    <Text style={[styles[variant], style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.l,
    lineHeight: lineHeight['2xl'],
    fontWeight: '600',
    color: '#1a1a1a'
  },
  body: {
    fontSize: fontSize.s,
    lineHeight: lineHeight.xl,
    color: '#333333'
  },
  caption: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.m,
    color: '#666666'
  }
});