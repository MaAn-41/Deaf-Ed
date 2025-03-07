import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const TestScreen = ({ navigation, route }) => {
  const { Username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Category</Text>

      <TouchableOpacity
        style={[styles.button, styles.englishButton]}
        onPress={() => navigation.navigate("EnglishTest", { Username })}
      >
        <FontAwesome5 name="book" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.urduButton]}
        onPress={() => navigation.navigate("UrduTestScreen", { Username })}
      >
        <FontAwesome5
          name="language"
          size={20}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Urdu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.countingButton]}
        onPress={() => navigation.navigate("NumberTestScreen", { Username })}
      >
        <FontAwesome5
          name="calculator"
          size={20}
          color="white"
          style={styles.icon}
        />
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
    backgroundColor: "white",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 25,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 12,
    width: 280,
    marginVertical: 12,
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 12,
  },
  icon: {
    marginRight: 10,
  },
});

export default TestScreen;
