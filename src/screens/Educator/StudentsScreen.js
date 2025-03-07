import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../../../config";

const StudentsScreen = ({ route }) => {
  const { educatorEmail, educatorUsername } = route.params;

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [studentUsername, setStudentUsername] = useState("");

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    if (selectedSection) fetchStudents();
  }, [selectedSection]);

  const fetchSections = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/sections?educatorEmail=${educatorEmail}`
      );
      const data = await response.json();
      setSections(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch sections");
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/educatorstudents?educatorEmail=${educatorEmail}&section=${selectedSection}`
      );
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch students");
    }
  };

  const addStudent = async () => {
    if (!studentUsername.trim()) {
      Alert.alert("Error", "Please enter a student username");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/educatorstudents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          educatorEmail,
          educatorUsername,
          section: selectedSection,
          studentUsername,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.error || "Failed to add student");
        return;
      }

      setStudents([...students, data]);
      setStudentUsername("");
    } catch (error) {
      Alert.alert("Error", "Failed to add student");
    }
  };

  const deleteStudent = async (id) => {
    try {
      await fetch(`${BASE_URL}/educatorstudents/${id}`, { method: "DELETE" });
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      Alert.alert("Error", "Failed to delete student");
    }
  };

  const renderStudent = ({ item }) => (
    <View style={styles.studentItem}>
      <Text style={styles.studentText}>{item.studentUsername}</Text>
      <TouchableOpacity onPress={() => deleteStudent(item._id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.container}>
      <Text style={styles.title}>Manage Students</Text>

      <Picker
        selectedValue={selectedSection}
        onValueChange={(value) => setSelectedSection(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Section" value="" />
        {sections.map((section) => (
          <Picker.Item
            key={section._id}
            label={`Section ${section.section}`}
            value={section.section}
          />
        ))}
      </Picker>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Student Username"
          value={studentUsername}
          onChangeText={setStudentUsername}
        />
        <TouchableOpacity style={styles.addButton} onPress={addStudent}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item._id}
        renderItem={renderStudent}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
    textAlign: "center",
  },
  picker: {
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#4FC3F7",
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  studentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  studentText: {
    fontSize: 18,
  },
  deleteButton: {
    color: "#FF7043",
    fontWeight: "bold",
  },
});

export default StudentsScreen;
