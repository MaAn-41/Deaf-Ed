import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Importing LinearGradient

const StudentDashboard = () => {
  const [studentName] = useState('John Doe'); // Dummy student name
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const slideAnim = useState(new Animated.Value(-300))[0]; // Initial position for the menu
  const buttonAnim = useState(new Animated.Value(1))[0]; // Button opacity animation

  const handleMenuToggle = () => {
    if (showMenu) {
      // Slide menu out when it's already open
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
      // Buttons slide back to normal position
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide menu in when it's closed
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      // Buttons slide up behind navbar
      Animated.timing(buttonAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    console.log('Logout pressed');
    // Add navigation to login page here
  };

  const handleUpdateProfile = () => {
    console.log('Update Profile pressed');
    // Add navigation to profile update page here
  };

  const handleLesson = () => {
    console.log('Lesson button pressed');
    // Add navigation to lesson page here
  };

  const handleTest = () => {
    console.log('Test button pressed');
    // Add navigation to test page here
  };

  const handleProgressReport = () => {
    console.log('Progress Report button pressed');
    // Add navigation to progress report page here
  };

  return (
    <LinearGradient
      colors={['#4c6ef5', '#1e3c72']} // Gradient colors
      style={styles.container}
    >
      {/* Navbar Button */}
      <TouchableOpacity style={styles.navbarButton} onPress={handleMenuToggle}>
        <Ionicons name="menu" size={30} color="white" />
      </TouchableOpacity>

      {/* Slide-in Menu */}
      <Animated.View
        style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}
      >
        <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUpdateProfile} style={styles.menuItem}>
          <Text style={styles.menuText}>Update Profile</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Welcome, {studentName}!</Text>

      {/* Action Buttons */}
      <Animated.View
        style={[styles.buttonContainer, { opacity: buttonAnim }]} // Control button visibility
      >
        <TouchableOpacity style={styles.button} onPress={handleLesson}>
          <Text style={styles.buttonText}>Lesson</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTest}>
          <Text style={styles.buttonText}>Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleProgressReport}>
          <Text style={styles.buttonText}>Progress Report</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  navbarButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: '#FF8C00', // Orange background for the navbar button
    borderRadius: 30,
  },
  menu: {
    position: 'absolute',
    top: 80,
    left: 0,
    backgroundColor: 'transparent', // Same gradient as the rest of the app
    borderRadius: 8,
    padding: 20,
    elevation: 5,
    height: '100%',
    width: 250, // Width of the slide-in menu
    paddingTop: 50,
  },
  menuItem: {
    paddingVertical: 20,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 100,
  },
  buttonContainer: {
    marginTop: 200, // Adjusted to make sure buttons don't overlap with navbar
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF8C00', // Orange buttons
    padding: 20,
    borderRadius: 15, // More square-like but rounded corners
    width: '80%',
    marginVertical: 15,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default StudentDashboard;
