import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const LetterPracticeScreen = () => {
  const route = useRoute();
  const { Username, letter } = route.params;

  const [result, setResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const startTest = async () => {
    setIsTesting(true);
    setResult(null);

    try {
      const response = await fetch(
        "http://10.54.15.76:5001/test_gesture-english",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ letter }),
        }
      );

      const data = await response.json();
      setResult(data);

      await fetch("http://10.54.15.76:5000/save_english_test_result", {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#4FC3F7",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 25,
    elevation: 6,
  },
  buttonText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
});

export default LetterPracticeScreen;
