import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const EducatorDashboard = () => {
  const [educatorName, setEducatorName] = useState('');
  const [educatorData, setEducatorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;

  useEffect(() => {
    const retrieveEducatorData = async () => {
      try {
        const response = await fetch(`http://192.168.1.117:5000/educators/${email}`);
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

  const handleChangePassword = () => {
    navigation.navigate('ChangePasswordScreen');
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
              const response = await fetch(`http://192.168.1.117:5000/delete-educator/${email}`, {
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
          <TouchableOpacity style={styles.drawerButton} onPress={handleChangePassword}>
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFA500',
    borderRadius: 5,
    marginBottom: 10,
  },
  drawerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  drawerToggle: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    zIndex: 3,
  },
  drawerToggleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
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
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default EducatorDashboard;
