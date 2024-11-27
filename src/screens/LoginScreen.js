import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation, route }) => {
  const { userType } = route.params; // Determine if it's Student or Educator
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields!');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.117:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', `Welcome, ${userType}!`);
        navigation.navigate(`${userType}Dashboard`); // Redirect to respective dashboard
      } else {
        Alert.alert('Error', data.message || 'Login failed!');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <LinearGradient
      colors={['#1e3c72', '#2a5298']}
      style={styles.container}
    >
      <Text style={styles.title}>{userType} Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() => navigation.navigate('SignupScreen', { userType })}
      >
        <Text style={styles.buttonOutlineText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen',{userType})}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    elevation: 3,
  },
  button: {
    backgroundColor: '#ff8c42',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ff8c42',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonOutlineText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff8c42',
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
