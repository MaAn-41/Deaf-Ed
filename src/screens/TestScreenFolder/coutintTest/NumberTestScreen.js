import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const NumberTestScreen = ({ route, navigation }) => {
  const { Username } = route.params;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#FFFFFF"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Counting Test</Text>
        <Text style={styles.subtitle}>Select an option</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CoutingTestScreen", { Username })}
        >
          <Icon
            name="clipboard-text"
            size={28}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Number Recognition</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FreeFallCountingScreen")}
        >
          <Icon
            name="format-list-bulleted"
            size={28}
            color="#fff"
            style={styles.icon}
          />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 280,
    height: 70,
    backgroundColor: "#FF7043",
    marginVertical: 10,
    borderRadius: 35,
    elevation: 8,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default NumberTestScreen;
