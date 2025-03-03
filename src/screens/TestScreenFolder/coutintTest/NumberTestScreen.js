import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const NumberTestScreen = ({ route, navigation }) => {
  const { Username } = route.params;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD59A", "#FFF4D3"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Number Lessons</Text>
        <Text style={styles.subtitle}>Select an option</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CoutingTestScreen", { Username })}
        >
          <Text style={styles.buttonText}>Number Recognition</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FreeFallCountingScreen")}
        >
          <Text style={styles.buttonText}>Free Fall</Text>
        </TouchableOpacity>
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
  subtitle: {
    fontSize: 18,
    color: "#4FC3F7",
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
});

export default NumberTestScreen;
