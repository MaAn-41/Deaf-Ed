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
      { source: require("../../../assets/alifbe/Alif.mp4"), word: "Apple" },
      { source: require("../../../assets/alphabets/Apple.mp4"), word: "Apple" },
    ],
    ب: [
      { source: require("../../../assets/alifbe/Bee.mp4"), word: "Banana" },
      {
        source: require("../../../assets/alphabets/Banana.mp4"),
        word: "Banana",
      },
    ],
    // پ: [
    //   { source: require("../../../assets/alifbe/Pee.mp4"), word: "Banana" },
    //   {
    //     source: require("../../../assets/alphabets/Pencil.mp4"),
    //     word: "Banana",
    //   },
    // ],
    // ت: [
    //   { source: require("../../../assets/alifbe/Tee.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Tap.mp4"), word: "Banana" },
    // ],
    // ٹ: [
    //   { source: require("../../../assets/alifbe/Tee.mp4"), word: "Banana" },
    //   {
    //     source: require("../../../assets/alphabets/Turtle.mp4"),
    //     word: "Banana",
    //   },
    // ],
    // ث: [
    //   { source: require("../../../assets/alifbe/Saa.mp4"), word: "Banana" },
    //   {
    //     source: require("../../../assets/alphabets/Thumb.mp4"),
    //     word: "Banana",
    //   },
    // ],
    // ج: [
    //   { source: require("../../../assets/alifbe/Jeem.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Jug.mp4"), word: "Banana" },
    // ],
    // چ: [
    //   { source: require("../../../assets/alifbe/chee.mp4"), word: "Banana" },
    //   {
    //     source: require("../../../assets/alphabets/Chair.mp4"),
    //     word: "Banana",
    //   },
    // ],
    // ح: [
    //   { source: require("../../../assets/alifbe/Hee.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Hat.mp4"), word: "Banana" },
    // ],
    // خ: [
    //   { source: require("../../../assets/alifbe/khee.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Kite.mp4"), word: "Banana" },
    // ],
    // د: [
    //   { source: require("../../../assets/alifbe/daal.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Duck.mp4"), word: "Banana" },
    // ],
    // ڈ: [
    //   {
    //     source: require("../../../assets/alifbe/dhaal.mp4"),
    //     word: "Banana",
    //   },
    //   { source: require("../../../assets/alphabets/Drum.mp4"), word: "Banana" },
    // ],
    // ذ: [
    //   { source: require("../../../assets/alifbe/zaal.mp4"), word: "Banana" },
    //   {
    //     source: require("../../../assets/alphabets/Zebra.mp4"),
    //     word: "Banana",
    //   },
    // ],
    // ر: [
    //   { source: require("../../../assets/alifbe/reey.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Rat.mp4"), word: "Banana" },
    // ],
    // ڑ: [
    //   {
    //     source: require("../../../assets/alifbe/areey.mp4"),
    //     word: "Banana",
    //   },
    //   { source: require("../../../assets/alphabets/Rope.mp4"), word: "Banana" },
    // ],
    // ز: [
    //   { source: require("../../../assets/alifbe/zeey.mp4"), word: "Banana" },
    //   {
    //     source: require("../../../assets/alphabets/Banana.mp4"),
    //     word: "Banana",
    //   },
    // ],
    // ژ: [
    //   { source: require("../../../assets/alifbe/saay.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Zh.mp4"), word: "Banana" },
    // ],
    // س: [
    //   { source: require("../../../assets/alifbe/seen.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Sun.mp4"), word: "Banana" },
    // ],
    // ش: [
    //   {
    //     source: require("../../../assets/alifbe/sheen.mp4"),
    //     word: "Banana",
    //   },
    //   {
    //     source: require("../../../assets/alphabets/Shirt.mp4"),
    //     word: "Banana",
    //   },
    // ],
    // ص: [
    //   {
    //     source: require("../../../assets/alifbe/suaad.mp4"),
    //     word: "Banana",
    //   },
    //   { source: require("../../../assets/alphabets/Sad.mp4"), word: "Banana" },
    // ],
    // ض: [
    //   {
    //     source: require("../../../assets/alifbe/zuaad.mp4"),
    //     word: "Banana",
    //   },
    //   { source: require("../../../assets/alphabets/Zad.mp4"), word: "Banana" },
    // ],
    // ط: [
    //   {
    //     source: require("../../../assets/alifbe/toeen.mp4"),
    //     word: "Banana",
    //   },
    //   { source: require("../../../assets/alphabets/Ta.mp4"), word: "Banana" },
    // ],
    // ظ: [
    //   {
    //     source: require("../../../assets/alifbe/zoeen.mp4"),
    //     word: "Banana",
    //   },
    //   { source: require("../../../assets/alphabets/Zha.mp4"), word: "Banana" },
    // ],
    // ع: [
    //   { source: require("../../../assets/alifbe/aeen.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Ain.mp4"), word: "Banana" },
    // ],
    // غ: [
    //   {
    //     source: require("../../../assets/alifbe/ghaeen.mp4"),
    //     word: "Banana",
    //   },
    //   {
    //     source: require("../../../assets/alifbe/Ghain.mp4"),
    //     word: "Banana",
    //   },
    // ],
    // ف: [
    //   { source: require("../../../assets/alifbe/fee.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Fish.mp4"), word: "Banana" },
    // ],
    // ق: [
    //   { source: require("../../../assets/alifbe/kaaf.mp4"), word: "Banana" },
    //   {
    //     source: require("../../../assets/alifbe/Queen.mp4"),
    //     word: "Banana",
    //   },
    // ],
    // ک: [
    //   { source: require("../../../assets/alifbe/kaef.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Kite.mp4"), word: "Banana" },
    // ],
    // گ: [
    //   {
    //     source: require("../../../assets/alifbe/ghaaf.mp4"),
    //     word: "Banana",
    //   },
    //   { source: require("../../../assets/alphabets/Goat.mp4"), word: "Banana" },
    // ],
    // ل: [
    //   { source: require("../../../assets/alifbe/laam.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Leaf.mp4"), word: "Banana" },
    // ],
    // م: [
    //   { source: require("../../../assets/alifbe/meem.mp4"), word: "Banana" },
    //   {
    //     source: require("../../../assets/alphabets/Mango.mp4"),
    //     word: "Banana",
    //   },
    // ],
    // ن: [
    //   { source: require("../../../assets/alifbe/noon.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Nest.mp4"), word: "Banana" },
    // ],
    // ں: [
    //   { source: require("../../../assets/alifbe/noon.mp4"), word: "Banana" },
    //   { source: require("../../../assets/alphabets/Nn.mp4"), word: "Banana" },
    // ],
    // و: [
    //   { source: require("../../../assets/alifbe/waoo.mp4"), word: "Banana" },
    //   {
    //     source: require("../../../assets/alphabets/Wagon.mp4"),
    //     word: "Banana",
    //   },
    // ],
    // ہ: [
    //   {
    //     source: require("../../../assets/alifbe/hee hathi wala.mp4"),
    //     word: "Banana",
    //   },
    //   { source: require("../../../assets/alphabets/Hat.mp4"), word: "Banana" },
    // ],
    // ء: [
    //   {
    //     source: require("../../../assets/alifbe/hamza.mp4"),
    //     word: "Banana",
    //   },
    //   { source: require("../../../assets/alphabets/A.mp4"), word: "Banana" },
    // ],
    // ی: [
    //   {
    //     source: require("../../../assets/alifbe/choti yee.mp4"),
    //     word: "Banana",
    //   },
    //   { source: require("../../../assets/alphabets/Yarn.mp4"), word: "Banana" },
    // ],
    // ے: [
    //   {
    //     source: require("../../../assets/alifbe/bari yee.mp4"),
    //     word: "Banana",
    //   },
    //   { source: require("../../../assets/alphabets/Eye.mp4"), word: "Banana" },
    // ],
  };

  const videos = videoPaths[letter] || [];

  const iconMap = {
    Apple: { name: "apple", color: "#ff7043" },
    Banana: { name: "fruit-banana", color: "#FFEB3B" },
    Pencil: { name: "pencil", color: "#FFC107" },
    Tap: { name: "tap", color: "#03A9F4" },
    Turtle: { name: "turtle", color: "#4CAF50" },
    Thumb: { name: "thumb-up", color: "#FF5722" },
    Chair: { name: "chair", color: "#9C27B0" },
    Hat: { name: "hat-fedora", color: "#795548" },
    Kite: { name: "kite", color: "#2196F3" },
    Duck: { name: "duck", color: "#FFEB3B" },
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
