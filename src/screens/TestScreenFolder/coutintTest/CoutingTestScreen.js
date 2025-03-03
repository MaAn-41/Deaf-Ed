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

const numbers = Array.from({ length: 11 }, (_, i) => i); // Generates numbers 0 to 10

const CountingTestScreen = ({ route, navigation }) => {
  const { Username } = route.params;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD59A", "#FFF4D3"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Select a Number</Text>

        <ScrollView contentContainerStyle={styles.buttonsContainer}>
          {numbers.map((number, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() =>
                navigation.navigate("NumberPracticeScreen", {
                  number,
                  Username,
                })
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
  buttonsContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 20,
  },
  button: {
    width: 80,
    height: 80,
    backgroundColor: "#4FC3F7",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    borderRadius: 40,
    elevation: 6,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default CountingTestScreen;
