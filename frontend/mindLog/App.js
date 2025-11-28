import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

export default function App() {
  // Concept: useState
  // Multiple states to manage app flow
  const [isLoading, setIsLoading] = useState(true); // Splash screen state
  const [showOnboarding, setShowOnboarding] = useState(true); // Onboarding state

  // Jab Splash Screen ka animation khatam ho jayega
  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  // Jab Onboarding complete ho jayega
  const handleOnboardingFinish = () => {
    setShowOnboarding(false);
  };

  // Concept: Conditional Rendering
  // Step 1: Splash Screen
  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // Step 2: Onboarding Screen
  if (showOnboarding) {
    return <OnboardingScreen onFinish={handleOnboardingFinish} />;
  }

  // Step 3: Main App
  return (
    <View style={styles.container}>
      <Text>Welcome to MindLog! 🎉</Text>
      <Text style={styles.subText}>Your mental wellness companion</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
});

