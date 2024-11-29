import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddStudentScreen = ({ navigation, route }) => {
  const { educatorEmail, educatorUsername } = route.params; // Receive educatorEmail and educatorUsername

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Educator Email: {educatorEmail}</Text>
      <Text style={styles.text}>Educator Username: {educatorUsername}</Text>
      {/* Add functionality for adding students */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AddStudentScreen;
