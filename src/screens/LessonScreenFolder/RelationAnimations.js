import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const RelationAnimations = ({ route }) => {
  const { word } = route.params;

  // Define video paths for each word
  const videoPaths = {
    Family: require("../../../assets/relations/family.mp4"),
    Father: require("../../../assets/relations/father.mp4"),
    Mother: require("../../../assets/relations/mother.mp4"),
    Aunt: require("../../../assets/relations/aunt.mp4"),
    Uncle: require("../../../assets/relations/uncle.mp4"),
    Boy: require("../../../assets/relations/boy.mp4"),
    Girl: require("../../../assets/relations/girl.mp4"),
    Sister: require("../../../assets/relations/sister.mp4"),
    Brother: require("../../../assets/relations/sister.mp4"),
    Daughter: require("../../../assets/relations/daughter.mp4"),
    Son: require("../../../assets/relations/son.mp4"),
    Friend: require("../../../assets/relations/friend.mp4"),
    Grandfather: require("../../../assets/relations/grandfather.mp4"),
    Grandmother: require("../../../assets/relations/grandmother.mp4"),
    Parents: require("../../../assets/relations/parent.mp4"),
    Siblings: require("../../../assets/relations/siblings.mp4"),
  };

  const iconMap = {
    Family: { name: "account-group", color: "#FF7043" },
    Father: { name: "account-daddy", color: "#FFEB3B" },
    Mother: { name: "account-mama", color: "#4CAF50" },
    Aunt: { name: "account-aunt", color: "#2196F3" },
    Uncle: { name: "account-uncle", color: "#FF9800" },
    Boy: { name: "account-boy", color: "#9C27B0" },
    Girl: { name: "account-girl", color: "#FF5722" },
    Sister: { name: "account-sister", color: "#3F51B5" },
    Brother: { name: "account-brother", color: "#FFC107" },
    Daughter: { name: "account-daughter", color: "#8BC34A" },
    Son: { name: "account-son", color: "#FF7043" },
    Friend: { name: "account-friend", color: "#FFEB3B" },
    Grandfather: { name: "account-grandfather", color: "#4CAF50" },
    Grandmother: { name: "account-grandmother", color: "#2196F3" },
    Parents: { name: "account-parents", color: "#FF9800" },
    Siblings: { name: "account-siblings", color: "#9C27B0" },
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

export default RelationAnimations;
