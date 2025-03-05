import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ProgressReportScreen = ({ navigation, route }) => {
  const { Username } = route.params || {}; // Catching Username

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD59A", "#FFF4D3"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Progress Report Module</Text>
        <Text style={styles.subtitle}>Welcome, {Username}</Text>

        {/* Buttons for reports */}
        <TouchableOpacity
          style={[styles.button, styles.reportButton]}
          onPress={() =>
            navigation.navigate("EnglishReportScreen", { Username })
          }
        >
          <Text style={styles.buttonText}>English Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.reportButton]}
          onPress={() => navigation.navigate("UrduReportScreen", { Username })}
        >
          <Text style={styles.buttonText}>Urdu Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.reportButton]}
          onPress={() =>
            navigation.navigate("CountingReportScreen", { Username })
          }
        >
          <Text style={styles.buttonText}>Counting Report</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProgressReportScreen;
