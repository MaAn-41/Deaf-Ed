import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const HurfPracticeScreen = () => {
  const route = useRoute();
  const { label } = route.params;
  const [result, setResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const startTest = async () => {
    setIsTesting(true);
    setResult(null);

    try {
      const response = await fetch(
        "http://192.168.1.117:5001/test_gesture-urdu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Error connecting to server" });
      console.error("Request Error:", error);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Gesture for: {label}</Text>

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
  container: {
    flex: 1,
    backgroundColor: "#FFF4D3",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#4FC3F7",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 25,
    elevation: 6,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    color: "#FF7043",
  },
});

export default HurfPracticeScreen;
