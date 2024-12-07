import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StudentsScreen = ({ route }) => {
  const { educatorEmail, educatorUsername } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Educator Email: {educatorEmail}</Text>
      <Text style={styles.text}>Educator Username: {educatorUsername}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default StudentsScreen;
