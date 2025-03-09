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

const FoodScreen = ({ navigation, route }) => {
  const foodItems = [
    { english: "Breakfast", urdu: "ناشتہ" },
    { english: "Dinner", urdu: "رات کا کھانا" },
    { english: "Lunch", urdu: "دوپہر کا کھانا" },
    { english: "Paratha", urdu: "پراٹھا" },
    { english: "Omelette", urdu: "آملیٹ" },
    { english: "Rice", urdu: "چاول" },
    { english: "Roti", urdu: "روٹی" },
    { english: "Sandwich", urdu: "سینڈوچ" },
    { english: "Bread", urdu: "ڈبل روٹی" },
    { english: "Sugar", urdu: "چینی" },
    { english: "Butter", urdu: "مکھن" },
    { english: "Candy", urdu: "میٹھی گولیاں" },
    { english: "Chips", urdu: "چپس" },
    { english: "Cookies", urdu: "بسکٹ" },
    { english: "Egg", urdu: "انڈہ" },
    { english: "Water", urdu: "پانی" },
  ];

  const { Username } = route.params;
  const [openedWords, setOpenedWords] = useState([]);
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/foodProgress?username=${Username}`
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
      await axios.post(`${BASE_URL}/foodProgress`, {
        username: Username,
        word,
      });
      setOpenedWords((prev) => [...prev, word]);
      navigation.navigate("FoodAnimations", { word });
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
        <Text style={styles.title}>کھانے کی اشیاء</Text>
        <Text style={styles.subtitle}>سیکھنے کے لیے منتخب کریں</Text>

        <ScrollView contentContainerStyle={styles.buttonsContainer}>
          {foodItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                openedWords.includes(item.english)
                  ? styles.buttonOpened
                  : styles.buttonDefault,
              ]}
              onPress={() => handleWordClick(item.english)}
            >
              <Text style={styles.buttonText}>
                {item.english} / {item.urdu}
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default FoodScreen;
