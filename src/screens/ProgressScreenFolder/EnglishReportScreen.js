import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LineChart, PieChart } from "react-native-chart-kit";
import BASE_URL from "../../../config";

const EnglishReportScreen = ({ route }) => {
  const { Username } = route.params || {};
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [uniqueLetters, setUniqueLetters] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [detailSelectedLetter, setDetailSelectedLetter] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/get_english_results?username=${Username}`
        );
        const data = await response.json();
        setResults(data);
        const letters = [...new Set(data.map((item) => item.letter))];
        setUniqueLetters(letters);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [Username]);

  const correctCount = results.filter(
    (item) => item.recognized === item.letter
  ).length;
  const incorrectCount = results.length - correctCount;

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

  const filteredResults = results.filter(
    (item) => item.letter === selectedLetter && item.status === "Correct"
  );

  const detailFilteredResults = results.filter(
    (item) =>
      detailSelectedLetter === "" || item.letter === detailSelectedLetter
  );

  const hasData = filteredResults.length > 0;

  const lineChartData = hasData
    ? {
        labels: filteredResults.map((item) =>
          new Date(item.timestamp).toLocaleString()
        ),
        datasets: [
          {
            data: filteredResults.map((item) => item.accuracy),
            color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`, // Dark blue color
            strokeWidth: 2,
          },
        ],
      }
    : {
        labels: [""],
        datasets: [
          {
            data: [0],
            color: () => `rgba(0, 0, 0, 0)`,
            strokeWidth: 0,
          },
        ],
      };

  const toggleDetailsView = () => {
    setShowDetails(!showDetails);
  };

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>English Report</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              {showDetails ? "Detail View" : "Chart View"}
            </Text>
            <Switch
              value={showDetails}
              onValueChange={toggleDetailsView}
              trackColor={{ false: "#767577", true: "#4CAF50" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              style={styles.toggle}
            />
          </View>
        </View>
        <Text style={styles.subtitle}>Welcome, {Username}</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading results...</Text>
        ) : results.length > 0 ? (
          !showDetails ? (
            // CHARTS VIEW
            <>
              <Text style={styles.chartTitle}>
                Correct vs Incorrect Answers
              </Text>
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

              <Text style={styles.chartTitle}>
                Select a Letter to View Accuracy
              </Text>
              <Picker
                selectedValue={selectedLetter}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedLetter(itemValue)}
              >
                <Picker.Item label="Select a letter" value="" />
                {uniqueLetters.map((letter, index) => (
                  <Picker.Item key={index} label={letter} value={letter} />
                ))}
              </Picker>

              {selectedLetter && hasData ? (
                <>
                  <Text style={styles.chartTitle}>
                    Accuracy for Letter: {selectedLetter}
                  </Text>
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
                        labelColor: (opacity = 1) =>
                          `rgba(0, 0, 0, ${opacity})`, // Black labels
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
              ) : selectedLetter ? (
                <Text style={styles.noDataText}>
                  No correct data available for "{selectedLetter}".
                </Text>
              ) : null}
            </>
          ) : (
            // DETAILS VIEW
            <>
              <Text style={styles.detailTitle}>Test Result Details</Text>
              <View style={styles.detailPickerContainer}>
                <Text style={styles.detailPickerLabel}>Filter by Letter:</Text>
                <Picker
                  selectedValue={detailSelectedLetter}
                  style={styles.detailPicker}
                  onValueChange={(itemValue) =>
                    setDetailSelectedLetter(itemValue)
                  }
                >
                  <Picker.Item label="All Letters" value="" />
                  {uniqueLetters.map((letter, index) => (
                    <Picker.Item key={index} label={letter} value={letter} />
                  ))}
                </Picker>
              </View>

              {detailFilteredResults.length > 0 ? (
                <FlatList
                  data={detailFilteredResults}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.resultItem}>
                      <Text style={styles.resultText}>
                        Letter: {item.letter} | Recognized: {item.recognized}
                      </Text>
                      <Text style={styles.resultText}>
                        Accuracy: {item.accuracy}% | Status: {item.status}
                      </Text>
                      <Text style={styles.timestamp}>
                        {new Date(item.timestamp).toLocaleString()}
                      </Text>
                    </View>
                  )}
                  style={styles.flatList}
                />
              ) : (
                <Text style={styles.noDataText}>
                  No results found for this filter.
                </Text>
              )}
            </>
          )
        ) : (
          <Text style={styles.noDataText}>No test results found.</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)", // More opaque white background
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 8,
    color: "#333",
  },
  toggle: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7043",
  },
  subtitle: {
    fontSize: 20,
    color: "#333",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
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
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  resultItem: {
    backgroundColor: "#FFEECC",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  },
  flatList: {
    width: "100%",
    marginTop: 10,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7043",
    marginTop: 10,
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  detailPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailPickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  detailPicker: {
    flex: 1,
    height: 40,
  },
});

export default EnglishReportScreen;
