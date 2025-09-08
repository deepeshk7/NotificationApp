// App.tsx (or your main app entry file)
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { initializeI18nWithSavedLanguage } from './src/config/localization/i18n';
import { NotificationScreen } from './src/screens/NotificationScreen';
// Import your navigation or main component here

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize i18n with saved language preference
        await initializeI18nWithSavedLanguage();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing app:', error);
        // Continue with default language even if there's an error
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  // Show loading screen while initializing
  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Your main app content
  return <NotificationScreen />;
  // Or if you have navigation:
  // return <YourNavigationContainer />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  }
});

export default App;