import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
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
    <ImageBackground
      source={require("../../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={["rgba(255,255,255,0.6)", "rgba(255,255,255,0.6)"]}
        style={styles.overlay}
      >
        <View style={styles.container}>
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
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 20,
    textAlign: "center",
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
    backgroundColor: "#4FC3F7",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AlifBeTestScreen;
