import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'drumber-expo-ui-lib';
import { auth } from '../../../firebaseConfig';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  SettingsScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Set up Google Sign-In
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_WEB_CLIENT_ID', // Replace with your actual Web Client ID
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token); // Get Google credential
      signInWithCredential(auth, credential) // Sign in with Google credential
        .then(() => {
          Alert.alert('Success', 'Signed in with Google!');
        })
        .catch((error) => {
          console.error('Google sign-in error:', error);
          Alert.alert('Error', error.message);
        });
    }
  }, [response]);

  // const handleLogin = () => {
  //   signInWithEmailAndPassword(auth, email, password) // Sign in with email and password
  //     .then(() => {
  //       Alert.alert('Success', 'Logged in successfully!');
  //     })
  //     .catch((error) => {
  //       console.error('Login error:', error);
  //       Alert.alert('Error', error.message);
  //     });
  // };
  const handleLogin = () => {
    navigation.navigate('SettingsScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button label="Login" onPress={handleLogin} />
      <Button
        label="Sign in with Google"
        onPress={() => promptAsync()}
        disabled={!request}
      />
      <Button
        label="Register"
        onPress={() => navigation.navigate('RegisterScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});
