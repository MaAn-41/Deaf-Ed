import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const CountingAnimations = ({ route }) => {
  const { number } = route.params;

  const videoPaths = {
    0: [require("../../../assets/alphabets/A.mp4")],
    1: [require("../../../assets/alphabets/A.mp4")],
    2: [require("../../../assets/alphabets/A.mp4")],
    3: [require("../../../assets/alphabets/A.mp4")],
    4: [require("../../../assets/alphabets/A.mp4")],
    5: [require("../../../assets/alphabets/A.mp4")],
    6: [require("../../../assets/alphabets/A.mp4")],
    7: [require("../../../assets/alphabets/A.mp4")],
    8: [require("../../../assets/alphabets/A.mp4")],
    9: [require("../../../assets/alphabets/A.mp4")],
    10: [require("../../../assets/alphabets/A.mp4")],
  };

  const videos = videoPaths[number] || [];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD59A", "#FFF4D3"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Animations for Number {number}</Text>
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
              No videos available for this number.
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

export default CountingAnimations;
