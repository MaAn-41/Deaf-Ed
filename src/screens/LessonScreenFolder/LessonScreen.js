import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const LessonScreen = ({ navigation, route }) => {
  const { Username } = route.params;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD59A", "#FFF4D3"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.headerText}>Select a Lesson</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("EnglishLessonScreen", { Username })
            }
          >
            <Text style={styles.buttonText}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("CountingLessonScreen", { Username })
            }
          >
            <Text style={styles.buttonText}>Counting</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            // onPress={() =>
            //   navigation.navigate("FoundationalWordsScreen", { Username })
            // }
          >
            <Text style={styles.buttonText}>Foundational Words</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            // onPress={() =>
            //   navigation.navigate("UrduLessonScreen", { Username })
            // }
          >
            <Text style={styles.buttonText}>Urdu</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7043",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default LessonScreen;
