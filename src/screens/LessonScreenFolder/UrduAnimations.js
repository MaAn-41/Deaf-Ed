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
      { source: require("../../../assets/alifbe/Alif.mp4"), word: "انار" },
      { source: require("../../../assets/urduwords/anaar.mp4"), word: "انار" },
    ],
    ب: [
      { source: require("../../../assets/alifbe/Bee.mp4"), word: "بطخ" },
      { source: require("../../../assets/alphabets/Duck.mp4"), word: "بطخ" },
    ],
    پ: [
      { source: require("../../../assets/alifbe/Pee.mp4"), word: "پینسل" },
      {
        source: require("../../../assets/alphabets/Pencil.mp4"),
        word: "پینسل",
      },
    ],
    ت: [
      { source: require("../../../assets/alifbe/Tee.mp4"), word: "تتلی" },
      { source: require("../../../assets/urduwords/titli.mp4"), word: "تتلی" },
    ],
    ٹ: [
      { source: require("../../../assets/alifbe/Tee.mp4"), word: "ٹوٹی" },
      { source: require("../../../assets/alphabets/Tap.mp4"), word: "ٹوٹی" },
    ],
    ث: [
      { source: require("../../../assets/alifbe/Saa.mp4"), word: "ثمر" },
      { source: require("../../../assets/urduwords/samar.mp4"), word: "ثمر" },
    ],
    ج: [
      { source: require("../../../assets/alifbe/jeem.mp4"), word: "گھڑا" },
      { source: require("../../../assets/alphabets/Jug.mp4"), word: "گھڑا" },
    ],
    چ: [
      { source: require("../../../assets/alifbe/chee.mp4"), word: "چڑیا" },
      {
        source: require("../../../assets/urduwords/chiriya.mp4"),
        word: "چڑیا",
      },
    ],
    ح: [
      { source: require("../../../assets/alifbe/Hee.mp4"), word: "حلوہ پوری" },
      {
        source: require("../../../assets/urduwords/halwa poori.mp4"),
        word: "حلوہ پوری",
      },
    ],
    خ: [
      { source: require("../../../assets/alifbe/khee.mp4"), word: "خربوزہ" },
      {
        source: require("../../../assets/urduwords/kharbooza.mp4"),
        word: "خربوزہ",
      },
    ],
    د: [
      { source: require("../../../assets/alifbe/daal.mp4"), word: "دروازہ" },
      {
        source: require("../../../assets/urduwords/darwaza.mp4"),
        word: "دروازہ",
      },
    ],
    ڈ: [
      { source: require("../../../assets/alifbe/dhaal.mp4"), word: "چڑیا" },
      {
        source: require("../../../assets/urduwords/chiriya.mp4"),
        word: "چڑیا",
      },
    ],
    ذ: [
      { source: require("../../../assets/alifbe/zaal.mp4"), word: "ذائقہ" },
      { source: require("../../../assets/urduwords/zaiqa.mp4"), word: "ذائقہ" },
    ],
    ر: [
      { source: require("../../../assets/alifbe/reey.mp4"), word: "رسی" },
      { source: require("../../../assets/alphabets/Rope.mp4"), word: "رسی" },
    ],
    ڑ: [
      { source: require("../../../assets/alifbe/areey.mp4"), word: "پہاڑ" },
      { source: require("../../../assets/urduwords/pahaar.mp4"), word: "پہاڑ" },
    ],
    ز: [
      { source: require("../../../assets/alifbe/zeey.mp4"), word: "زیبرا" },
      { source: require("../../../assets/urduwords/zebra.mp4"), word: "زیبرا" },
    ],
    ژ: [
      { source: require("../../../assets/alifbe/saay.mp4"), word: "ژالہ باری" },
      {
        source: require("../../../assets/urduwords/zala baari.mp4"),
        word: "ژالہ باری",
      },
    ],
    س: [
      { source: require("../../../assets/alifbe/seen.mp4"), word: "سکول" },
      { source: require("../../../assets/alphabets/School.mp4"), word: "سکول" },
    ],
    ش: [
      { source: require("../../../assets/alifbe/sheen.mp4"), word: "شیر" },
      { source: require("../../../assets/urduwords/shair.mp4"), word: "شیر" },
    ],
    ص: [
      { source: require("../../../assets/alifbe/suaad.mp4"), word: "صابن" },
      { source: require("../../../assets/urduwords/sabun.mp4"), word: "صابن" },
    ],
    ض: [
      { source: require("../../../assets/alifbe/zuaad.mp4"), word: "صابن" },
      { source: require("../../../assets/urduwords/sabun.mp4"), word: "صابن" },
    ],
    ط: [
      { source: require("../../../assets/alifbe/toeen.mp4"), word: "طوطا" },
      { source: require("../../../assets/urduwords/tota.mp4"), word: "طوطا" },
    ],
    ظ: [
      { source: require("../../../assets/alifbe/zoeen.mp4"), word: "طوطا" },
      { source: require("../../../assets/urduwords/tota.mp4"), word: "طوطا" },
    ],
    ع: [
      { source: require("../../../assets/alifbe/aeen.mp4"), word: "عینک" },
      { source: require("../../../assets/urduwords/ainak.mp4"), word: "عینک" },
    ],
    غ: [
      { source: require("../../../assets/alifbe/ghaeen.mp4"), word: "غبارہ" },
      {
        source: require("../../../assets/urduwords/gubara.mp4"),
        word: "غبارہ",
      },
    ],
    ف: [
      { source: require("../../../assets/alifbe/fee.mp4"), word: "فوارہ" },
      { source: require("../../../assets/urduwords/fuara.mp4"), word: "فوارہ" },
    ],
    ق: [
      { source: require("../../../assets/alifbe/kaaf.mp4"), word: "کرسی" },
      { source: require("../../../assets/urduwords/kursi.mp4"), word: "کرسی" },
    ],
    ک: [
      { source: require("../../../assets/alifbe/kaef.mp4"), word: "کرسی" },
      { source: require("../../../assets/urduwords/kursi.mp4"), word: "کرسی" },
    ],
    گ: [
      { source: require("../../../assets/alifbe/ghaaf.mp4"), word: "گھونسلا" },
      {
        source: require("../../../assets/alphabets/Nest.mp4"),
        word: "گھونسلا",
      },
    ],
    ل: [
      { source: require("../../../assets/alifbe/laam.mp4"), word: "لومڑی" },
      {
        source: require("../../../assets/urduwords/loomri.mp4"),
        word: "لومڑی",
      },
    ],
    م: [
      { source: require("../../../assets/alifbe/meem.mp4"), word: "مور" },
      { source: require("../../../assets/urduwords/moor.mp4"), word: "مور" },
    ],
    ن: [
      { source: require("../../../assets/alifbe/noon.mp4"), word: "نل" },
      { source: require("../../../assets/alphabets/Tap.mp4"), word: "نل" },
    ],
    و: [
      { source: require("../../../assets/alifbe/waoo.mp4"), word: "وین" },
      { source: require("../../../assets/alphabets/Van.mp4"), word: "وین" },
    ],
    ہ: [
      {
        source: require("../../../assets/alifbe/hee hathi wala.mp4"),
        word: "ہوائی جہاز",
      },
      {
        source: require("../../../assets/urduwords/hawai jahaz.mp4"),
        word: "ہوائی جہاز",
      },
    ],
    ی: [
      {
        source: require("../../../assets/alifbe/choti yee.mp4"),
        word: "ژالہ باری",
      },
      {
        source: require("../../../assets/urduwords/zala baari.mp4"),
        word: "ژالہ باری",
      },
    ],
  };

  const videos = videoPaths[letter] || [];

  const iconMap = {
    انار: { name: "fruit-pomegranate", color: "#FF7043" },
    بطخ: { name: "duck", color: "#FFEB3B" },
    پنسل: { name: "pencil", color: "#FFC107" },
    تتلی: { name: "butterfly", color: "#FF5722" },
    نل: { name: "tap", color: "#03A9F4" },
    ٹوٹی: { name: "tap", color: "#03A9F4" },
    ثمر: { name: "fruit", color: "#4CAF50" },
    گھڑا: { name: "jug", color: "#FFC107" },
    چڑیا: { name: "bird", color: "#9C27B0" },
    "حلوہ پوری": { name: "cake", color: "#FF9800" },
    خربوزہ: { name: "watermelon", color: "#4CAF50" },
    دروازہ: { name: "door", color: "#795548" },
    ذائقہ: { name: "food", color: "#FF5722" },
    رسی: { name: "rope", color: "#FFEB3B" },
    پہاڑ: { name: "mountain", color: "#3F51B5" },
    زیبرا: { name: "zebra", color: "#000" },
    اسکول: { name: "school", color: "#2196F3" },
    شیر: { name: "lion", color: "#FF9800" },
    صابن: { name: "soap", color: "#FFC107" },
    طوطا: { name: "parrot", color: "#4CAF50" },
    عینک: { name: "glasses", color: "#9C27B0" },
    غبارہ: { name: "balloon", color: "#FF5722" },
    فوارہ: { name: "shower", color: "#03A9F4" },
    کرسی: { name: "chair", color: "#795548" },
    مور: { name: "peacock", color: "#3F51B5" },
    وین: { name: "van", color: "#FF9800" },
    " ژالہ باری": { name: "weather-hail", color: "#B0BEC5" },
  };

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay1}>
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
                  <View
                    key={index}
                    style={[
                      styles.itemContainer,
                      index === 1 && styles.secondVideo,
                    ]}
                  >
                    <View style={styles.videoWrapper}>
                      <Video
                        source={source}
                        style={styles.video}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                      />

                      {index === 1 && (
                        <View style={styles.overlay}>
                          <Icon
                            name={name}
                            size={40}
                            color={color}
                            style={styles.icon}
                          />
                          <Text style={styles.itemText}>{word}</Text>
                        </View>
                      )}
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
  overlay1: {
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
  secondVideo: {
    marginTop: 60, // Moves the second video lower
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
