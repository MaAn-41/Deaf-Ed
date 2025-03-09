import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UrduAnimations = ({ route }) => {
  const { letter } = route.params;

  const videoPaths = {
    ا: [
      {
        source: require("../../../assets/alifbe/Alif.mp4"),
        word: "Pomegranate",
      },
      {
        source: require("../../../assets/urduwords/anaar.mp4"),
        word: "Pomegranate",
      },
    ],
    ب: [
      { source: require("../../../assets/alifbe/Bee.mp4"), word: "Duck" },
      {
        source: require("../../../assets/alphabets/Duck.mp4"),
        word: "Duck",
      },
    ],
    پ: [
      { source: require("../../../assets/alifbe/Pee.mp4"), word: "Pencil" },
      {
        source: require("../../../assets/alphabets/Pencil.mp4"),
        word: "Pencil",
      },
    ],
    ت: [
      { source: require("../../../assets/alifbe/Tee.mp4"), word: "Butterfly" },
      {
        source: require("../../../assets/urduwords/titli.mp4"),
        word: "Butterfly",
      },
    ],
    ٹ: [
      { source: require("../../../assets/alifbe/Tee.mp4"), word: "Tap" },
      {
        source: require("../../../assets/alphabets/Tap.mp4"),
        word: "Tap",
      },
    ],
    ث: [
      { source: require("../../../assets/alifbe/Saa.mp4"), word: "Fruit" },
      {
        source: require("../../../assets/urduwords/samar.mp4"),
        word: "Fruit",
      },
    ],
    ج: [
      { source: require("../../../assets/alifbe/jeem.mp4"), word: "Jug" },
      { source: require("../../../assets/alphabets/Jug.mp4"), word: "Jug" },
    ],
    چ: [
      { source: require("../../../assets/alifbe/chee.mp4"), word: "Sparrow" },
      {
        source: require("../../../assets/urduwords/chiriya.mp4"),
        word: "Sparrow",
      },
    ],
    ح: [
      { source: require("../../../assets/alifbe/Hee.mp4"), word: "Halwa pori" },
      {
        source: require("../../../assets/urduwords/halwa poori.mp4"),
        word: "Halwa pori",
      },
    ],
    خ: [
      { source: require("../../../assets/alifbe/khee.mp4"), word: "Melon" },
      {
        source: require("../../../assets/urduwords/kharbooza.mp4"),
        word: "Melon",
      },
    ],
    د: [
      { source: require("../../../assets/alifbe/daal.mp4"), word: "Door" },
      {
        source: require("../../../assets/urduwords/darwaza.mp4"),
        word: "Door",
      },
    ],
    ڈ: [
      {
        source: require("../../../assets/alifbe/dhaal.mp4"),
        word: "Sparrow",
      },
      {
        source: require("../../../assets/urduwords/chiriya.mp4"),
        word: "Sparrow",
      },
    ],
    ذ: [
      { source: require("../../../assets/alifbe/zaal.mp4"), word: "Taste" },
      {
        source: require("../../../assets/urduwords/zaiqa.mp4"),
        word: "Taste",
      },
    ],
    ر: [
      { source: require("../../../assets/alifbe/reey.mp4"), word: "Rope" },
      { source: require("../../../assets/alphabets/Rope.mp4"), word: "Rope" },
    ],
    ڑ: [
      {
        source: require("../../../assets/alifbe/areey.mp4"),
        word: "Mountain",
      },
      {
        source: require("../../../assets/urduwords/pahaar.mp4"),
        word: "Mountain",
      },
    ],
    ز: [
      { source: require("../../../assets/alifbe/zeey.mp4"), word: "Zebra" },
      {
        source: require("../../../assets/urduwords/zebra.mp4"),
        word: "Zebra",
      },
    ],
    ژ: [
      {
        source: require("../../../assets/alifbe/saay.mp4"),
        word: "Hail storm",
      },
      {
        source: require("../../../assets/urduwords/zala baari.mp4"),
        word: "Hail storm",
      },
    ],
    س: [
      { source: require("../../../assets/alifbe/seen.mp4"), word: "School" },
      {
        source: require("../../../assets/alphabets/School.mp4"),
        word: "School",
      },
    ],
    ش: [
      {
        source: require("../../../assets/alifbe/sheen.mp4"),
        word: "Lion",
      },
      {
        source: require("../../../assets/urduwords/shair.mp4"),
        word: "Lion",
      },
    ],
    ص: [
      {
        source: require("../../../assets/alifbe/suaad.mp4"),
        word: "Soap",
      },
      {
        source: require("../../../assets/urduwords/sabun.mp4"),
        word: "Soap",
      },
    ],
    ض: [
      {
        source: require("../../../assets/alifbe/zuaad.mp4"),
        word: "Soap",
      },
      {
        source: require("../../../assets/urduwords/sabun.mp4"),
        word: "Soap",
      },
    ],
    ط: [
      {
        source: require("../../../assets/alifbe/toeen.mp4"),
        word: "Parrot",
      },
      { source: require("../../../assets/urduwords/tota.mp4"), word: "Parrot" },
    ],
    ظ: [
      {
        source: require("../../../assets/alifbe/zoeen.mp4"),
        word: "Parrot",
      },
      { source: require("../../../assets/urduwords/tota.mp4"), word: "Parrot" },
    ],
    ع: [
      { source: require("../../../assets/alifbe/aeen.mp4"), word: "Glasses" },
      {
        source: require("../../../assets/urduwords/ainak.mp4"),
        word: "Glasses",
      },
    ],
    غ: [
      {
        source: require("../../../assets/alifbe/ghaeen.mp4"),
        word: "Balloon",
      },
      {
        source: require("../../../assets/urduwords/gubara.mp4"),
        word: "Balloon",
      },
    ],
    ف: [
      { source: require("../../../assets/alifbe/fee.mp4"), word: "Shower" },
      {
        source: require("../../../assets/urduwords/fuara.mp4"),
        word: "Shower",
      },
    ],
    ق: [
      { source: require("../../../assets/alifbe/kaaf.mp4"), word: "Chair" },
      {
        source: require("../../../assets/urduwords/kursi.mp4"),
        word: "Chair",
      },
    ],
    ک: [
      { source: require("../../../assets/alifbe/kaef.mp4"), word: "Chair" },
      {
        source: require("../../../assets/urduwords/kursi.mp4"),
        word: "Chair",
      },
    ],
    گ: [
      {
        source: require("../../../assets/alifbe/ghaaf.mp4"),
        word: "Nest",
      },
      { source: require("../../../assets/alphabets/Nest.mp4"), word: "Nest" },
    ],
    ل: [
      { source: require("../../../assets/alifbe/laam.mp4"), word: "Fox" },
      {
        source: require("../../../assets/urduwords/loomri.mp4"),
        word: "Fox",
      },
    ],
    م: [
      { source: require("../../../assets/alifbe/meem.mp4"), word: "Peacock" },
      {
        source: require("../../../assets/urduwords/moor.mp4"),
        word: "Peacock",
      },
    ],
    ن: [
      { source: require("../../../assets/alifbe/noon.mp4"), word: "Tap" },
      { source: require("../../../assets/alphabets/Tap.mp4"), word: "Tap" },
    ],
    ں: [
      { source: require("../../../assets/alifbe/noon.mp4"), word: "Tap" },
      { source: require("../../../assets/alphabets/Tap.mp4"), word: "Tap" },
    ],
    و: [
      { source: require("../../../assets/alifbe/waoo.mp4"), word: "Van" },
      {
        source: require("../../../assets/alphabets/Van.mp4"),
        word: "Van",
      },
    ],
    ہ: [
      {
        source: require("../../../assets/alifbe/hee hathi wala.mp4"),
        word: "Aeroplane",
      },
      {
        source: require("../../../assets/urduwords/hawai jahaz.mp4"),
        word: "Aeroplane",
      },
    ],
    ء: [
      {
        source: require("../../../assets/alifbe/hamza.mp4"),
        word: "Aeroplane",
      },
      {
        source: require("../../../assets/urduwords/hawai jahaz.mp4"),
        word: "Aeroplane",
      },
    ],
    ی: [
      {
        source: require("../../../assets/alifbe/choti yee.mp4"),
        word: "Hail storm",
      },
      {
        source: require("../../../assets/urduwords/zala baari.mp4"),
        word: "Hail storm",
      },
    ],
    ے: [
      {
        source: require("../../../assets/alifbe/bari yee.mp4"),
        word: "Hail storm",
      },
      {
        source: require("../../../assets/urduwords/zala baari.mp4"),
        word: "Hail storm",
      },
    ],
  };

  const videos = videoPaths[letter] || [];

  const iconMap = {
    Pomegranate: { name: "fruit-pomegranate", color: "#FF7043" },
    Duck: { name: "duck", color: "#FFEB3B" },
    Pencil: { name: "pencil", color: "#FFC107" },
    Butterfly: { name: "butterfly", color: "#FF5722" },
    Tap: { name: "tap", color: "#03A9F4" },
    Fruit: { name: "fruit", color: "#4CAF50" },
    Jug: { name: "jug", color: "#FFC107" },
    Sparrow: { name: "bird", color: "#9C27B0" },
    "Halwa pori": { name: "cake", color: "#FF9800" },
    Melon: { name: "watermelon", color: "#4CAF50" },
    Door: { name: "door", color: "#795548" },
    Taste: { name: "food", color: "#FF5722" },
    Rope: { name: "rope", color: "#FFEB3B" },
    Mountain: { name: "mountain", color: "#3F51B5" },
    Zebra: { name: "zebra", color: "#000" },
    "Hail storm": { name: "weather-hail", color: "#B0BEC5" },
    School: { name: "school", color: "#2196F3" },
    Lion: { name: "lion", color: "#FF9800" },
    Soap: { name: "soap", color: "#FFC107" },
    Parrot: { name: "parrot", color: "#4CAF50" },
    Glasses: { name: "glasses", color: "#9C27B0" },
    Balloon: { name: "balloon", color: "#FF5722" },
    Shower: { name: "shower", color: "#03A9F4" },
    Chair: { name: "chair", color: "#795548" },
    Nest: { name: "nest", color: "#4CAF50" },
    Fox: { name: "fox", color: "#FF5722" },
    Peacock: { name: "peacock", color: "#3F51B5" },
    Van: { name: "van", color: "#FF9800" },
    Aeroplane: { name: "airplane", color: "#2196F3" },
    "Hail storm": { name: "weather-hail", color: "#B0BEC5" },
  };

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Animations for Letter {letter}</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {videos.length > 0 ? (
              videos.map((video, index) => {
                const { source, word } = video;
                const { name, color } = iconMap[word] || {
                  name: "circle",
                  color: "#000",
                };

                return (
                  <View key={index} style={styles.itemContainer}>
                    <View style={styles.videoWrapper}>
                      <Video
                        source={source}
                        style={styles.video}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                      />
                      <View style={styles.overlay}>
                        <Icon
                          name={name}
                          size={40}
                          color={color}
                          style={styles.icon}
                        />
                        <Text style={styles.itemText}>{word}</Text>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={styles.noVideoText}>
                No videos available for this letter.
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
    backgroundColor: "rgba(255, 255, 255, 0.6)",
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
  itemContainer: {
    alignItems: "center",
    marginBottom: 20,
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
  overlay: {
    position: "absolute",
    left: 10,
    top: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
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

export default UrduAnimations;
