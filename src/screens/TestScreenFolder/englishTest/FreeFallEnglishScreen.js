import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import BASE_URL2 from "../../../../config2";

const FreeFallEnglishScreen = () => {
  const [gesture, setGesture] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    const fetchGesture = () => {
      fetch(`${BASE_URL2}/recognized_gesture-english`)
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
    <View style={styles.container}>
      <Text style={styles.header}>Free Fall Gesture Recognition</Text>
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: `${BASE_URL2}/video_feed-english` }}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 10,
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
  },
});

export default FreeFallEnglishScreen;
