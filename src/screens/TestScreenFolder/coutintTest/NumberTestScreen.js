import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const NumberTestScreen = ({ route, navigation }) => {
  const { Username } = route.params;

  return (
    <ImageBackground
      source={require("../../../../assets/a.webp")} // Background image added
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
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
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
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
    backgroundColor: "#2196F3",
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
