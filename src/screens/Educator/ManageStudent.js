import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ManageStudentScreen = ({ navigation, route }) => {
  const { educatorEmail, educatorUsername } = route.params;

  const handleAddStudent = () => {
    navigation.navigate("AddStudentScreen", {
      educatorEmail,
      educatorUsername,
    });
  };

  const handleRemoveStudent = () => {
    navigation.navigate("RemoveStudentScreen", { educatorUsername });
  };

  const handleViewStudent = () => {
    navigation.navigate("ViewStudentsScreen", { educatorUsername });
  };

  return (
    <LinearGradient colors={["#FFD59A", "#FFF4D3"]} style={styles.container}>
      <Text style={styles.title}>Manage Students</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddStudent}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRemoveStudent}>
        <Text style={styles.buttonText}>Remove Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleViewStudent}>
        <Text style={styles.buttonText}>View Students</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginVertical: 15,
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

export default ManageStudentScreen;
