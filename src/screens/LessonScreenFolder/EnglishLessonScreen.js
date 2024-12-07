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

const EnglishLessonScreen = ({ navigation, route }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const { Username } = route.params;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD59A", "#FFF4D3"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>English Lessons</Text>
        <Text style={styles.subtitle}>Content Coming Soon...</Text>

        <ScrollView contentContainerStyle={styles.buttonsContainer}>
          {alphabet.map((letter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() =>
                navigation.navigate("EnglishAnimations", { letter })
              }
            >
              <Text style={styles.buttonText}>{letter}</Text>
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

export default EnglishLessonScreen;
