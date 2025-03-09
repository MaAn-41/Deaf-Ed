import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const FoundationalWordsScreen = ({ navigation, route }) => {
  const { Username } = route.params;

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Foundational Words</Text>
        <Text style={styles.subtitle}>Content Coming Soon...</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Light overlay for readability
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
  },
});

export default FoundationalWordsScreen;
