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

const urduLabels = {
  Alif: "ا",
  Bay: "ب",
  Pay: "پ",
  Tay: "ت",
  Taay: "ٹ",
  Say: "ث",
  Jeem: "ج",
  Chay: "چ",
  "1-Hay": "ح",
  Khay: "خ",
  Dal: "د",
  Daal: "ڈ",
  Zaal: "ذ",
  Ray: "ر",
  Aray: "ڑ",
  Zay: "ز",
  Zaey: "ژ",
  Seen: "س",
  Sheen: "ش",
  Suad: "ص",
  Zuad: "ض",
  Tuey: "ط",
  Zuey: "ظ",
  Ain: "ع",
  Ghain: "غ",
  Fay: "ف",
  Kaf: "ق",
  Kiaf: "ک",
  Gaaf: "گ",
  Lam: "ل",
  Meem: "م",
  Nuun: "ن",
  Nuungh: "ں",
  Wao: "و",
  Hay: "ہ",
  Dochahay: "ھ",
  Hamza: "ء",
  Cyeh: "ئ",
  Byeh: "ے",
};

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
            {Object.entries(urduLabels).map(([roman, urdu], index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() =>
                  navigation.navigate("HurfPracticeScreen", {
                    roman,
                    urdu,
                    Username,
                  })
                }
              >
                <Text style={styles.buttonText}>{`${roman} - ${urdu}`}</Text>
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
