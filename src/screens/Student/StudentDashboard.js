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
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

import BASE_URL from "../../../config";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [editFullname, setEditFullname] = useState("");
  const [editDob, setEditDob] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setEditDob(formattedDate);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    const retrieveStudentData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/students/${email}`);
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
      const response = await fetch(`${BASE_URL}/reset-password`, {
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
                `${BASE_URL}/delete-student/${studentName}`,
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
    <ImageBackground
      source={require("../../../assets/a.webp")} // Update the path to your image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.6)"]}
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
              onPress={() => {
                setEditFullname(studentData?.fullname || "");
                setEditDob(studentData?.dob || "");
                setProfileModalVisible(true);
              }}
            >
              <Text style={styles.drawerButtonText}>My Profile</Text>
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
            <TouchableOpacity
              style={styles.drawerButton}
              onPress={handleLogout}
            >
              <Text style={styles.drawerButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.drawerToggle,
              drawerOpen && { backgroundColor: "transparent" },
            ]}
            onPress={() => setDrawerOpen((prevState) => !prevState)}
          >
            <Text
              style={[
                styles.drawerToggleText,
                drawerOpen && { display: "none" },
              ]}
            >
              {drawerOpen ? null : "Menu"}
            </Text>
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeText}>
                Welcome {studentName || "Guest"}!
              </Text>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.lessonButton]}
                onPress={() =>
                  navigation.navigate("LessonScreen", { Username: studentName })
                }
              >
                <Icon name="book" size={20} color="#fff" />
                <Text style={styles.buttonText}>Lesson</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.testButton]}
                onPress={() =>
                  navigation.navigate("TestScreen", { Username: studentName })
                }
              >
                <Icon name="pencil" size={20} color="#fff" />
                <Text style={styles.buttonText}>Test</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.reportButton]}
                onPress={() =>
                  navigation.navigate("ProgressReportScreen", {
                    Username: studentName,
                  })
                }
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={profileModalVisible}
          onRequestClose={() => setProfileModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>My Profile</Text>

              <Text style={styles.label}>Full Name:</Text>
              <TextInput
                style={styles.input}
                value={editFullname}
                onChangeText={setEditFullname}
                placeholder="Enter your full name"
              />

              <Text style={styles.label}>Date of Birth:</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.input}
              >
                <Text style={{ color: editDob ? "#000" : "#aaa" }}>
                  {editDob ? formatDate(editDob) : "Select your date of birth"}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={editDob ? new Date(editDob) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <Text style={styles.label}>Username:</Text>
              <Text style={styles.staticText}>{studentData?.name}</Text>

              <Text style={styles.label}>Email:</Text>
              <Text style={styles.staticText}>{studentData?.email}</Text>

              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={async () => {
                  try {
                    const response = await fetch(`${BASE_URL}/students`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        email: studentData.email,
                        fullname: editFullname,
                        dob: editDob,
                      }),
                    });
                    const data = await response.json();
                    if (response.ok) {
                      Alert.alert("Success", "Profile updated successfully!");
                      setStudentData((prevData) => ({
                        ...prevData,
                        fullname: editFullname,
                        dob: editDob,
                      }));
                      setProfileModalVisible(false);
                    } else {
                      Alert.alert("Error", data.message || "Update failed.");
                    }
                  } catch (error) {
                    Alert.alert("Error", "Failed to update profile.");
                  }
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={() => setProfileModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // Make the container transparent to see the background
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    zIndex: 10,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: "100%",
    backgroundColor: "#9E9E9E",
    paddingTop: 50,
    zIndex: 20,
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
  welcomeCard: {
    backgroundColor: "#E3F2FD", // Soft light blue
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#90CAF9", // Slight border for a defined look
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1565C0", // Dark blue for contrast
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
    backgroundColor: "#2196F3",
  },
  testButton: {
    backgroundColor: "#2196F3",
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
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  staticText: {
    alignSelf: "flex-start",
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
});

export default StudentDashboard;
