import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>
        Deaf<Text style={styles.titleED}>ED</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("LoginScreen", { userType: "Student" })
          }
        >
          <Ionicons name="school-outline" size={30} color="#FFFFFF" />
          <Text style={styles.cardText}>Start Learning</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("LoginScreen", { userType: "Educator" })
          }
        >
          <Ionicons name="person-outline" size={30} color="#FFFFFF" />
          <Text style={styles.cardText}>Educator Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 40,
  },
  titleED: {
    color: "#000000",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2196F3",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    width: "90%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 10,
    textAlign: "center",
    flex: 1,
  },
});

export default WelcomeScreen;
