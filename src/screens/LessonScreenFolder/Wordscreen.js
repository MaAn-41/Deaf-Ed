import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const WordScreen = ({ route }) => {
  const navigation = useNavigation();
  const { Username } = route.params; // Catch Username

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Word Categories</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.foodButton]}
            onPress={() => navigation.navigate("FoodScreen", { Username })} // Pass Username
          >
            <FontAwesome5
              name="utensils"
              size={24}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Food</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.relationsButton]}
            onPress={() => navigation.navigate("RelationScreen", { Username })}
          >
            <FontAwesome5
              name="users"
              size={24}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Relations</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Light overlay for readability
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 50,
  },
  buttonsContainer: {
    width: "80%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 6,
  },
  foodButton: {
    backgroundColor: "#FF9800",
  },
  relationsButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default WordScreen;
