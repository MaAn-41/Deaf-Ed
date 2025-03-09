import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Button,
  Platform,
} from "react-native";
import { ImageBackground } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../../config";
import DateTimePicker from "@react-native-community/datetimepicker";

const SignupScreen = ({ navigation, route }) => {
  const { userType } = route.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [dob, setDob] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleGenerateOtp = async () => {
    try {
      const response = await fetch(`${BASE_URL}/generate-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "OTP sent to your email");
        setIsOtpModalVisible(true);
      } else {
        Alert.alert("Error", data.message || "OTP generation failed");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to generate OTP. Please try again later.");
    }
  };

  const handleOtpVerification = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpVerified(true);
        setIsOtpModalVisible(false);
        Alert.alert("Success", "OTP Verified Successfully");
      } else {
        Alert.alert("Error", data.message || "OTP verification failed");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to verify OTP. Please try again later.");
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setDob(formattedDate);
    }
  };

  const handleSignup = async () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !username ||
      !fullname ||
      (userType === "Student" && !dob)
    ) {
      Alert.alert("Error", "Please fill in all required fields!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (!otpVerified) {
      Alert.alert("Error", "Please verify your email OTP first");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          username,
          fullname,
          userType,
          dob: userType === "Student" ? dob : undefined,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("LoginScreen", { userType });
      } else if (data.message.includes("username")) {
        Alert.alert(
          "Error",
          "This username is already taken. Please choose another."
        );
      } else {
        Alert.alert("Error", data.message || "Signup failed!");
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
        <Text style={styles.title}>Signup</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          value={fullname}
          onChangeText={setFullname}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {userType === "Student" && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.buttonText}>Select Date of Birth</Text>
            </TouchableOpacity>
            <Text style={styles.selectedDate}>
              {dob ? `Selected: ${dob}` : "No date selected"}
            </Text>
            {showDatePicker && (
              <DateTimePicker
                value={dob ? new Date(dob) : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </>
        )}
        <TouchableOpacity onPress={handleGenerateOtp} style={styles.button}>
          <Text style={styles.buttonText}>Generate OTP</Text>
        </TouchableOpacity>
        <Modal
          visible={isOtpModalVisible}
          onRequestClose={() => setIsOtpModalVisible(false)}
          transparent
          animationType="fade"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity
                onPress={handleOtpVerification}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen", { userType })}
        >
          <Text style={styles.forgotPassword}>
            Already have an account? Log In
          </Text>
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
  forgotPassword: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FF7043",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default SignupScreen;
