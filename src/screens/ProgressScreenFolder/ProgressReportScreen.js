import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const ProgressReportScreen = ({ navigation, route }) => {
  const { Username } = route.params || {};

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#FFFFFF"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Progress Report</Text>
        <Text style={styles.subtitle}>Welcome, {Username}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("EnglishReportScreen", { Username })
          }
        >
          <MaterialIcons name="insert-chart" size={24} color="#fff" />
          <Text style={styles.buttonText}>English Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("UrduReportScreen", { Username })}
        >
          <MaterialIcons name="insert-chart" size={24} color="#fff" />
          <Text style={styles.buttonText}>Urdu Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("CountingReportScreen", { Username })
          }
        >
          <MaterialIcons name="insert-chart" size={24} color="#fff" />
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
    flexDirection: "row",
    backgroundColor: "#FF7043",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProgressReportScreen;
