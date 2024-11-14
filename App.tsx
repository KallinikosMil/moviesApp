// App.tsx
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersistGate } from 'redux-persist/integration/react';
import { FontLoader, ThemeProvider, useTheme } from 'drumber-expo-ui-lib';
import { toggleTheme } from './packages/settings/slices/themeSlice';
import { store, persistor } from './redux/store';

import LoginScreen from './packages/authentication/screens/LoginScreen';
import SettingsScreen from './packages/settings/screens/SettingsScreen';
import RegisterScreen from './packages/authentication/screens/RegisterScreen';

import { RootStackParamList } from './navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleFontsLoaded = () => setFontsLoaded(true);

  if (!fontsLoaded) {
    return <FontLoader onLoaded={handleFontsLoaded} />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

const AppContent: React.FC = () => {
  const themeMode = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch();
  const handleToggleTheme = () => dispatch(toggleTheme());

  return (
    <ThemeProvider themeMode={themeMode} toggleTheme={handleToggleTheme}>
      <AppContainer />
    </ThemeProvider>
  );
};

const AppContainer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
