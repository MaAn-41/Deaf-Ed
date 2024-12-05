import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const EnglishAnimations = ({ route }) => {
  const { letter } = route.params;

  const videoPaths = {
    A: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    B: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    C: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    D: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    EncodedVideoChunk: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    F: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    G: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    H: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
   
    I: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    J: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    K: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    L: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    M: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    N: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    O: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    Q: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    R: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    S: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    T: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    U: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    V: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    W: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    X: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    Y: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
    ],
    Z: [
      require('../../../assets/alphabets/A.mp4'),
      require('../../../assets/alphabets/Apple.mp4'),
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
