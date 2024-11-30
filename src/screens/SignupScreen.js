import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SignupScreen = ({ navigation, route }) => {
  const { userType } = route.params; // Determine if it's Student, Parent, or Educator
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleGenerateOtp = async () => {
    try {
      const response = await fetch('http://192.168.137.1:5000/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email,username }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'OTP sent to your email');
        setIsOtpModalVisible(true); // Show OTP verification modal
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
      const response = await fetch('http://192.168.137.1:5000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpVerified(true);
        setIsOtpModalVisible(false); // Hide OTP verification modal
        Alert.alert('Success', 'OTP Verified Successfully');
      } else {
        Alert.alert('Error', data.message || 'OTP verification failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to verify OTP. Please try again later.');
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !username || (userType === 'Student' && !age)) {
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
      const response = await fetch('http://192.168.137.1:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          username,
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
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>

        {/* Signup Form */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {userType === 'Student' && (
            <TextInput
              style={styles.input}
              placeholder="Age"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          )}
          <TouchableOpacity onPress={handleGenerateOtp} style={styles.button}>
            <Text style={styles.buttonText}>Generate OTP</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isOtpModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsOtpModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="numeric"
                placeholderTextColor="#aaa"
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity onPress={handleOtpVerification} style={styles.button}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsOtpModalVisible(false)}
                style={[styles.button, { backgroundColor: '#FF5733' }]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {otpVerified && (
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={handleSignup} style={[styles.button, { marginTop: 20 }]}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 28, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  inputContainer: { marginBottom: 20, alignItems: 'center' },
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
  buttonText: { fontSize: 18, fontWeight: '600', color: '#fff' },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 8,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333', textAlign: 'center' },
});

export default SignupScreen;
