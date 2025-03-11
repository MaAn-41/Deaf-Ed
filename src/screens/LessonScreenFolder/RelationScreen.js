import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import axios from "axios";
import BASE_URL from "../../../config";

const RelationScreen = ({ navigation, route }) => {
  const relationWords = [
    { en: "Family", ur: "خاندان" },
    { en: "Father", ur: "والد" },
    { en: "Mother", ur: "والدہ" },
    { en: "Aunt", ur: "چچی / خالہ" },
    { en: "Uncle", ur: "چچا / ماموں" },
    { en: "Boy", ur: "لڑکا" },
    { en: "Girl", ur: "لڑکی" },
    { en: "Sister", ur: "بہن" },
    { en: "Brother", ur: "بھائی" },
    { en: "Daughter", ur: "بیٹی" },
    { en: "Son", ur: "بیٹا" },
    { en: "Friend", ur: "دوست" },
    { en: "Grandfather", ur: "دادا / نانا" },
    { en: "Grandmother", ur: "دادی / نانی" },
    { en: "Parents", ur: "والدین" },
    { en: "Siblings", ur: "بہن بھائی" },
  ];

  const { Username } = route.params;
  const [openedWords, setOpenedWords] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/relationProgress?username=${Username}`
        );
        setOpenedWords(response.data.openedWords || []);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, []);

  const handleWordClick = async (word) => {
    try {
      await axios.post(`${BASE_URL}/relationProgress`, {
        username: Username,
        word,
      });
      setOpenedWords((prev) => [...prev, word]);
      navigation.navigate("RelationAnimations", { word });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Realtions </Text>
        <Text style={styles.subtitle}>Select to Learn</Text>

        <ScrollView contentContainerStyle={styles.buttonsContainer}>
          {relationWords.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                openedWords.includes(item.en)
                  ? styles.buttonOpened
                  : styles.buttonDefault,
              ]}
              onPress={() => handleWordClick(item.en)}
            >
              <Text style={styles.buttonText}>
                {item.en} / {item.ur}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Light overlay for readability
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#000",
    marginBottom: 20,
  },
  buttonsContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 25,
    elevation: 6,
  },
  buttonDefault: {
    backgroundColor: "#4FC3F7",
  },
  buttonOpened: {
    backgroundColor: "#BDBDBD",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default RelationScreen;
