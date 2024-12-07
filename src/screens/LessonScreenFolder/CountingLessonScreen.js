import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../../../config";

const CountingLessonScreen = ({ navigation, route }) => {
  const { Username } = route.params;
  const numbers = Array.from({ length: 11 }, (_, i) => i);
  const [openedNumbers, setOpenedNumbers] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/countingProgress?username=${Username}`
        );
        const data = await response.json();
        setOpenedNumbers(data.openedNumbers || []);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };
    fetchProgress();
  }, []);

  const handleNumberClick = async (number) => {
    try {
      if (!openedNumbers.includes(number)) {
        await fetch(`${BASE_URL}/countingProgress`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: Username, number }),
        });
        setOpenedNumbers((prev) => [...prev, number]);
      }
      navigation.navigate("CountingAnimations", { number });
    } catch (error) {
      Alert.alert("Error", "Failed to update progress.");
      console.error("Error updating progress:", error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1e3c72", "#2a5298"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Counting Lessons</Text>
        <Text style={styles.subtitle}>Select a number to learn:</Text>

        <ScrollView contentContainerStyle={styles.buttonsContainer}>
          {numbers.map((number, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                {
                  backgroundColor: openedNumbers.includes(number)
                    ? "#B0BEC5"
                    : "#4FC3F7",
                },
              ]}
              onPress={() => handleNumberClick(number)}
            >
              <Text style={styles.buttonText}>{number}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  buttonsContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 25,
    elevation: 6,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default CountingLessonScreen;
