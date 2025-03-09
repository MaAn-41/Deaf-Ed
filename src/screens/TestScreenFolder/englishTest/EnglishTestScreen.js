import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EnglishTestScreen = ({ route }) => {
  const navigation = useNavigation();
  const { Username } = route.params;

  return (
    <ImageBackground
      source={require("../../../../assets/a.webp")} // Change to your image file
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>English Test</Text>
        <Text style={styles.subtitle}>Select an option</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("AlphabetTestScreen", { Username })
          }
        >
          <Icon
            name="alphabetical"
            size={28}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Alphabets</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FreeFallEnglish")}
        >
          <Icon name="gesture-tap" size={28} color="#fff" style={styles.icon} />
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
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 10,
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
    paddingHorizontal: 10,
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

export default EnglishTestScreen;
