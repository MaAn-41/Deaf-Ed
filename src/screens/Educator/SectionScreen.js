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
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../../../config";

const SectionScreen = ({ route }) => {
  const { educatorEmail, educatorUsername } = route.params; // educatorEmail passed from the previous screen

  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");

  useEffect(() => {
    fetchSections();
  }, []);

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

  const addSection = async () => {
    if (!sectionName.trim()) {
      Alert.alert("Error", "Please enter a section name");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          educatorEmail,
          educatorUsername,
          section: sectionName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error || "Failed to add section");
        return;
      }

      const newSection = await response.json();
      setSections([...sections, newSection]);
      setSectionName("");
    } catch (error) {
      Alert.alert("Error", "Failed to add section");
    }
  };

  const deleteSection = async (id, section) => {
    try {
      const response = await fetch(`${BASE_URL}/sections/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ educatorEmail, section }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error || "Failed to delete section");
        return;
      }

      setSections(sections.filter((s) => s._id !== id));
      Alert.alert("Success", "Section deleted successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to delete section");
    }
  };

  const renderSection = ({ item }) => (
    <View style={styles.sectionItem}>
      <Text style={styles.sectionText}>{item.section}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteSection(item._id, item.section)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.container}>
      <Text style={styles.title}>Manage Sections</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Section Name"
          value={sectionName}
          onChangeText={setSectionName}
        />
        <TouchableOpacity style={styles.addButton} onPress={addSection}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sections}
        keyExtractor={(item) => item._id}
        renderItem={renderSection}
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
  sectionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  sectionText: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: "#FF7043",
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SectionScreen;
