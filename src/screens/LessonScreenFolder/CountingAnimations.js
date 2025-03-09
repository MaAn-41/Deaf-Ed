import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Video } from "expo-av";

const CountingAnimations = ({ route }) => {
  const { number } = route.params;

  const videoPaths = {
    0: [require("../../../assets/couting/0.mp4")],
    1: [require("../../../assets/couting/1.mp4")],
    2: [require("../../../assets/couting/2.mp4")],
    3: [require("../../../assets/couting/3.mp4")],
    4: [require("../../../assets/couting/4.mp4")],
    5: [require("../../../assets/couting/5.mp4")],
    6: [require("../../../assets/couting/6.mp4")],
    7: [require("../../../assets/couting/7.mp4")],
    8: [require("../../../assets/couting/7.mp4")],
    9: [require("../../../assets/couting/7.mp4")],
    10: [require("../../../assets/couting/10.mp4")],
  };

  const videos = videoPaths[number] || [];

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Animations for Number {number}</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {videos.length > 0 ? (
              videos.map((videoSource, index) => (
                <View key={index} style={styles.videoWrapper}>
                  <Video
                    source={videoSource}
                    style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                  />
                </View>
              ))
            ) : (
              <Text style={styles.noVideoText}>
                No videos available for this number.
              </Text>
            )}
          </ScrollView>
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
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Slightly transparent white overlay for readability
    alignItems: "center",
    width: "100%",
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
  videoWrapper: {
    borderWidth: 8,
    borderColor: "#007BFF",
    borderRadius: 10,
    overflow: "hidden",
  },
  video: {
    width: 300,
    height: 200,
    borderRadius: 10,
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
