import { StyleSheet } from 'react-native';

export const notificationCardStyles = StyleSheet.create({
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
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#f0f0f0'
  }
});
