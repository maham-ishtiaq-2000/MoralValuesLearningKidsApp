import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity,  Animated, StatusBar , BackHandler , Alert} from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { router,useLocalSearchParams,useRouter } from 'expo-router';
import Swiper from 'react-native-swiper';
import * as ScreenOrientation from 'expo-screen-orientation';
import LoadingScreen from './LoadingScreen';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



const PrevButton = ({style}) => (
    <Image 
        style={style}
        source={require('../../assets/modals/prevArrowFinal.webp')} 
        contentFit='contain'
    />
);

const NextButton = ({style}) => (
    <Image 
        style={style}
        source={require('../../assets/modals/nextArrowFinal.webp')}
        contentFit='contain'
    />
);


const SingleStory = ({storySlidesArrayData,rightOptionSlidesData,wrongOptionSlidesData}) => {
    const data = [
        { id: '1', title: 'Click the "Next" arrow to go to next page.' },
        { id: '2', title: 'Click the "Back" arrow to go back .' },
        { id: '3', title: 'When you see choices, pick one to keep the story going!' }
    ];
  const params = useLocalSearchParams();
  const storySlidesArray = JSON.parse(params.storyData);
  const rightOptionSlides = JSON.parse(params.rightOptionArrayData);
  const wrongOptionSlides = JSON.parse(params.wrongOptionArrayData);
  //const navigation = useNavigation(); 
  const fadeIn = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true);
  const [isBackModalVisible, setIsBackModalVisible] = useState(false);
    const [activeSwiper, setActiveSwiper] = useState('main');
    const [containerColor, setContainerColor] = useState("#37B6FF");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAlert,setShowAlert] = useState(false)
    const [showEndScreenAlert, setShowEndScreenAlert] = useState(false);
    const swiperRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        screenWidth: Dimensions.get('window').width,
        screenHeight: Dimensions.get('window').height,
    });

  // Function to reset the component
 
    const onLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setDimensions({ screenWidth: width, screenHeight: height });
    };


    
   

    useEffect(() => {
        const backAction = () => {
            setShowAlert(true); // Show the custom alert
            return true; // Prevent default behavior (exiting the app)
        };
        
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        StatusBar.setHidden(true);
        // Lock the screen orientation to landscape
            const lockOrientation = async () => {
                try {
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
                } catch (e) {
                    console.error("Failed to lock orientation:", e);
                }
            };
            // Simulate data fetching
            const fetchData = async () => {
                try {
                    // Replace this with your actual data fetching logic
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Simulated delay
                    setIsLoading(false); // Set loading to false once data is fetched
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setIsLoading(false); // Ensure loading is set to false in case of error
                }
            };

            fetchData();
            lockOrientation();
    
        // Update modal dimensions and unlock orientation when screen dimensions change
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions({ screenWidth: window.width, screenHeight: window.height });
        });
    
        // Cleanup function
        return () => {
            backHandler.remove();
            subscription?.remove();
            ScreenOrientation.unlockAsync();
        };
    }, []);


    

    const key = dimensions.screenWidth + dimensions.screenHeight;
    const dynamicSlideStyle = {
        width: dimensions.screenWidth * 0.9,
        height: dimensions.screenHeight,
        marginLeft: dimensions.screenWidth * 0.05,
        marginRight: dimensions.screenWidth * 0.05,
    };


    //Custom Alert 

    const CustomAlert = ({ isVisible, onConfirm, onCancel }) => {
        const fadeAnim = useRef(new Animated.Value(0)).current;
      
        useEffect(() => {
          if (isVisible) {
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          } else {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }
        }, [isVisible]);
      
        if (!isVisible) return null;
      
        return (
            <Animated.View style={[alertStyles.alertContainer, { opacity: fadeAnim }]}>
            <View style={alertStyles.alertBox}>
                <Text style={alertStyles.alertText}>Do you really want to go back?</Text>
                <View style={alertStyles.buttonContainer}>
                    <TouchableOpacity style={alertStyles.alertButton} onPress={onConfirm}>
                        <Text style={alertStyles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={alertStyles.alertButton} onPress={onCancel}>
                        <Text style={alertStyles.buttonText}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
        );
      };



      //Customer End Screen Alert
      const CustomEndAlert = ({ isVisible,onClose }) => {
        const slideAnim = useRef(new Animated.Value(-500)).current; // Start off-screen

        useEffect(() => {
            if (isVisible) {
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();
            }
        }, [isVisible]);
    
        const closeAlert = () => {
            Animated.timing(slideAnim, {
                toValue: -500,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => {
                if (onClose) {
                    onClose(); // Call the onClose prop function after animation ends
                }
            });
        };

    
        return (
            <Animated.View 
                style={[
                    endScreenAlertStyles.alertContainer, 
                    { transform: [{ translateY: slideAnim }] } 
                ]}
            >
                <View style={endScreenAlertStyles.alertBox}>
                    <Text style={endScreenAlertStyles.alertText}>
                        Hope you liked the story! What would you like to do next?
                    </Text>

                    <View style={endScreenAlertStyles.buttonEndContainer}>
                 
                        <TouchableOpacity 
                            style={endScreenAlertStyles.alertButton} 
                            onPress={() => {router.push("/HomeScreen")}}>
                            <Image 
                                source={require('../../assets/endScreen/homeEndScreen.webp')}
                                style={endScreenAlertStyles.buttonImage}
                                contentFit='cover'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={endScreenAlertStyles.alertButton} 
                            onPress={() => {
                                // This is where the change is made
                                setActiveSwiper('main'); // Set the active swiper to the main swiper
                                swiperRef.current?.scrollTo(0, false); // Scroll to the first slide of the main swiper
                                setShowEndScreenAlert(false);
                                closeAlert();
                            }}>
                            <Image 
                                source={require('../../assets/endScreen/reloadEndScreen.webp')} 
                                style={endScreenAlertStyles.buttonImage}
                                contentFit='cover'
                            />
                    </TouchableOpacity>
                    </View>
                </View>
                <Image
                    source={require('../../assets/settingsScreen/settingsRabbit.png')} // Replace with your image path
                    style={endScreenAlertStyles.bottomRightImage}
                    contentFit='contain'
                />
            </Animated.View>

        );
    };
    
    
      
    


   
    const handleIndexChanged = (index) => {
      let currentSlideId;
  
      // Check the active swiper and set the currentSlideId based on it
      if (activeSwiper === 'main') {
          setContainerColor(storySlidesArray[index]?.color || '#FFFFFF');
          currentSlideId = storySlidesArray[index]?.id;
      } else if (activeSwiper === 'right') {
          setContainerColor(rightOptionSlides[index]?.color || '#FFFFFF');
          currentSlideId = rightOptionSlides[index]?.id;
      } else if (activeSwiper === 'wrong') {
          setContainerColor(wrongOptionSlides[index]?.color || '#FFFFFF');
          currentSlideId = wrongOptionSlides[index]?.id;
      }
  
      if (currentSlideId === 'endScreen') {
        console.log('"endScreen" is called');
        setTimeout(() => setShowEndScreenAlert(true), 1000);
      }
      setCurrentIndex(index);
  };
  
    



    const handleOptionPress = (option) => {
      if (option === 'A') {
          console.log('Option "A" is pressed');
          setActiveSwiper('right');
          setContainerColor(rightOptionSlides[0].color);  // Set background color for the right options swiper
      } else if (option === 'B') {
          console.log('Option "B" is pressed');
          setActiveSwiper('wrong');
          setContainerColor(wrongOptionSlides[0].color);  // Set background color for the wrong options swiper
      }
  };
  





  
const FadeSlide = ({ children, style }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }
      ).start();
    }, [fadeAnim]);
  
    return (
      <Animated.View style={{ ...style, opacity: fadeAnim }}>
        {children}
      </Animated.View>
    );
  };
  
  

  const renderSwiper = (slides) => (
    <Swiper
    style={{ height: dimensions.screenHeight }}
    showsButtons={true}
    ref={swiperRef}
    loop={false}
    showsPagination={false}
    onIndexChanged={handleIndexChanged}
    prevButton={<PrevButton style={styles.prevButtonStyle}/>}
    nextButton={<NextButton style={styles.nextButtonStyle}/>}
    scrollEnabled={false}
    fade={true}
   >
        {slides.map((slide, index) => (
                        <FadeSlide 
                        key={slide.id} 
                        slide={slide}
                        style={[
                            styles.slide, 
                            dynamicSlideStyle,
                            { backgroundColor: slide.color } 
                        ]}
                    >
                {slide.id === 'options' ? (
                    <View>
                    <View style={[styles.optionsContainer, dynamicSlideStyle]}>
                         <TouchableOpacity onPress={() => handleOptionPress('A')} style={[styles.option, { backgroundColor: '#93C572' }]}>
                             <Text style={[styles.optionText, { backgroundColor: '#5B7F3E' }]}>Option A</Text>
                             <Text style={styles.optionDescription}>{slide.correctOptionDescription}</Text>
                             <Image
                                 source={slide.optionAImageSource}
                                 style={styles.optionImage}
                                 contentFit="contain"
                             />
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => handleOptionPress('B')} style={[styles.option, { backgroundColor: '#FB8DA0' }]}>
                             <Text style={[styles.optionText, { backgroundColor: '#FB4570' }]}>Option B</Text>
                             <Text style={styles.optionDescription}>{slide.wrongOptionDescription}</Text>
                             <Image
                                 source={slide.optionBImageSource}
                                 style={styles.optionImage}
                                 contentFit="contain"
                             />
                         </TouchableOpacity>
                     </View>

                     <View style={[styles.textContainer , {width : '100%'}]}>
                                 <Text style={styles.textStyle}>{slide.description}</Text>
                             </View>
                     </View>
                ) : (
                    <>
                        <Image source={slide.imageSource} style={styles.image} contentFit="cover" />
                        {slide.description ? (
                              <View style={styles.textContainer}>
                                  <Text style={[styles.textStyle , {color : 'black'}]}>{slide.description}</Text>
                              </View>
                          ) : null}
                    </>
                )}
            </FadeSlide>
        ))}
    </Swiper>
);

  // Modify the loading screen to use Animated.View
  const renderLoadingScreen = () => (
    <Animated.View
      style={{
        ...styles.centered,
        transform: [{ translateY: loadingScreenPosition }], // Apply the animated value
      }}>
      <Text>Loading...</Text>
    </Animated.View>
  );

  return (
    <View style={[styles.container , {backgroundColor : containerColor}]} onLayout={onLayout}>
        <StatusBar hidden={true}></StatusBar>
        {isLoading ? (
            <LoadingScreen screenHeight={screenHeight} backgroundColor="red" />
        ) : (
            <>
                <View style={{ backgroundColor: containerColor }}>
                    {activeSwiper === 'main' && renderSwiper(storySlidesArray)}
                    {activeSwiper === 'right' && renderSwiper(rightOptionSlides)}
                    {activeSwiper === 'wrong' && renderSwiper(wrongOptionSlides)}
                </View>
            </>
        )}
        <CustomAlert 
            isVisible={showAlert}
            onConfirm={() => {
                setShowAlert(false);
                router.push('/HomeScreen'); // Navigate to home screen
            }} 
            onCancel={() => setShowAlert(false)} 
        />
        <CustomEndAlert 
            isVisible={showEndScreenAlert}
            onClose={() => setShowEndScreenAlert(false)}
        />

    </View>
);


    
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  slide: {
      flex: 1,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft : screenWidth*0.05,
      marginRight : screenWidth*0.05
  },
  image: {
      width: '100%',
      height: '100%'
  },
  textContainer: {
      position: 'absolute', // Positioning text over the image
      bottom: 0, // Aligning at the bottom of the slide
      width: '100%', // Text container takes the full width of the slide
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
      padding: 5, // Padding around the text for better 
      alignSelf :'center'
  },
  textStyle: {
      color: 'black', // Black text color
      textAlign: 'center', // Center-aligned text
      fontFamily: 'RobotoSlab_800ExtraBold',
      fontSize : 18
  },
  optionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor : 'white'
  },
  option: {
      alignItems: 'center', // Center align the items
      width: '45%', // Adjust width as needed,
      height : '90%',
      borderWidth: 1, // Set the border width
      borderColor: 'green', // Set the border color
      borderRadius: 10,
  },
  optionImage: {
      width: '100%', // Adjust width as needed
      height: 250, // Adjust height as needed
      marginBottom : 20,
      resizeMode: 'contain'
  },
  optionText: {
      color: 'white', // Set text color
      textAlign: 'center', // Center-align text
      width : '100%',
      height : '10%',
      fontFamily : 'RobotoSlab_800ExtraBold',
      paddingBottom : '2%',
      paddingTop : '2%',
      borderTopLeftRadius : 10,
      borderTopRightRadius : 10
      // Space between text and image
      // Add more styling as needed
  },
  optionDescription:{
      color : 'black',
      textAlign : 'center',
      fontFamily : 'RobotoSlab_500Medium',
      marginTop : '1%',
      marginBottom : '1%',
      color : 'white'
  },
  prevButtonStyle: {
    width: 60, // adjust the width
    height: 60, // adjust the height
    },
    nextButtonStyle: {
        width: 60, // adjust the width
        height: 60, // adjust the height
        // other styling as needed
    },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    marginTop : 10,
    resizeMode: 'contain',
  },
  helloTextStyle: {
    fontSize: 24, // Adjust font size as needed
    color: 'black', // Adjust text color as needed
    marginBottom: 20, // Space below the text
    // Other styling as needed
    },
    closeButton: {
        position: 'absolute',
        top: 30,
        right: 30,
        backgroundColor: '#E5E4E2', // Optional: style as needed
        borderRadius: 5,
        borderWidth: 3, // Specify the border width
        borderColor: 'green', // Specify the border color
        padding: 2,
        width: 30,
        justifyContent : 'center',
        alignItems : 'center',
        zIndex: 1, // Make sure it's above other elements
    },
    closeButtonText: {
        fontSize: 16,
        color: '#F28C28', // Choose color as needed
        justifyContent : 'center',
        fontWeight : 'bold'
    },
    fullScreenModalContainer: {
        flex: 1,
        width: '100%', 
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullScreenModal: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
        // Add other styling as needed
    }
 
});


const alertStyles = StyleSheet.create({
    alertContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    alertButton: {
      backgroundColor: 'green',
      padding: 5,
      borderRadius: 3,
      marginHorizontal: 10,
      width : 100,
      alignItems : 'center'
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      marginTop : 5,
      marginBottom : 10,
      fontFamily : 'RobotoSlab_700Bold'
    },
    alertText: {
        fontSize: 18,
        marginBottom: 20, // Add space below the text
        color : 'green',
        fontFamily : 'RobotoSlab_700Bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10, // Optionally add space above the buttons
    },
    alertBox: {
        minWidth: 300, // Minimum width for the alert box
        width: '70%', // Maximum width relative to the screen width
        maxWidth: 500, // Maximum width limit if needed
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10, // Add rounded corners
        alignItems: 'center',
        borderWidth: 5, // Specify the border width
        borderColor: 'green', // Specify the border color
        borderStyle: 'solid', // Define the border style
    },
    buttonEndContainer: {
        flexDirection: 'row',
        justifyContent : 'flex-start',
        marginTop: 5,
        alignItems: 'flex-start'
    }
  });


  const endScreenAlertStyles = StyleSheet.create({
    alertContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    },
    alertButton: {
        backgroundColor: 'transparent', // Changed to 'transparent'
        padding: 5,
        borderRadius: 3,
        marginHorizontal: 10,
        width : 100,
        alignItems : 'center'
    },  
    buttonText: {
      color: 'white',
      fontSize: 16,
      marginTop : 5,
      marginBottom : 10,
      fontWeight : 'bold'
    },
    alertText: {
        fontSize: 18,
        marginTop : 10,
        color : 'white',
        fontFamily : 'RobotoSlab_700Bold'
    },
    alertBox: {
        width: '100%', // Maximum width relative to the screen width
        padding: 20,
        alignItems: 'center',
        justifyContent : 'center'
    },
    buttonEndContainer: {
        flexDirection: 'row',
        justifyContent : 'flex-start',
    
    },
    buttonImage: {
        width: '120%', // Set the width
        height: '90%', // Set the height
    },
    bottomRightImage: {
        position: 'absolute', // Position it absolutely
        right: 0, // Distance from the right edge of the screen
        bottom: 0, // Distance from the bottom edge of the screen
        width: '30%', // Set the width of the image
        height: '70%', // Set the height of the image
    },

   
  });
  


export default SingleStory;