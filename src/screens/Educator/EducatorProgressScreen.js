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
  ScrollView,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart, PieChart } from "react-native-chart-kit";
import BASE_URL from "../../../config";

const EducatorProgressScreen = ({ route }) => {
  const { educatorEmail, educatorUsername } = route.params;

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(""); // State for selected letter
  const [selectedNumber, setSelectedNumber] = useState(""); // State for selected number
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCharts, setShowCharts] = useState(true); // State for toggle
  const [uniqueLetters, setUniqueLetters] = useState([]); // State for unique letters
  const [uniqueNumbers, setUniqueNumbers] = useState([]); // State for unique numbers

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
      // Extract unique letters and numbers for the picker
      const letters = [...new Set(data.map((item) => item.letter))];
      const numbers = [...new Set(data.map((item) => item.number))];
      setUniqueLetters(letters);
      setUniqueNumbers(numbers);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for charts
  const correctCount = reportData.filter(
    (item) => item.status === "Correct"
  ).length;
  const incorrectCount = reportData.length - correctCount;

  const pieChartData = [
    {
      name: "Correct",
      population: correctCount,
      color: "#4CAF50",
      legendFontColor: "#333",
      legendFontSize: 15,
    },
    {
      name: "Incorrect",
      population: incorrectCount,
      color: "#FF7043",
      legendFontColor: "#333",
      legendFontSize: 15,
    },
  ];

  // Filter report data for the selected letter or number and status "Correct"
  const filteredDataForLineChart = reportData.filter(
    (item) =>
      (selectedSubject !== "Counting"
        ? item.letter === selectedLetter
        : item.number === selectedNumber) && item.status === "Correct"
  );

  const lineChartData = {
    labels: filteredDataForLineChart.map((item) =>
      new Date(item.timestamp).toLocaleString()
    ),
    datasets: [
      {
        data: filteredDataForLineChart.map((item) => item.accuracy),
        color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`, // Dark blue color
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)"]}
        style={styles.container}
      >
        <Text style={styles.title}>Student Progress Report</Text>

        {/* Toggle for Chart/Detailed View */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>
            {showCharts ? "Switch to Detailed View" : "Switch to Chart View"}
          </Text>
          <Switch
            value={showCharts}
            onValueChange={() => {
              setShowCharts(!showCharts);
              setSelectedLetter(""); // Reset letter selection when toggling
              setSelectedNumber(""); // Reset number selection when toggling
            }}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            style={styles.toggle}
          />
        </View>

        <ScrollView style={styles.scrollContainer}>
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

          {/* Select Letter for Line Chart (English/Urdu) */}
          {showCharts && selectedSubject !== "Counting" && (
            <Picker
              selectedValue={selectedLetter}
              onValueChange={(value) => setSelectedLetter(value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Letter" value="" />
              {uniqueLetters.map((letter) => (
                <Picker.Item key={letter} label={letter} value={letter} />
              ))}
            </Picker>
          )}

          {/* Select Number for Line Chart (Counting) */}
          {showCharts && selectedSubject === "Counting" && (
            <Picker
              selectedValue={selectedNumber}
              onValueChange={(value) => setSelectedNumber(value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Number" value="" />
              {uniqueNumbers.map((number) => (
                <Picker.Item key={number} label={number} value={number} />
              ))}
            </Picker>
          )}

          {/* View Progress Button */}
          <TouchableOpacity style={styles.button} onPress={fetchReport}>
            <Text style={styles.buttonText}>View Progress</Text>
          </TouchableOpacity>
          {/* Display Detailed View */}
          {!showCharts && (
            <View>
              <Text style={styles.chartTitle}>Detailed Report</Text>
              {reportData.length > 0 ? (
                <FlatList
                  data={reportData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.resultItem}>
                      <Text style={styles.resultText}>
                        {selectedSubject !== "Counting"
                          ? `Letter: ${item.letter}`
                          : `Number: ${item.number}`}
                      </Text>
                      <Text style={styles.resultText}>
                        Status:{" "}
                        {item.status === "Correct" ? " Correct" : " Incorrect"}
                      </Text>
                      <Text style={styles.resultText}>
                        Accuracy: {item.accuracy}%
                      </Text>
                      <Text style={styles.timestamp}>
                        {new Date(item.timestamp).toLocaleString()}
                      </Text>
                    </View>
                  )}
                />
              ) : (
                <Text style={styles.noDataText}>No report data available</Text>
              )}
            </View>
          )}

          {/* Display Charts */}
          {showCharts && (
            <>
              <Text style={styles.chartTitle}>Correct vs Incorrect</Text>
              <View style={styles.chartContainer}>
                <PieChart
                  data={pieChartData}
                  width={320}
                  height={220}
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                  }}
                  accessor="population"
                  backgroundColor="white"
                  paddingLeft="15"
                  absolute
                  style={styles.pieChart}
                />
              </View>

              <Text style={styles.chartTitle}>Accuracy Over Time</Text>
              <View style={styles.chartContainer}>
                <LineChart
                  data={lineChartData}
                  width={350}
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix="%"
                  yAxisInterval={1}
                  fromZero
                  withDots
                  withShadow={false}
                  bezier
                  chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`, // Dark blue for lines
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
                    style: { borderRadius: 16 },
                    propsForDots: {
                      r: "4",
                      strokeWidth: "2",
                      stroke: "#000080", // Navy blue dots
                      fill: "#000080", // Navy blue dots
                    },
                    propsForLabels: {
                      fontSize: 12,
                      fontWeight: "bold",
                    },
                  }}
                  style={styles.lineChart}
                />
              </View>
            </>
          )}
        </ScrollView>
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
  scrollContainer: {
    flex: 1,
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
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  toggleLabel: {
    fontSize: 16,
    color: "#333",
  },
  toggle: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  chartTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7043",
    marginVertical: 10,
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  pieChart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  lineChart: {
    borderRadius: 16,
    marginVertical: 8,
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
