import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import BASE_URL from "../../../config";

const EducatorDashboard = () => {
  const [educatorName, setEducatorName] = useState("");
  const [educatorData, setEducatorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [updatedFullname, setUpdatedFullname] = useState("");

  const { email } = route.params;

  useEffect(() => {
    const retrieveEducatorData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/educators/${email}`);
        const data = await response.json();

        if (response.ok) {
          setEducatorName(data.name || "Guest");
          setEducatorData(data);
        } else {
          Alert.alert("Error", "Educator data not found");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    retrieveEducatorData();
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
        navigation.navigate("LoginScreen", { userType: "Educator" });
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
                `${BASE_URL}/delete-educator/${educatorName}`,
                {
                  method: "DELETE",
                }
              );
              if (response.ok) {
                Alert.alert("Success", "Profile deleted successfully.");
                navigation.navigate("WelcomeScreen");
              } else {
                Alert.alert("Error", "Failed to delete profile.");
              }
            } catch (error) {
              console.error(error);
              Alert.alert(
                "Error",
                "An error occurred while deleting the profile."
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

  const handleUpdateFullname = async () => {
    if (!updatedFullname.trim()) {
      Alert.alert("Error", "Full name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/educators`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: educatorData.email,
          fullname: updatedFullname,
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Full name updated successfully!");
        setEducatorData((prevData) => ({
          ...prevData,
          fullname: updatedFullname,
        }));
        setProfileModalVisible(false);
      } else {
        Alert.alert("Error", "Failed to update full name.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while updating full name.");
    }
  };

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
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerButton}
            onPress={() => setProfileModalVisible(true)}
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
            Welcome {educatorName || "Guest"}!
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button1, styles.lessonButton]}
              onPress={() =>
                navigation.navigate("LessonScreen", { Username: educatorName })
              }
            >
              <Ionicons
                name="book"
                size={24}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Lessons</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button1, styles.ManageStudentButton]}
              onPress={() =>
                navigation.navigate("Manage", {
                  educatorEmail: email,
                  educatorUsername: educatorName,
                })
              }
            >
              <Ionicons
                name="person"
                size={24}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Manage</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button1, styles.reportButton]}
              // onPress={() => navigation.navigate("StudentProgressScreen")}
            >
              <Ionicons
                name="bar-chart"
                size={24}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>View Student Progress</Text>
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
              style={styles.button}
              onPress={handleChangePassword}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
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

            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={[styles.input, { backgroundColor: "#f0f0f0" }]}
              editable={false}
              value={educatorData?.name || ""}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={[styles.input, { backgroundColor: "#f0f0f0" }]}
              editable={false}
              value={educatorData?.email || ""}
            />

            <Text style={styles.label}>Full Name:</Text>
            <TextInput
              style={styles.input}
              value={updatedFullname}
              onChangeText={(text) => {
                setUpdatedFullname(text);
              }}
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleUpdateFullname();
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setProfileModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  lessonButton: {
    backgroundColor: "#4CAF50",
  },
  ManageStudentButton: {
    backgroundColor: "#FF9800",
  },
  reportButton: {
    backgroundColor: "#2196F3",
  },
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: -200,
    width: 200,
    height: "100%",
    backgroundColor: "#333",
    padding: 20,
    justifyContent: "flex-start",
    zIndex: 2,
  },
  drawerOpen: {
    left: 0,
  },
  drawerButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  drawerButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  drawerToggle: {
    position: "absolute",
    top: 40,
    left: 10,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  drawerToggleText: {
    fontSize: 18,
    color: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginTop: 100,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 150,
    color: "#4CAF50",
  },
  emailText: {
    fontSize: 16,
    marginBottom: 30,
  },
  buttonsContainer: {
    width: "80%",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    marginBottom: 8,
    borderRadius: 5,
  },
  button1: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    marginBottom: 25,
    borderRadius: 5,
    alignItems: "center",
    bottom: 130,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  icon: {
    marginLeft: 10,
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  closeButton: {
    left: 140,
  },
});

export default EducatorDashboard;
