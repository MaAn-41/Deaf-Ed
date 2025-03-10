import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
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
      legendFontColor: "#fff",
      legendFontSize: 15,
    },
    {
      name: "Incorrect",
      population: incorrectCount,
      color: "#FF7043",
      legendFontColor: "#fff",
      legendFontSize: 15,
    },
  ];

  const filteredResults = results.filter(
    (item) => item.letter === selectedLetter && item.status === "Correct"
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
            color: (opacity = 1) => `rgba(79, 195, 247, ${opacity})`, // Blue color
            strokeWidth: 2,
          },
        ],
      }
    : {
        labels: [""],
        datasets: [
          {
            data: [0],
            color: () => `rgba(79, 195, 247, 0)`,
            strokeWidth: 0,
          },
        ],
      };

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>English Report</Text>
        <Text style={styles.subtitle}>Welcome, {Username}</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading results...</Text>
        ) : results.length > 0 ? (
          <>
            <Text style={styles.chartTitle}>Correct vs Incorrect Answers</Text>
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
              style={{ marginVertical: 8, borderRadius: 16 }}
            />

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
                    backgroundColor: "#4FC3F7",
                    backgroundGradientFrom: "#4FC3F7",
                    backgroundGradientTo: "#81D4FA",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: {
                      r: "4",
                      strokeWidth: "2",
                      stroke: "#4FC3F7",
                    },
                  }}
                  style={{ marginVertical: 8, borderRadius: 16 }}
                />
              </>
            ) : selectedLetter ? (
              <Text style={styles.noDataText}>
                No correct data available for "{selectedLetter}".
              </Text>
            ) : null}

            <FlatList
              data={results}
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
            />
          </>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
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
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
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
  },
});

export default EnglishReportScreen;
