import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const IntroScreen = () => {
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(1)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current; // Add background color animation

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor("#054480", true);

    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    Animated.timing(imageScale, {
      toValue: 1.5,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    const checkStorageAndNavigate = () => {
      AsyncStorage.getItem('ChildName').then(childName => {
        Animated.timing(imageOpacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          if (childName) {
            router.replace("/HomeScreen");
          } else {
            router.replace("/WelcomeScreen");
          }
        });
      });
    };

    // Animate background color to blue after fade-out animation
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      useNativeDriver: false, // Don't use native driver for backgroundColor
    }).start();

    const timer = setTimeout(checkStorageAndNavigate, 2000);

    return () => clearTimeout(timer);
  }, [imageOpacity, imageScale, backgroundColor]);

  const containerStyle = {
    backgroundColor: backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['#054480', '#054480'], // Change the colors as needed
    }),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <>
      <StatusBar style="light" backgroundColor={"#054480"} />
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.Image
          source={require('../assets/splashScreen/kidsReadingBooks.png')}
          style={[
            styles.centerImage,
            {
              opacity: imageOpacity,
              transform: [{ scaleX: imageScale }, { scaleY: imageScale }],
            },
          ]}
          resizeMode="contain"
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerImage: {
    width: '60%',
    height: '60%',
  },
});

export default IntroScreen;
