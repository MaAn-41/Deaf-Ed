import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import BASE_URL from "../../../config";

const CountingReportScreen = ({ route }) => {
  const { Username } = route.params || {};
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/get_counting_results?username=${Username}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [Username]);

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")} // Background image added
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Counting Report</Text>
        <Text style={styles.subtitle}>Welcome, {Username}</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading results...</Text>
        ) : results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <Text style={styles.resultText}>
                  Number: {item.number} | Recognized: {item.recognized}
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
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Light overlay for readability
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

export default CountingReportScreen;
