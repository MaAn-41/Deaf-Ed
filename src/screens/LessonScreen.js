import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const LessonScreen = () => {
  const navigation = useNavigation();

  // Show "Coming Soon" alert
  const showComingSoon = (moduleName) => {
    Alert.alert(
      `${moduleName} Module`,
      `${moduleName} module is coming soon!`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.gradientBackground}>
        {/* Screen Header */}
        <Text style={styles.headerText}>Select a Lesson</Text>

        {/* Buttons for Lessons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EnglishLessonScreen')}
          >
            <Text style={styles.buttonText}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CountingLessonScreen')}
          >
            <Text style={styles.buttonText}>Counting</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => showComingSoon('Foundational Words')}
          >
            <Text style={styles.buttonText}>Foundational Words</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => showComingSoon('Urdu')}
          >
            <Text style={styles.buttonText}>Urdu</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default LessonScreen;
