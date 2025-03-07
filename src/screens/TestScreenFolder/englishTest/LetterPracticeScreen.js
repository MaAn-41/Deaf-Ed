import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL2 from "../../../../config2";
import BASE_URL from "../../../../config";
const LetterPracticeScreen = () => {
  const route = useRoute();
  const { Username, letter } = route.params;

  const [result, setResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const startTest = async () => {
    setIsTesting(true);
    setResult(null);

    try {
      const response = await fetch(`${BASE_URL2}/test_gesture-english`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ letter }),
      });

      const data = await response.json();
      setResult(data);

      await fetch(`${BASE_URL}/save_english_test_result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: Username,
          letter: letter,
          recognized: data.recognized,
          status: data.status,
          accuracy: data.accuracy,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      setResult({ error: "Error connecting to server" });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#FFFFFF"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Test Gesture for: {letter}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={startTest}
          disabled={isTesting}
        >
          <Text style={styles.buttonText}>
            {isTesting ? "Testing..." : "Start Test"}
          </Text>
        </TouchableOpacity>

        {result && (
          <Text style={styles.result}>
            {result.status}: {result.recognized} ({result.accuracy}%)
          </Text>
        )}
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 25,
    elevation: 6,
    backgroundColor: "#4FC3F7",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  result: {
    fontSize: 18,
    color: "#4FC3F7",
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default LetterPracticeScreen;
