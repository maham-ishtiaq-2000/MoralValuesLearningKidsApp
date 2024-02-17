import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import { Image } from 'expo-image';
import { StoriesData } from '../Data/StoriesData';
import { router, useRouter } from 'expo-router';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const images = StoriesData;

// Modify the styles to arrange two items per row
const styles = StyleSheet.create({
  scrollViewContainer: {
    position: 'relative',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  imageContainer: {
    width: screenWidth * 0.4, // Adjusted width to fit two items in a row with spacing
    marginBottom: 20, // Added margin for spacing between rows
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: screenWidth * 0.4, // or some other height as needed
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 4,
    borderColor: 'white',
    // ... other styles
  },
  titleCategory: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    padding: 10,
    backgroundColor: '#3D92D4',
    fontFamily: 'RobotoSlab_500Medium',
    fontSize : 11,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    // ... other styles
  },
  storyCategory:{
    backgroundColor : '#FF6F61',
    padding : 5,
    color : 'white',
    fontFamily : 'RobotoSlab_500Medium'
  }
});

const Stories = () => {
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const router = useRouter();
  const [isFromWelcomeScreen, setIsFromWelcomeScreen] = useState(false);


  useEffect(() => {
    setIsFromWelcomeScreen(router.previousRoute?.name === 'WelcomeScreen');
    if (isFromWelcomeScreen) {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ]).start();
      }, 50);
    } else {
      fadeAnim.setValue(1);
      translateY.setValue(0);
    }
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, { // Change from translateX to translateY
          toValue: 0, // Animate to the top of the screen
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 50);
  }, [isFromWelcomeScreen]);

  const handleScroll = (direction) => {
    let newIndex = currentIndex;
    if (direction === 'left' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'right' && currentIndex < images.length - 1) {
      newIndex = currentIndex + 1;
    }
    scrollViewRef.current.scrollTo({
      x: screenWidth * newIndex,
      animated: true,
    });
    setCurrentIndex(newIndex);
  };

  const handleOnMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  const navigateToHonestyStory = (item) => {
    const storyName = item.storyName;
    const data = item.storySlidesArrayData // your array of objects
    const serializedData = JSON.stringify(data);
    const rightOptionArrayData = JSON.stringify(item.rightOptionArrayData)
    const wrongOptionArrayData = JSON.stringify(item.wrongOptionArrayData)
    router.push({ pathname: 'Components/SingleStory', params: { storyData : serializedData , rightOptionArrayData : rightOptionArrayData , wrongOptionArrayData : wrongOptionArrayData } })
  };

  // Render two items per row inside ScrollView
  const renderImageRows = () => {
    const rows = [];
    for (let i = 0; i < images.length; i += 2) {
      const rowItems = (
        <View key={i} style={styles.rowContainer}>
          {renderImage(images[i])}
          {i + 1 < images.length && renderImage(images[i + 1])}
        </View>
      );
      rows.push(rowItems);
    }
    return rows;
  };

  const renderImage = (item) => {
    let backgroundColour;
    if(item.name == "Kindness"){
        backgroundColour = "#DC4731"
    }
    else if(item.name == "Honesty"){
      backgroundColour = "#7A871E"
    }
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.imageContainer}
        onPress={() => {
          navigateToHonestyStory(item);
        }}
      >
        <Text style={[styles.storyCategory, { backgroundColor : backgroundColour }]}>
          {item.name}
        </Text>
        <Image source={item.imageSource} style={styles.image} contentFit='contain' />
        <Text style={styles.titleCategory}>{item.storyTitle}</Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <Animated.View style={[styles.scrollViewContainer, { opacity: fadeAnim, transform: [{ translateY }] }]}>
      <ScrollView
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleOnMomentumScrollEnd}
        style={styles.scrollView}
      >
        {renderImageRows()}
      </ScrollView>
    </Animated.View>
  );
};

export default Stories;
