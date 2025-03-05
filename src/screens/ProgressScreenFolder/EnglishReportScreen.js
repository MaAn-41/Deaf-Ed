import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EnglishReportScreen = ({ route }) => {
  const { Username } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>English Report</Text>
      <Text style={styles.subtitle}>Welcome, {Username}</Text>
      <Text style={styles.text}>
        English progress details will be displayed here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF4D3",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
});

export default EnglishReportScreen;
