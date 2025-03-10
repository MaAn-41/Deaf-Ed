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

const urduLabels = {
  "Alif mad": "آ",
  Alif: "ا",
  Bay: "ب",
  Pay: "پ",
  Tay: "ت",
  Taay: "ٹ",
  Say: "ث",
  Jeem: "ج",
  Chay: "چ",
  "1-Hay": "ح",
  Khay: "خ",
  Dal: "د",
  Daal: "ڈ",
  Zaal: "ذ",
  Ray: "ر",
  Aray: "ڑ",
  Zay: "ز",
  Zaey: "ژ",
  Seen: "س",
  Sheen: "ش",
  Suad: "ص",
  Zuad: "ض",
  Tuey: "ط",
  Zuey: "ظ",
  Ain: "ع",
  Ghain: "غ",
  Fay: "ف",
  Kaf: "ق",
  Kiaf: "ک",
  Gaaf: "گ",
  Lam: "ل",
  Meem: "م",
  Nuun: "ن",
  Nuungh: "ں",
  Wao: "و",
  Hay: "ہ",
  Dochahay: "ھ",
  Hamza: "ء",
  Cyeh: "ئ",
  Byeh: "ے",
};

const HurfPracticeScreen = () => {
  const route = useRoute();
  const { roman, urdu, Username } = route.params;
  const [result, setResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const startTest = async () => {
    setIsTesting(true);
    setResult(null);

    try {
      const response = await fetch(`${BASE_URL2}/test_gesture-urdu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: roman }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const recognizedUrdu = urduLabels[data.recognized] || data.recognized;

      // Save the test result in MongoDB
      await fetch(`${BASE_URL}/save-urdu-test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: Username,
          letter: urdu,
          recognized: recognizedUrdu,
          status: data.status,
          accuracy: data.accuracy,
          timestamp: new Date().toISOString(),
        }),
      });

      setResult({ ...data, recognized: recognizedUrdu });
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
        <Text style={styles.title}>Test Gesture for: {urdu}</Text>

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
            {result.status}:{" "}
            {urduLabels[result.recognized] || result.recognized} (
            {result.accuracy}%)
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
