import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import BASE_URL from "../../../../config";
import BASE_URL2 from "../../../../config2";

const HurfPracticeScreen = () => {
  const route = useRoute();
  const { label, Username } = route.params;
  const [result, setResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const startTest = async () => {
    setIsTesting(true);
    setResult(null);

    try {
      const response = await fetch(`${BASE_URL2}/test_gesture-urdu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);

      // Save the test result in MongoDB
      await fetch(`${BASE_URL}/save-urdu-test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: Username,
          letter: label,
          recognized: data.recognized,
          status: data.status,
          accuracy: data.accuracy,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      setResult({ error: "Error connecting to server" });
      console.error("Request Error:", error);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
    textAlign: "center",
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
    textAlign: "center",
  },
});

export default HurfPracticeScreen;
