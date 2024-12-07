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
  const { educatorEmail, educatorUsername } = route.params;

  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");

  // Fetch sections from the backend
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

  const createSection = async () => {
    // Validate section input: must be a single capital letter
    if (!newSection.match(/^[A-Z]$/)) {
      Alert.alert("Error", "Section must be a single capital letter");
      return;
    }

    // Check if section already exists for this educator
    const sectionExists = sections.some(
      (section) => section.section === newSection
    );
    if (sectionExists) {
      Alert.alert("Error", `Section ${newSection} already exists`);
      setNewSection(""); // Clear the input
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/sections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          educatorEmail,
          educatorUsername,
          section: newSection,
        }),
      });

      const data = await response.json();
      setSections([...sections, data]);
      setNewSection(""); // Reset the input
    } catch (error) {
      Alert.alert("Error", "Failed to create section");
    }
  };

  const deleteSection = async (id) => {
    try {
      await fetch(`${BASE_URL}/sections/${id}`, {
        method: "DELETE",
      });

      setSections(sections.filter((section) => section._id !== id));
    } catch (error) {
      Alert.alert("Error", "Failed to delete section");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.sectionItem}>
      <Text style={styles.sectionText}>{item.section}</Text>
      <TouchableOpacity onPress={() => deleteSection(item._id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={["#FFD59A", "#FFF4D3"]} style={styles.container}>
      <Text style={styles.title}>Sections</Text>

      {/* Input for new section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter section (A-Z)"
          value={newSection}
          onChangeText={setNewSection}
        />
        <TouchableOpacity style={styles.addButton} onPress={createSection}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* List of sections */}
      <FlatList
        data={sections}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
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
    color: "#FF7043",
    fontWeight: "bold",
  },
});

export default SectionScreen;
