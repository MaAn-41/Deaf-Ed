import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SignupScreen = ({ navigation, route }) => {
  const { userType } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [age, setAge] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleGenerateOtp = async () => {
    try {
      const response = await fetch('http://10.54.8.39:5000/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'OTP sent to your email');
        setIsOtpModalVisible(true);
      } else {
        Alert.alert('Error', data.message || 'OTP generation failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to generate OTP. Please try again later.');
    }
  };

  const handleOtpVerification = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    try {
      const response = await fetch('http://10.54.8.39:5000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setOtpVerified(true);
        setIsOtpModalVisible(false);
        Alert.alert('Success', 'OTP Verified Successfully');
      } else {
        Alert.alert('Error', data.message || 'OTP verification failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to verify OTP. Please try again later.');
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !username || !fullname || (userType === 'Student' && !age)) {
      Alert.alert('Error', 'Please fill in all required fields!');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    if (!otpVerified) {
      Alert.alert('Error', 'Please verify your email OTP first');
      return;
    }
    try {
      const response = await fetch('http://10.54.8.39:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          username,
          fullname,
          userType,
          age: userType === 'Student' ? age : undefined,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('LoginScreen', { userType });
      } else if (data.message.includes('username')) {
        Alert.alert('Error', 'This username is already taken. Please choose another.');
      } else {
        Alert.alert('Error', data.message || 'Signup failed!');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <LinearGradient colors={['#FFD59A', '#FFF4D3']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#4B4B4B"
            value={fullname}
            onChangeText={setFullname}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#4B4B4B"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#4B4B4B"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#4B4B4B"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#4B4B4B"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {userType === 'Student' && (
            <TextInput
              style={styles.input}
              placeholder="Age"
              placeholderTextColor="#4B4B4B"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          )}
          <TouchableOpacity onPress={handleGenerateOtp} style={styles.button}>
            <Text style={styles.buttonText}>Generate OTP</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={isOtpModalVisible} onRequestClose={() => setIsOtpModalVisible(false)} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="#4B4B4B"
                keyboardType="numeric"
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity onPress={handleOtpVerification} style={styles.button}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen', { userType })} style={styles.loginLink}>
          <Text style={styles.loginText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF7043',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4B4B4B',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#4B4B4B',
    backgroundColor: '#FFF4D3',
  },
  button: {
    backgroundColor: '#4C8BF5', // Blue color for button to match login page
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  loginLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  loginText: {
    color: '#FF7043', // Same color as login link
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    width: '80%',
  },
});

export default SignupScreen;
