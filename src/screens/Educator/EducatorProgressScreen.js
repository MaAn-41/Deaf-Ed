import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../../../config";

const EducatorProgressScreen = ({ route }) => {
  const { educatorEmail, educatorUsername } = route.params;

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    if (selectedSection) {
      fetchStudents();
    }
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

  const fetchReport = async () => {
    if (!selectedStudent || !selectedSubject) {
      Alert.alert("Error", "Please select a student and a subject");
      return;
    }

    let endpoint = "";
    if (selectedSubject === "English") {
      endpoint = "get_english_results";
    } else if (selectedSubject === "Urdu") {
      endpoint = "get_urdu_results";
    } else if (selectedSubject === "Counting") {
      endpoint = "get_counting_results";
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/${endpoint}?username=${selectedStudent}`
      );
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")} // Update the path to your image
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)"]}
        style={styles.container}
      >
        <Text style={styles.title}>Student Progress Report</Text>

        {/* Select Section */}
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

        {/* Select Student */}
        <Picker
          selectedValue={selectedStudent}
          onValueChange={(value) => setSelectedStudent(value)}
          style={styles.picker}
          enabled={students.length > 0}
        >
          <Picker.Item label="Select Student" value="" />
          {students.map((student) => (
            <Picker.Item
              key={student._id}
              label={student.studentUsername}
              value={student.studentUsername}
            />
          ))}
        </Picker>

        {/* Select Subject */}
        <Picker
          selectedValue={selectedSubject}
          onValueChange={(value) => setSelectedSubject(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Subject" value="" />
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Urdu" value="Urdu" />
          <Picker.Item label="Counting" value="Counting" />
        </Picker>

        {/* View Progress Button */}
        <TouchableOpacity style={styles.button} onPress={fetchReport}>
          <Text style={styles.buttonText}>View Progress</Text>
        </TouchableOpacity>

        {/* Display Report */}
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : reportData.length > 0 ? (
          <FlatList
            data={reportData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                {selectedSubject === "Counting" ? (
                  <Text style={styles.resultText}>
                    Number: {item.number} | Recognized: {item.recognized} |
                    Accuracy: {item.accuracy}%
                  </Text>
                ) : (
                  <Text style={styles.resultText}>
                    Letter: {item.letter} | Recognized: {item.recognized} |
                    Accuracy: {item.accuracy}%
                  </Text>
                )}
                <Text style={styles.timestamp}>
                  {new Date(item.timestamp).toLocaleString()}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noDataText}>No report found.</Text>
        )}
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
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
  button: {
    backgroundColor: "#4FC3F7",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  resultItem: {
    backgroundColor: "#FFEECC",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: "100%",
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
  timestamp: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  noDataText: {
    fontSize: 18,
    color: "#777",
    marginTop: 10,
    textAlign: "center",
  },
});

export default EducatorProgressScreen;
