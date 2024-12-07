import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../../../config";

const CountingLessonScreen = ({ navigation, route }) => {
  const { Username } = route.params;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1e3c72", "#2a5298"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Counting Lessons</Text>
        <Text style={styles.subtitle}>Content Coming Soon...</Text>
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
    color: "#fff",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
  },
});

export default CountingLessonScreen;
