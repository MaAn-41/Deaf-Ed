import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const EnglishAnimations = ({ route }) => {
  const { letter } = route.params;

  const videoPaths = {
    A: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    B: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    C: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    D: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    E: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    F: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    G: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    H: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],

    I: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    J: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    K: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    L: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    M: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    N: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    O: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    Q: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    R: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    S: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    T: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    U: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    V: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    W: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    X: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    Y: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
    Z: [
      require("../../../assets/alphabets/A.mp4"),
      require("../../../assets/alphabets/Apple.mp4"),
    ],
  };
  const videos = videoPaths[letter.toUpperCase()] || [];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD59A", "#FFF4D3"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Animations for Letter {letter}</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {videos.length > 0 ? (
            videos.map((videoSource, index) => (
              <Video
                key={index}
                source={videoSource}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                isLooping
              />
            ))
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
