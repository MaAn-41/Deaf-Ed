import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Importing LinearGradient
import { useNavigation, useRoute } from '@react-navigation/native';

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState(''); // To store actual student name
  const [studentData, setStudentData] = useState(null); // To store other student data
  const [loading, setLoading] = useState(true); // To manage loading state
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params; // Getting email passed from login

  // Effect to fetch student data on component mount
  useEffect(() => {
    const retrieveStudentData = async () => {
      try {
        const response = await fetch(`http://192.168.1.117:5000/students/${email}`);
        const data = await response.json();

        if (response.ok) {
          setStudentName(data.name); // Set actual student name
          setStudentData(data); // Store other student data
        } else {
          Alert.alert('Error', 'Student data not found');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while fetching data');
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    retrieveStudentData(); // Call the function to fetch data when the component mounts
  }, [email]); // Re-run the effect when email changes

  if (loading) {
    return <Text>Loading...</Text>; // Show loading state until data is fetched
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3e8e41', '#2c6f32']} // Gradient colors, adjust as needed
        style={styles.gradientBackground}
      >
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome to the Dashboard, {studentName}!</Text>
          <Text style={styles.emailText}>Email: {studentData?.email}</Text>
          <Text style={styles.ageText}>Age: {studentData?.age}</Text> {/* Display Age */}

          {/* Buttons for Lesson, Test, and Progress Report */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('LessonScreen')}
            >
              <Text style={styles.buttonText}>Lesson</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('TestScreen')}
            >
              <Text style={styles.buttonText}>Test</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ProgressReportScreen')}
            >
              <Text style={styles.buttonText}>Progress Report</Text>
            </TouchableOpacity>
          </View>
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
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  ageText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40, // Adjusted margin
  },
  buttonsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFA500', // Orange color
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
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

export default StudentDashboard;
