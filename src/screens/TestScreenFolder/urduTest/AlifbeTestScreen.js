import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const romanUrduLabels = [
  "1-Hay",
  "Ain",
  "Alif",
  "Bay",
  "Byeh",
  "Chay",
  "Cyeh",
  "Daal",
  "Dal",
  "Dochahay",
  "Fay",
  "Gaaf",
  "Ghain",
  "Hamza",
  "Kaf",
  "Khay",
  "Kiaf",
  "Lam",
  "Meem",
  "Nuun",
  "Nuungh",
  "Pay",
  "Ray",
  "Say",
  "Seen",
  "Sheen",
  "Suad",
  "Taay",
  "Tay",
  "Tuey",
  "Wao",
  "Zaal",
  "Zaey",
  "Zay",
  "Zuad",
  "Zuey",
];

const AlifBeTestScreen = ({ route }) => {
  const navigation = useNavigation();
  const { Username } = route.params;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD59A", "#FFF4D3"]}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Alif Be Test</Text>

        <ScrollView contentContainerStyle={styles.buttonsContainer}>
          {romanUrduLabels.map((label, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() =>
                navigation.navigate("HurfPracticeScreen", { label, Username })
              }
            >
              <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
  },
  buttonsContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: "#4FC3F7",
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    borderRadius: 50,
    elevation: 6,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AlifBeTestScreen;
