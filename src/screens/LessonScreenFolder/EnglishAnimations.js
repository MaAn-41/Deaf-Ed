import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const EnglishAnimations = ({ route }) => {
  const { letter } = route.params;

  const videoPaths = {
    A: [
      require('../assets/alphabets/A_letter_video.mp4'),
      require('../assets/alphabets/Apple_video.mp4'),
    ],
    B: [
      require('../assets/alphabets/B_letter_video.mp4'),
      require('../assets/alphabets/Banana_video.mp4'),
    ],
    C: [
      require('../assets/alphabets/C_letter_video.mp4'),
      require('../assets/alphabets/Cat_video.mp4'),
    ],
    D: [
      require('../assets/alphabets/D_letter_video.mp4'),
      require('../assets/alphabets/Dog_video.mp4'),
    ],
  };

  const videos = videoPaths[letter.toUpperCase()] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animations for Letter {letter}</Text>
      {videos.length > 0 ? (
        videos.map((videoSource, index) => (
          <Video
            key={index}
            source={videoSource}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        ))
      ) : (
        <Text>No videos available for this letter.</Text>
      )}
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
