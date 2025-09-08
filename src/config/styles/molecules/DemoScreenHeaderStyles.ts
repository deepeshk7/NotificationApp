import { StyleSheet } from 'react-native';

export const demoScreenHeaderStyles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  languageToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#f0f0f0'
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  }
});