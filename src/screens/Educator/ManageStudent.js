import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ManageStudentScreen = ({navigation,route }) => {
  const { educatorEmail, educatorUsername } = route.params; 
  const handleAddStudent = () => {
    navigation.navigate('AddStudentScreen', { educatorEmail, educatorUsername }); 
  };

  const handleRemoveStudent = () => {
    navigation.navigate('RemoveStudentScreen', { educatorEmail, educatorUsername }); 
  };

  return (
    <LinearGradient
      colors={['#1e3c72', '#2a5298']}
      style={styles.container}
    >
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
  infoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
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
