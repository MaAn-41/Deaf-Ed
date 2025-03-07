import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import BASE_URL2 from "../../../../config2";

const FreeFallCountingScreen = () => {
  const [gesture, setGesture] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    const fetchGesture = () => {
      fetch(`${BASE_URL2}:5001/recognized_gesture_math`)
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
      <Text style={styles.header}>Math Counting Gesture Recognition</Text>
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: `${BASE_URL2}:5001/video_feed_math` }}
          style={styles.webview}
        />
      </View>
      {gesture ? (
        <Text style={styles.gestureText}>
          Recognized Number: {gesture} ({accuracy}%)
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
    width: "100%",
    height: 300,
  },
  webview: {
    flex: 1,
  },
  gestureText: {
    fontSize: 20,
    color: "#333",
    marginTop: 10,
  },
});

export default FreeFallCountingScreen;
