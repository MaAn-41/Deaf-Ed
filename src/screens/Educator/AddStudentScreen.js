import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AddStudentScreen = ({ route }) => {
  const { educatorEmail, educatorUsername } = route.params;
  const [studentUsername, setStudentUsername] = useState("");
  const [section, setSection] = useState("");

  const handleAddStudent = async () => {
    if (!/^[A-Z]{1}$/.test(section)) {
      Alert.alert(
        "Invalid Section",
        "Section must be a single capital alphabet."
      );
      return;
    }

    try {
      const response = await fetch("http://192.168.1.117:5000/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentUsername,
          educatorUsername,
          section,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Student added successfully!");
        setStudentUsername("");
        setSection("");
      } else {
        Alert.alert("Error", data.message || "Failed to add student.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while adding the student.");
    }
  };

  return (
    <LinearGradient colors={["#FFD59A", "#FFF4D3"]} style={styles.container}>
      <Text style={styles.title}>Add Student</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={studentUsername}
          onChangeText={setStudentUsername}
          placeholder="Enter student username"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          value={section}
          onChangeText={setSection}
          placeholder="Enter section (A-Z)"
          placeholderTextColor="#aaa"
          maxLength={1}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddStudent}>
          <Text style={styles.buttonText}>Add Student</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#000",
    elevation: 3,
  },
  button: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});

export default AddStudentScreen;
