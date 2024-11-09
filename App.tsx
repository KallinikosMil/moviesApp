// App.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontLoader, ThemeProvider, useTheme } from 'drumber-expo-ui-lib';
import LoginScreen from './packages/authentication/screens/LoginScreen';
import SettingsScreen from './packages/settings/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleFontsLoaded = () => setFontsLoaded(true);

  if (!fontsLoaded) {
    return <FontLoader onLoaded={handleFontsLoaded} />;
  }

  return (
    <ThemeProvider initialTheme="light">
      {' '}
      {/* Default to light but will load from storage */}
      <AppContainer />
    </ThemeProvider>
  );
}
const AppContainer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
