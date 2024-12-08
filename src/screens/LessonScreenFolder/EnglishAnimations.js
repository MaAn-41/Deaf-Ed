import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EnglishAnimations = ({ route }) => {
  const { letter } = route.params;

  const videoPaths = {
    A: [
      { source: require("../../../assets/alphabets/A.mp4"), word: "Apple" },
      { source: require("../../../assets/alphabets/Apple.mp4"), word: "Apple" },
    ],
    B: [
      { source: require("../../../assets/alphabets/B.mp4"), word: "Banana" },
      {
        source: require("../../../assets/alphabets/Banana.mp4"),
        word: "Banana",
      },
    ],
    C: [
      { source: require("../../../assets/alphabets/C.mp4"), word: "Car" },
      { source: require("../../../assets/alphabets/Car.mp4"), word: "Car" },
    ],
    D: [
      { source: require("../../../assets/alphabets/D.mp4"), word: "Duck" },
      { source: require("../../../assets/alphabets/Duck.mp4"), word: "Duck" },
    ],
    E: [
      { source: require("../../../assets/alphabets/E.mp4"), word: "Eye" },
      { source: require("../../../assets/alphabets/Eye.mp4"), word: "Eye" },
    ],
    F: [
      { source: require("../../../assets/alphabets/F.mp4"), word: "Flower" },
      {
        source: require("../../../assets/alphabets/Flower.mp4"),
        word: "Flower",
      },
    ],
    G: [
      { source: require("../../../assets/alphabets/G.mp4"), word: "Gate" },
      { source: require("../../../assets/alphabets/Gate.mp4"), word: "Gate" },
    ],
    H: [
      { source: require("../../../assets/alphabets/H.mp4"), word: "Horse" },
      { source: require("../../../assets/alphabets/Horse.mp4"), word: "Horse" },
    ],
    I: [
      { source: require("../../../assets/alphabets/I.mp4"), word: "Igloo" },
      { source: require("../../../assets/alphabets/Igloo.mp4"), word: "Igloo" },
    ],
    J: [
      { source: require("../../../assets/alphabets/J.mp4"), word: "Jug" },
      { source: require("../../../assets/alphabets/Jug.mp4"), word: "Jug" },
    ],
    K: [
      { source: require("../../../assets/alphabets/K.mp4"), word: "Kite" },
      { source: require("../../../assets/alphabets/Kite.mp4"), word: "Kite" },
    ],
    L: [
      { source: require("../../../assets/alphabets/L.mp4"), word: "Leaf" },
      { source: require("../../../assets/alphabets/Leaf.mp4"), word: "Leaf" },
    ],
    M: [
      { source: require("../../../assets/alphabets/M.mp4"), word: "Mango" },
      { source: require("../../../assets/alphabets/Mango.mp4"), word: "Mango" },
    ],
    N: [
      { source: require("../../../assets/alphabets/N.mp4"), word: "Nest" },
      { source: require("../../../assets/alphabets/Nest.mp4"), word: "Nest" },
    ],
    O: [
      { source: require("../../../assets/alphabets/O.mp4"), word: "Owl" },
      { source: require("../../../assets/alphabets/Owl.mp4"), word: "Owl" },
    ],
    P: [
      { source: require("../../../assets/alphabets/P.mp4"), word: "Pencil" },
      {
        source: require("../../../assets/alphabets/Pencil.mp4"),
        word: "Pencil",
      },
    ],
    Q: [
      { source: require("../../../assets/alphabets/Q.mp4"), word: "Queen" },
      { source: require("../../../assets/alphabets/Queen.mp4"), word: "Queen" },
    ],
    R: [
      { source: require("../../../assets/alphabets/R.mp4"), word: "Rope" },
      { source: require("../../../assets/alphabets/Rope.mp4"), word: "Rope" },
    ],
    S: [
      { source: require("../../../assets/alphabets/S.mp4"), word: "School" },
      {
        source: require("../../../assets/alphabets/School.mp4"),
        word: "School",
      },
    ],
    T: [
      { source: require("../../../assets/alphabets/T.mp4"), word: "Tap" },
      { source: require("../../../assets/alphabets/Tap.mp4"), word: "Tap" },
    ],
    U: [
      { source: require("../../../assets/alphabets/U.mp4"), word: "Uniform" },
      {
        source: require("../../../assets/alphabets/Uniform.mp4"),
        word: "Uniform",
      },
    ],
    V: [
      { source: require("../../../assets/alphabets/V.mp4"), word: "Van" },
      { source: require("../../../assets/alphabets/Van.mp4"), word: "Van" },
    ],
    W: [
      { source: require("../../../assets/alphabets/W.mp4"), word: "Wheel" },
      { source: require("../../../assets/alphabets/Wheel.mp4"), word: "Wheel" },
    ],
    X: [
      { source: require("../../../assets/alphabets/X.mp4"), word: "X-Ray" },
      { source: require("../../../assets/alphabets/X-Ray.mp4"), word: "X-Ray" },
    ],
    Y: [
      { source: require("../../../assets/alphabets/Y.mp4"), word: "Yarn" },
      { source: require("../../../assets/alphabets/Yarn.mp4"), word: "Yarn" },
    ],
    Z: [
      { source: require("../../../assets/alphabets/Z.mp4"), word: "Zoo" },
      { source: require("../../../assets/alphabets/Zoo.mp4"), word: "Zoo" },
    ],
  };

  const videos = videoPaths[letter.toUpperCase()] || [];

  const iconMap = {
    Apple: { name: "apple", color: "#ff7043" }, // Original apple color (red)
    Banana: { name: "fruit-banana", color: "#FFEB3B" }, // Yellow for Banana
    Car: { name: "car", color: "#1976D2" }, // Blue for Car
    Duck: { name: "duck", color: "#FFEB3B" }, // Yellow for Duck
    Eye: { name: "eye", color: "#4CAF50" }, // Green for Eye
    Flower: { name: "flower", color: "#FF5722" }, // Orange for Flower
    Gate: { name: "gate", color: "#8BC34A" }, // Green for Gate
    Horse: { name: "horse", color: "#795548" }, // Brown for Horse
    Igloo: { name: "home-variant", color: "#B0BEC5" }, // Gray for Igloo
    Jug: { name: "cup", color: "#FFC107" }, // Yellow for Jug
    Kite: { name: "kite", color: "#E91E63" }, // Pink for Kite
    Leaf: { name: "leaf", color: "#388E3C" }, // Dark Green for Leaf
    Mango: { name: "fruit-cherries", color: "#FF9800" }, // Orange for Mango
    Nest: { name: "bird-nest", color: "#795548" }, // Brown for Nest
    Owl: { name: "owl", color: "#9E9E9E" }, // Gray for Owl
    Pencil: { name: "pencil", color: "#FFC107" }, // Yellow for Pencil
    Queen: { name: "crown", color: "#9C27B0" }, // Purple for Queen
    Rope: { name: "rope", color: "#FF5722" }, // Orange for Rope
    School: { name: "school", color: "#3F51B5" }, // Blue for School
    Tap: { name: "tap", color: "#03A9F4" }, // Blue for Tap
    Uniform: { name: "tshirt-crew", color: "#2196F3" }, // Blue for Uniform
    Van: { name: "van", color: "#FF9800" }, // Orange for Van
    Wheel: { name: "wheelchair", color: "#4CAF50" }, // Green for Wheel
    XRay: { name: "x-ray", color: "#FFEB3B" }, // Yellow for XRay
    Yarn: { name: "yarn", color: "#FF5722" }, // Orange for Yarn
    Zoo: { name: "paw", color: "#FF5722" }, // Orange for Zoo
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD59A", "#FFF4D3"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Animations for Letter {letter}</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {videos.length > 0 ? (
            videos.map((video, index) => {
              const { source, word } = video;
              const { name, color } = iconMap[word] || {
                name: "circle",
                color: "#000",
              }; // Default icon
              return (
                <View key={index} style={styles.itemContainer}>
                  {/* Display the word and its associated icon */}
                  {index === 1 && ( // Show icon only for the video associated with the word
                    <View style={styles.wordContainer}>
                      <Icon
                        name={name}
                        size={40}
                        color={color}
                        style={styles.icon}
                      />
                      <Text style={styles.itemText}>{word}</Text>
                    </View>
                  )}
                  {/* Display the video below */}
                  <Video
                    source={source}
                    style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                  />
                </View>
              );
            })
          ) : (
            <Text style={styles.noVideoText}>
              No videos available for this letter.
            </Text>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  itemContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  wordContainer: {
    alignItems: "center", // Align icon and text in the center vertically
    marginBottom: 10,
  },
  icon: {
    marginBottom: 5, // Add space between the icon and word
  },
  itemText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF7043",
  },
  video: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  noVideoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF7043",
    textAlign: "center",
    marginTop: 20,
  },
});

export default EnglishAnimations;
