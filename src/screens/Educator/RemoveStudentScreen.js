import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const RemoveStudentScreen = ({ route }) => {
  const { educatorUsername } = route.params; // Receive educatorUsername
  const [section, setSection] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFetchStudents = async () => {
    if (!/^[A-Z]{1}$/.test(section)) {
      Alert.alert('Error', 'Section must be a single capital letter.');
      return;
    }

    try {
      const response = await fetch(`http://10.54.5.170:5000/students-by-section`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section, educatorUsername }),
      });

      const data = await response.json();

      if (response.ok) {
        setStudents(data.students);
        if (data.students.length === 0) {
          Alert.alert('No Students', 'No students found in this section.');
        }
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch students.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while fetching students.');
    }
  };

  const handleRemoveStudent = async () => {
    if (!selectedStudent) {
      Alert.alert('Error', 'Please select a student to remove.');
      return;
    }

    try {
      const response = await fetch('http://10.54.5.170:5000/remove-student', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentUsername: selectedStudent, educatorUsername }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Student removed successfully!');
        setStudents(students.filter((student) => student !== selectedStudent));
        setSelectedStudent(null);
      } else {
        Alert.alert('Error', data.message || 'Failed to remove student.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while removing the student.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remove Student</Text>

      <Text style={styles.label}>Enter Section:</Text>
      <TextInput
        style={styles.input}
        value={section}
        onChangeText={setSection}
        placeholder="Enter section (e.g., A)"
      />

      <TouchableOpacity style={styles.button} onPress={handleFetchStudents}>
        <Text style={styles.buttonText}>Fetch Students</Text>
      </TouchableOpacity>

      {students.length > 0 && (
        <>
          <Text style={styles.label}>Select Student:</Text>
          <DropDownPicker
            open={dropdownOpen}
            value={selectedStudent}
            items={students.map((student) => ({
              label: student,
              value: student,
            }))}
            setOpen={setDropdownOpen}
            setValue={setSelectedStudent}
            setItems={setStudents}
            placeholder="Select a student"
            style={styles.dropdown}
          />

          <TouchableOpacity style={styles.button} onPress={handleRemoveStudent}>
            <Text style={styles.buttonText}>Remove Student</Text>
          </TouchableOpacity>
        </>
      )}
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
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdown: {
    width: '80%',
    marginBottom: 20,
  },
});

export default RemoveStudentScreen;
