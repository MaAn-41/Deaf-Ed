import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

const Manage = ({ navigation, route }) => {
  const { educatorEmail, educatorUsername } = route.params;

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")} // Update the path to your image
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)"]}
        style={styles.container}
      >
        <Text style={styles.title}>Manage Students</Text>

        {/* Section Button */}
        <TouchableOpacity
          style={[styles.button, styles.sectionButton]}
          onPress={() =>
            navigation.navigate("SectionScreen", {
              educatorEmail: educatorEmail,
              educatorUsername: educatorUsername,
            })
          }
        >
          <Icon name="view-list" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Section</Text>
        </TouchableOpacity>

        {/* Students Button */}
        <TouchableOpacity
          style={[styles.button, styles.studentsButton]}
          onPress={() =>
            navigation.navigate("StudentsScreen", {
              educatorEmail: educatorEmail,
              educatorUsername: educatorUsername,
            })
          }
        >
          <Icon name="group" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Students</Text>
        </TouchableOpacity>
      </LinearGradient>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginVertical: 15,
    width: "80%",
    elevation: 6,
  },
  sectionButton: {
    backgroundColor: "#2196F3",
  },
  studentsButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  icon: {
    marginRight: 10,
  },
});

export default Manage;
