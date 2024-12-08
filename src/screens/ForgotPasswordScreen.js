import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BASE_URL from "../../config";

const ForgotPasswordScreen = ({ navigation, route }) => {
  const { userType } = route.params;
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleRequestOtp = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "OTP sent to your email!");
      } else {
        Alert.alert("Error", data.message || "Unable to send OTP!");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to connect to the server. Please try again later."
      );
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "OTP verified!");
        setOtpVerified(true);
      } else {
        Alert.alert("Error", data.message || "Invalid OTP!");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to verify OTP. Please try again later.");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please enter both passwords!");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword, confirmPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Password reset successful!");
        navigation.navigate("LoginScreen", { userType });
      } else {
        Alert.alert("Error", data.message || "Failed to reset password!");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to reset password. Please try again later.");
    }
  };

  return (
    <LinearGradient colors={["#FFD59A", "#FFF4D3"]} style={styles.container}>
      {!otpVerified ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleRequestOtp}>
            <Text style={styles.buttonText}>Request OTP</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#aaa"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={{ width: "90%", position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              placeholderTextColor="#aaa"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!isPasswordVisible} // Toggle visibility
              textContentType="newPassword"
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Text>{isPasswordVisible ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "90%", position: "relative", marginTop: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Confirm new password"
              placeholderTextColor="#aaa"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!isConfirmPasswordVisible} // Toggle visibility
            />
            <TouchableOpacity
              onPress={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
              style={styles.eyeIcon}
            >
              <Text>{isConfirmPasswordVisible ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 40,
    top: 10,
    padding: 10,
  },

  input: {
    width: "90%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    elevation: 3,
  },
  button: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});

export default ForgotPasswordScreen;
