import React from 'react';
import { View, Text, StyleSheet, Video } from 'react-native';

const EnglishAnimations = ({ route }) => {
  const { letter } = route.params;

  const video1 = `path_to_video_1_for_${letter}`;
  const video2 = `path_to_video_2_for_${letter}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animations for Letter {letter}</Text>
      
    
      <Video source={{uri: video1}} style={styles.video} />

     
      <Video source={{uri: video2}} style={styles.video} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  video: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
});

export default EnglishAnimations;
