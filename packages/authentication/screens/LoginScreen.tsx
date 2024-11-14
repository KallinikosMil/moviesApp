// LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import {
  Button,
  Gap,
  CustomText,
  SPACING,
  TextStyleType,
} from 'drumber-expo-ui-lib';
import { auth } from '../../../firebaseConfig';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types'; // Import the shared type

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_WEB_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert('Success', 'Signed in with Google!');
        })
        .catch((error) => {
          console.error('Google sign-in error:', error);
          Alert.alert('Error', error.message);
        });
    }
  }, [response]);

  const handleLogin = () => {
    navigation.navigate('SettingsScreen');
  };
  const handleRegister = ()=>{
    navigation.navigate('RegisterScreen')
  }
  return (
    <View style={styles.container}>
      <CustomText textStyle={TextStyleType.H1} style={styles.title}>
        Login
      </CustomText>
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
      <Gap gap={SPACING.PADDING_SIZE_12} />
      <Button label="Login" onPress={handleLogin} />
      <Gap gap={SPACING.PADDING_SIZE_12} />
      <Button label="Register" onPress={handleRegister} />
      <Gap gap={SPACING.PADDING_SIZE_12} />
      <Button
        label="Sign in with Google"
        onPress={() => promptAsync()}
        disabled={!request}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
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
