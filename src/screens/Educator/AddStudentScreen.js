import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AddStudentScreen = ({ route }) => {
  const { educatorEmail, educatorUsername } = route.params; 
  const [studentUsername, setStudentUsername] = useState('');
  const [section, setSection] = useState('');

  const handleAddStudent = async () => {
    if (!/^[A-Z]{1}$/.test(section)) {
      Alert.alert('Invalid Section', 'Section must be a single capital alphabet.');
      return;
    }

    try {
      const response = await fetch('http://192.168.137.128:5000/add-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentUsername,
          educatorUsername,
          section,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Student added successfully!');
        setStudentUsername(''); 
        setSection('');
      } else {
        Alert.alert('Error', data.message || 'Failed to add student.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding the student.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student</Text>
      <Text style={styles.label}>Student Username:</Text>
      <TextInput
        style={styles.input}
        value={studentUsername}
        onChangeText={setStudentUsername}
        placeholder="Enter student username"
      />
      <Text style={styles.label}>Section (One Capital Letter):</Text>
      <TextInput
        style={styles.input}
        value={section}
        onChangeText={setSection}
        placeholder="Enter section (A-Z)"
        maxLength={1}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddStudent}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>
    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff8c42',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddStudentScreen;
