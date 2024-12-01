import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler, TextInput, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const retrieveStudentData = async () => {
      try {
        const response = await fetch(`http://192.168.1.117:5000/students/${email}`);
        const data = await response.json();

        if (response.ok) {
          setStudentName(data.name || 'Guest');
          setStudentData(data);
        } else {
          Alert.alert('Error', 'Student data not found');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    retrieveStudentData();
  }, [email]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => navigation.navigate('WelcomeScreen'),
      },
    ]);
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please enter both passwords!');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.117:5000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password reset successful!');
        setModalVisible(false); // Close the modal
        navigation.navigate('LoginScreen',{ userType: 'Student' });
      } else {
        Alert.alert('Error', data.message || 'Failed to reset password!');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to reset password. Please try again later.');
    }
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.1.117:5000/delete-student/${studentName}`, {
                method: 'DELETE',
              });

              if (response.ok) {
                Alert.alert('Success', 'Your profile has been deleted.');
                navigation.navigate('WelcomeScreen');
              } else {
                Alert.alert('Error', 'Failed to delete your profile. Please try again.');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'An error occurred while deleting your profile.');
            }
          },
        },
      ]
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            onPress: () => navigation.navigate('WelcomeScreen'),
          },
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.gradientBackground}>
        {/* Left Drawer */}
        {drawerOpen && <View style={styles.overlay} />}
        <View style={[styles.drawer, drawerOpen && styles.drawerOpen]}>
          <TouchableOpacity style={styles.drawerButton} onPress={() => setDrawerOpen(false)}>
            <Text style={styles.drawerButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.drawerButtonText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerButton} onPress={handleDeleteProfile}>
            <Text style={styles.drawerButtonText}>Delete Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerButton} onPress={handleLogout}>
            <Text style={styles.drawerButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Toggle Drawer Button */}
        <TouchableOpacity
          style={styles.drawerToggle}
          onPress={() => setDrawerOpen((prevState) => !prevState)}
        >
          <Text style={styles.drawerToggleText}>{drawerOpen ? 'Close' : 'Menu'}</Text>
        </TouchableOpacity>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Welcome to the Dashboard, {studentName || 'Guest'}!
          </Text>
          <Text style={styles.emailText}>
            Email: {studentData?.email || 'Not Available'}
          </Text>
          <Text style={styles.ageText}>
            Age: {studentData?.age ? String(studentData.age) : 'Not Available'}
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('LessonScreen')}
            >
              <Text style={styles.buttonText}>Lesson</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('TestScreen')}
            >
              <Text style={styles.buttonText}>Test</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ProgressReportScreen')}
            >
              <Text style={styles.buttonText}>Progress Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Change Password Modal */}
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
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradientBackground: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: -200,
    width: 200,
    height: '100%',
    backgroundColor: '#333',
    padding: 20,
    justifyContent: 'flex-start',
    zIndex: 2,
  },
  drawerOpen: {
    left: 0,
  },
  drawerButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  drawerToggle: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 3,
  },
  drawerToggleText: {
    color: '#fff',
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  ageText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default StudentDashboard;
