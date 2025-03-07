import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TestScreen = ({ navigation, route }) => {
  const { Username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Category</Text>
      <TouchableOpacity
        style={[styles.button, styles.englishButton]}
        onPress={() => navigation.navigate("EnglishTest", { Username })}
      >
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.urduButton]}
        onPress={() => navigation.navigate("UrduTestScreen", { Username })}
      >
        <Text style={styles.buttonText}>Urdu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.countingButton]}
        onPress={() => navigation.navigate("NumberTestScreen", { Username })}
      >
        <Text style={styles.buttonText}>Counting</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF4D3",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  englishButton: {
    backgroundColor: "#FF7043",
  },
  urduButton: {
    backgroundColor: "#4CAF50",
  },
  countingButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TestScreen;
