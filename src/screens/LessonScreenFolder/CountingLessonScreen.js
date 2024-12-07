import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../../../config";

const CountingLessonScreen = ({ navigation, route }) => {
  const { Username } = route.params;
  const numbers = Array.from({ length: 11 }, (_, i) => i); // Generates an array [0, 1, 2, ..., 10]

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
              style={styles.button}
              onPress={() =>
                navigation.navigate("CountingAnimations", { number })
              }
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
    backgroundColor: "#4FC3F7",
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
