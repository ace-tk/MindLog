import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { JournalProvider } from './src/context/JournalContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <JournalProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <AppNavigator />
        </View>
      </NavigationContainer>
    </JournalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
});
