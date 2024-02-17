import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, StatusBar } from 'react-native';
import { Video } from 'expo-av';

const LoadingScreen = () => {
  // Create an animated value for the overlay opacity
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the fade in animation after 5 seconds
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration:4000, // Duration of the fade effect
        useNativeDriver: true
      }).start();
    }, 6000);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} /> 
      <Video
        source={require('../../assets/loadingScreen/loadingScreenVideo.mp4')}
        rate={2.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'black' // Optional, in case you want a specific background color
  },
  video: {
    width: '100%', // Adjust as needed
    height: '100%', // Adjust as needed
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
});

export default LoadingScreen;
