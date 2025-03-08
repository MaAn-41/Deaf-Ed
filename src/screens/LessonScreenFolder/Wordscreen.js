import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const WordScreen = ({ route }) => {
  const navigation = useNavigation();
  const { Username } = route.params; // Catch Username

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#FFFFFF"]}
        style={styles.gradientBackground}
      >
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
