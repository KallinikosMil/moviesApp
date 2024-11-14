import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { CustomText, useTheme } from 'drumber-expo-ui-lib';

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggleSwitch = () => {
    toggleTheme(); // Toggles the theme in the Redux state
  };

  return (
    <View style={styles.container}>
      <CustomText style={[styles.text, { color: theme.colors.onSurface }]}>
        Dark Mode
      </CustomText>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={theme.dark ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={handleToggleSwitch}
        value={theme.dark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SettingsScreen;
