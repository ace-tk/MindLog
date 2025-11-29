import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import UserInfoScreen from './src/screens/UserInfoScreens';
import AppNavigator from './src/navigation/AppNavigator';
import { JournalProvider } from './src/context/JournalContext';

// Main App Component - Yahan se pura app flow control hota hai
// Flow: SplashScreen -> OnboardingScreen -> UserInfoScreen -> HomeScreen
export default function App() {
  // State variables - har screen ko control karne ke liye
  const [isLoading, setIsLoading] = useState(true);           // Splash screen ke liye
  const [showOnboarding, setShowOnboarding] = useState(true); // Onboarding screen ke liye
  const [showUserInfo, setShowUserInfo] = useState(true);     // User info screen ke liye

  // Splash screen complete hone par
  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  // Onboarding complete hone par
  const handleOnboardingFinish = () => {
    setShowOnboarding(false);
  };

  // User info complete hone par
  const handleUserInfoFinish = () => {
    setShowUserInfo(false);
  };

  // Step 1: Splash Screen dikhao
  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Step 2: Onboarding Screen dikhao
  if (showOnboarding) {
    return <OnboardingScreen onFinish={handleOnboardingFinish} />;
  }

  // Step 3: User Info Screen dikhao
  if (showUserInfo) {
    return <UserInfoScreen onFinish={handleUserInfoFinish} />;
  }

  // Step 4: Home Screen with navigation dikhao
  return (
    <PaperProvider>
      <JournalProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <AppNavigator />
            <StatusBar style="auto" />
          </View>
        </NavigationContainer>
      </JournalProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

