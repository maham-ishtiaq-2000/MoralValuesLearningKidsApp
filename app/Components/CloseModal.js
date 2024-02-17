// modalAnimations.js
import { Animated } from 'react-native';

export const openModal = (modalSetter, fadeIn) => {
  modalSetter(true);
  Animated.timing(fadeIn, {
    toValue: 1,
    duration: 2000, // Adjust duration for slower or faster animation
    useNativeDriver: true,
  }).start();
};

export const closeModal = (modalSetter, fadeIn) => {
  Animated.timing(fadeIn, {
    toValue: 0,
    duration: 2000,
    useNativeDriver: true,
  }).start(() => {
    modalSetter(false);
  });
};
