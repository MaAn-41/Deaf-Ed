import React from 'react';

import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#FFD59A', '#FFF4D3']}
      style={styles.container}
    >
      <Image
        source={require('../../assets/logo.png')} 
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome to DeafED!</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4FC3F7' }]}
        onPress={() => navigation.navigate('LoginScreen', { userType: 'Student' })}
      >
        <Text style={styles.buttonText}>Start Learning</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#8BC34A' }]}
        onPress={() => navigation.navigate('LoginScreen', { userType: 'Educator' })}
      >
        <Text style={styles.buttonText}>Parent Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 0,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF7043',
    lineHeight: 44, 
    marginTop: -15, 
    marginBottom: 20, 
    textAlign: 'center',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default WelcomeScreen;
