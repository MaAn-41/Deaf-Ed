import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const AlphabetTestScreen = ({ route, navigation }) => {
  const { Username } = route.params;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#FFFFFF"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Select an Alphabet</Text>

        <ScrollView contentContainerStyle={styles.buttonsContainer}>
          {alphabet.map((letter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() =>
                navigation.navigate("LetterPracticeScreen", {
                  letter,
                  Username,
                })
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
    backgroundColor: "#4FC3F7",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AlphabetTestScreen;
