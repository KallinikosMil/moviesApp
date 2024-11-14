import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'drumber-expo-ui-lib';
import { registerUser } from '../slices/registerSlice'; // Adjust path as needed
import { AppDispatch } from '../../../redux/store'; // Adjust based on your store location

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = async () => {
    const result = await dispatch(registerUser(email, password));

    if (result === true) {
      Alert.alert(
        'Verification Email Sent',
        'Please check your email for the verification link.'
      );
    } else if (typeof result === 'string') {
      Alert.alert('Error', result || 'Registration failed');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button label="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
