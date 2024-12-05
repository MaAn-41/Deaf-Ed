import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler, Modal, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const EducatorDashboard = () => {
  const [educatorName, setEducatorName] = useState('');
  const [educatorData, setEducatorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { email } = route.params;

  useEffect(() => {
    const retrieveEducatorData = async () => {
      try {
        const response = await fetch(`http://10.54.8.39:5000/educators/${email}`);
        const data = await response.json();

        if (response.ok) {
          setEducatorName(data.name || 'Guest');
          setEducatorData(data);
        } else {
          Alert.alert('Error', 'Educator data not found');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    retrieveEducatorData();
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
      const response = await fetch('http://10.54.8.39:5000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password reset successful!');
        setModalVisible(false); 
        navigation.navigate('LoginScreen',{ userType: 'Educator' });
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
              const response = await fetch(`http://10.54.8.39:5000/delete-educator/${educatorName}`, {
                method: 'DELETE',
              });
              if (response.ok) {
                Alert.alert('Success', 'Profile deleted successfully.');
                navigation.navigate('WelcomeScreen');
              } else {
                Alert.alert('Error', 'Failed to delete profile.');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'An error occurred while deleting the profile.');
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
          <TouchableOpacity style={styles.drawerButton} onPress={handleLogout}>
            <Text style={styles.drawerButtonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.drawerButtonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerButton} onPress={handleDeleteProfile}>
            <Text style={styles.drawerButtonText}>Delete Profile</Text>
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
            Welcome to the Dashboard, {educatorName || 'Guest'}!
          </Text>
          <Text style={styles.emailText}>Email: {educatorData?.email || 'Not Available'}</Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('LessonScreen')}
            >
              <Text style={styles.buttonText}>Lessons</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('ManageStudentScreen', {
                  educatorEmail: email,
                  educatorUsername: educatorName,
                })
              }
            >
              <Text style={styles.buttonText}>Manage Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('StudentProgressScreen')}
            >
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
    borderBottomColor: '#fff',
  },
  drawerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  drawerToggle: {
    position: 'absolute',
    top: 40,
    left: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  drawerToggleText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginTop: 100,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 30,
  },
  buttonsContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
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
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default EducatorDashboard;
