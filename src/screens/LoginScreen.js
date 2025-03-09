import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  ImageBackground,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import BASE_URL from "../../config";

const LoginScreen = ({ navigation, route }) => {
  const { userType } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("WelcomeScreen");
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [navigation])
  );

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();
      if (response.ok) {
        const lowerCaseEmail = email.toLowerCase();
        Alert.alert("Success", `Welcome, ${userType}!`);
        navigation.navigate(`${userType}Dashboard`, {
          email: lowerCaseEmail,
        });
      } else {
        Alert.alert("Error", data.message || "Login failed!");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to connect to the server. Please try again later."
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{userType} Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.navigate("SignupScreen", { userType })}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ForgotPasswordScreen", { userType })
          }
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 18,
    elevation: 3,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#2196F3",
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonOutlineText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2196F3",
  },
  forgotPassword: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FF7043",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
