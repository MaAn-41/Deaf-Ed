import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  Modal,
  ImageBackground,
} from "react-native";
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
    <ImageBackground
      source={require("../../assets/a.webp")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {!otpVerified ? (
          <>
            <Text style={styles.title}>
              Reset <Text style={styles.titleHighlight}>Password</Text>
            </Text>
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
            <Text style={styles.title}>
              Set <Text style={styles.titleHighlight}>New Password</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              placeholderTextColor="#aaa"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm new password"
              placeholderTextColor="#aaa"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!isConfirmPasswordVisible}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleResetPassword}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </>
        )}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 20,
  },
  titleHighlight: {
    color: "#000000",
  },
  input: {
    width: "90%",
    height: 55,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    fontSize: 18,
    elevation: 3,
    marginTop: 20,
  },
  button: {
    width: "90%",
    height: 55,
    backgroundColor: "#2196F3",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default ForgotPasswordScreen;
