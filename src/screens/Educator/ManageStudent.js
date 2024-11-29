import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ManageStudentScreen = ({ navigation }) => {
    const handleAddStudent = () => {
        navigation.navigate('AddStudentScreen');
      };
      
      const handleRemoveStudent = () => {
        navigation.navigate('RemoveStudentScreen');
      };
      

  return (
    <LinearGradient
      colors={['#1e3c72', '#2a5298']}
      style={styles.container}
    >
      <Text style={styles.title}>Manage Students</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddStudent}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRemoveStudent}>
        <Text style={styles.buttonText}>Remove Student</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ff8c42',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginVertical: 15,
    width: '80%',
    alignItems: 'center',
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ManageStudentScreen;
