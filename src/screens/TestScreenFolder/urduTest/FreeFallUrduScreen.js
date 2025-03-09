import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { WebView } from "react-native-webview";
import BASE_URL2 from "../../../../config2";
import BASE_URL from "../../../../config";

const FreeFallUrduScreen = () => {
  const [gesture, setGesture] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    const fetchGesture = () => {
      fetch(`${BASE_URL2}/recognized_gesture-urdu`)
        .then((res) => res.json())
        .then((data) => {
          setGesture(data.gesture);
          setAccuracy(data.accuracy);
        })
        .catch((err) => console.error("Error fetching gesture:", err));
    };

    const interval = setInterval(fetchGesture, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={require("../../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Free Fall Gesture Recognition</Text>
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: `${BASE_URL2}/video_feed-urdu` }}
            style={styles.webview}
          />
        </View>
        {gesture ? (
          <Text style={styles.gestureText}>
            Gesture: {gesture} ({accuracy}%)
          </Text>
        ) : (
          <ActivityIndicator size="large" color="#4FC3F7" />
        )}
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
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 10,
    textAlign: "center",
  },
  videoContainer: {
    width: 300,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4FC3F7",
    overflow: "hidden",
  },
  webview: {
    width: "100%",
    height: "100%",
  },
  gestureText: {
    marginTop: 20,
    fontSize: 20,
    color: "#4FC3F7",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FreeFallUrduScreen;
