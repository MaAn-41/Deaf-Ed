import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { Easing, withRepeat, withSpring, useSharedValue, useAnimatedStyle, withDelay } from 'react-native-reanimated';

const EnglishAnimations = () => {
  const bounce = useSharedValue(0);

  useEffect(() => {
    bounce.value = withRepeat(
      withSpring(1, { damping: 3, stiffness: 150 }),
      5, 
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: bounce.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>English Animations</Text>
      <View style={styles.animationContainer}>
        <Animated.Text style={[styles.letter, animatedStyle]}>
          A
        </Animated.Text>
        <Animated.Text style={[styles.letter, animatedStyle]}>
          B
        </Animated.Text>
        <Animated.Text style={[styles.letter, animatedStyle]}>
          C
        </Animated.Text>
        <Animated.Text style={[styles.letter, animatedStyle]}>
          D
        </Animated.Text>
        <Animated.Text style={[styles.letter, animatedStyle]}>
          E
        </Animated.Text>
        {/* Add more letters as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  animationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e3c72',
    margin: 10,
  },
});

export default EnglishAnimations;
