import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  TextInput,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importing icons

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const retrieveStudentData = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.117:5000/students/${email}`
        );
        const data = await response.json();
        if (response.ok) {
          setStudentName(data.name || "Guest");
          setStudentData(data);
        } else {
          Alert.alert("Error", "Student data not found");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    retrieveStudentData();
  }, [email]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => navigation.navigate("WelcomeScreen"),
      },
    ]);
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please enter both passwords!");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.117:5000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword, confirmPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Password reset successful!");
        setModalVisible(false);
        navigation.navigate("LoginScreen", { userType: "Student" });
      } else {
        Alert.alert("Error", data.message || "Failed to reset password!");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to reset password. Please try again later.");
    }
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await fetch(
                `http://192.168.1.117:5000/delete-student/${studentName}`,
                {
                  method: "DELETE",
                }
              );
              if (response.ok) {
                Alert.alert("Success", "Your profile has been deleted.");
                navigation.navigate("WelcomeScreen");
              } else {
                Alert.alert(
                  "Error",
                  "Failed to delete your profile. Please try again."
                );
              }
            } catch (error) {
              console.error(error);
              Alert.alert(
                "Error",
                "An error occurred while deleting your profile."
              );
            }
          },
        },
      ]
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Logout",
            onPress: () => navigation.navigate("WelcomeScreen"),
          },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFD59A", "#FFF4D3"]}
        style={styles.gradientBackground}
      >
        {drawerOpen && <View style={styles.overlay} />}
        <View style={[styles.drawer, drawerOpen && styles.drawerOpen]}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setDrawerOpen(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.drawerButtonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerButton}
            onPress={handleDeleteProfile}
          >
            <Text style={styles.drawerButtonText}>Delete Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerButton} onPress={handleLogout}>
            <Text style={styles.drawerButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.drawerToggle}
          onPress={() => setDrawerOpen((prevState) => !prevState)}
        >
          <Text style={styles.drawerToggleText}>
            {drawerOpen ? "Close" : "Menu"}
          </Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Welcome {studentName || "Guest"}!
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.lessonButton]}
              onPress={() => navigation.navigate("LessonScreen")}
            >
              <Icon name="book" size={20} color="#fff" />
              <Text style={styles.buttonText}>Lesson</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.testButton]}
              onPress={() => navigation.navigate("TestScreen")}
            >
              <Icon name="pencil" size={20} color="#fff" />
              <Text style={styles.buttonText}>Test</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.reportButton]}
              onPress={() => navigation.navigate("ProgressReportScreen")}
            >
              <Icon name="bar-chart" size={20} color="#fff" />
              <Text style={styles.buttonText}>Progress Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={[styles.button, styles.modalButton]}
              onPress={handleChangePassword}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.modalButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 10, // To ensure overlay appears above the content
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250, // Width of the drawer (increased to ensure no overlap)
    height: "100%",
    backgroundColor: "#9E9E9E", // Changed to grey
    paddingTop: 50,
    zIndex: 20, // Ensure the drawer is above other content
    transform: [{ translateX: -250 }],
    transition: "transform 0.3s ease-in-out",
  },
  drawerOpen: {
    transform: [{ translateX: 0 }],
  },
  drawerToggle: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    zIndex: 30,
  },
  drawerToggleText: {
    color: "#fff",
    fontSize: 18,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "#fff",
    fontSize: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  drawerButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  drawerButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0,
    zIndex: 1,
    transform: [{ translateX: 0 }],
    transition: "transform 0.3s ease-in-out",
  },
  contentShifted: {
    transform: [{ translateX: 250 }],
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4CAF50",
  },

  buttonsContainer: {
    width: "80%",
    alignItems: "stretch",
  },
  button: {
    marginBottom: 15,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  lessonButton: {
    backgroundColor: "#4CAF50",
  },
  testButton: {
    backgroundColor: "#FF9800",
  },
  reportButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
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
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: "#2196F3",
  },
});

export default StudentDashboard;
