import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FoodAnimations = ({ route }) => {
  const { word } = route.params;

  const videoPaths = {
    Breakfast: require("../../../assets/food/breakfast.mp4"),
    Dinner: require("../../../assets/food/dinner.mp4"),
    Lunch: require("../../../assets/food/lunch.mp4"),
    Paratha: require("../../../assets/food/paraths.mp4"),
    Omelette: require("../../../assets/food/omellete.mp4"),
    Rice: require("../../../assets/food/rice.mp4"),
    Roti: require("../../../assets/food/roti.mp4"),
    Sandwich: require("../../../assets/food/sandwich.mp4"),
    Bread: require("../../../assets/food/bread.mp4"),
    Sugar: require("../../../assets/food/suger.mp4"),
    Butter: require("../../../assets/food/butter.mp4"),
    Candy: require("../../../assets/food/candy.mp4"),
    Chips: require("../../../assets/food/chips.mp4"),
    Cookies: require("../../../assets/food/cookies.mp4"),
    Egg: require("../../../assets/food/eggs.mp4"),
    Water: require("../../../assets/food/paani.mp4"),
  };

  const iconMap = {
    Breakfast: { name: "breakfast", color: "#FF7043" },
    Dinner: { name: "dinner", color: "#FFEB3B" },
    Lunch: { name: "lunch", color: "#4CAF50" },
    Paratha: { name: "flatbread", color: "#2196F3" },
    Omelette: { name: "egg", color: "#FF9800" },
    Rice: { name: "rice", color: "#9C27B0" },
    Roti: { name: "bread-slice", color: "#FF5722" },
    Sandwich: { name: "sandwich", color: "#3F51B5" },
    Bread: { name: "bread-slice", color: "#FFC107" },
    Sugar: { name: "sugar", color: "#8BC34A" },
    Butter: { name: "butter", color: "#FF7043" },
    Candy: { name: "candy", color: "#FFEB3B" },
    Chips: { name: "potato", color: "#4CAF50" },
    Cookies: { name: "cookie", color: "#2196F3" },
    Egg: { name: "egg", color: "#FF9800" },
    Water: { name: "water", color: "#9C27B0" },
  };

  const videoSource = videoPaths[word] || null;
  const { name, color } = iconMap[word] || { name: "circle", color: "#000" };

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Animation for {word}</Text>
          {videoSource ? (
            <View style={styles.videoWrapper}>
              <Video
                source={videoSource}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                isLooping
              />
              <View style={styles.iconOverlay}>
                <Icon name={name} size={40} color={color} style={styles.icon} />
                <Text style={styles.itemText}>{word}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.noVideoText}>
              No video available for this word.
            </Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent background
    alignItems: "center",
    justifyContent: "center", // Center content vertically
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
    textAlign: "center",
  },
  videoWrapper: {
    borderWidth: 8,
    borderColor: "#007BFF",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  video: {
    width: 300,
    height: 200,
  },
  iconOverlay: {
    position: "absolute",
    left: 10,
    top: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Slightly transparent overlay for the icon
    padding: 5,
    borderRadius: 10,
    zIndex: 1,
  },
  icon: {
    marginRight: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF7043",
  },
  noVideoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF7043",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FoodAnimations;
