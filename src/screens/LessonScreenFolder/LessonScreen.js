import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const LessonScreen = ({ navigation, route }) => {
  const { Username } = route.params;

  return (
    <ImageBackground
      source={require("../../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Select a Lesson</Text>

        <View style={styles.buttonsContainer}>
          {/* English Button */}
          <TouchableOpacity
            style={[styles.button, styles.englishButton]}
            onPress={() =>
              navigation.navigate("EnglishLessonScreen", { Username })
            }
          >
            <Icon name="language" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>English</Text>
          </TouchableOpacity>

          {/* Counting Button */}
          <TouchableOpacity
            style={[styles.button, styles.countingButton]}
            onPress={() =>
              navigation.navigate("CountingLessonScreen", { Username })
            }
          >
            <Icon name="calculate" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Counting</Text>
          </TouchableOpacity>

          {/* Urdu Button */}
          <TouchableOpacity
            style={[styles.button, styles.urduButton]}
            onPress={() =>
              navigation.navigate("UrduLessonScreen", { Username })
            }
          >
            <Icon name="article" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Urdu</Text>
          </TouchableOpacity>

          {/* Foundational Words Button */}
          <TouchableOpacity
            style={[styles.button, styles.wordsButton]}
            onPress={() => navigation.navigate("Wordscreen", { Username })}
          >
            <Icon
              name="spellcheck"
              size={24}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Foundational Words</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Light overlay for readability
    padding: 20,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 50,
    marginBottom: 20,
    borderRadius: 15,
    width: "80%",
    elevation: 6,
  },
  englishButton: {
    backgroundColor: "#2196F3",
  },
  countingButton: {
    backgroundColor: "#2196F3",
  },
  urduButton: {
    backgroundColor: "#2196F3",
  },
  wordsButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  icon: {
    marginRight: 10,
  },
});

export default LessonScreen;
