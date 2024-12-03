import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const EnglishLessonScreen = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.gradientBackground}>
        <Text style={styles.title}>English Lessons</Text>
        <Text style={styles.subtitle}>Content Coming Soon...</Text>

        <View style={styles.buttonsContainer}>
          {alphabet.map((letter, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={styles.buttonText}>{letter}</Text>
            </TouchableOpacity>
          ))}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 5,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3c72',
  },
});

export default EnglishLessonScreen;
