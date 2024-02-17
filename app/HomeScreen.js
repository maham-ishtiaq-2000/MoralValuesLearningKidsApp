import React,{useEffect,useRef,useState} from 'react';
import { StyleSheet, ScrollView, ImageBackground, Dimensions,View,Text , Animated , TouchableOpacity, StatusBar , FlatList , TextInput, Keyboard} from 'react-native';
import { Image } from 'expo-image';
import { router,useRouter,useLocalSearchParams } from 'expo-router';
import backgroundImage from '../assets/modals/startModalBackgroundcopy.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Stories from './Components/Stories';

const window = Dimensions.get('window');


const HomeScreen = () => {
    const [childName, setChildName] = useState('');
    const [modalMessage, setModalMessage] = useState(false);
    const translateY = useRef(new Animated.Value(-350)).current; // Start above the screen
    const [isModalVisible, setModalVisible] = useState(false);
    const [tempName, setTempName] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
    
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );
    
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    
    const data = [
        { id: '4', title: '➜ Press the "Settings Icon" in the home page to change name.' },
        { id: '1', title: '➜ Click the "Next" arrow in the story to go to next page.' },
        { id: '2', title: '➜ Click the "Back" arrow in the story to go to back page.' },
        { id: '3', title: '➜ When you see choices, pick one of them to keep the story going!' },
        
    ];
    const router = useRouter();
    const params = useLocalSearchParams();
    const previousRoute = params.screen;
    useEffect(() => {
        const loadChildName = async () => {
            try {
                const storedName = await AsyncStorage.getItem('ChildName');
                if (storedName !== null) {
                    setChildName(storedName);
                }
            } catch (error) {
                console.error('Error retrieving child name:', error);
            }
        };

        loadChildName();

        if (previousRoute !== 'InstructionsScreen') {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }).start();
        } else {
            translateY.setValue(0); // Directly set to final value without animation
        }

        // Clean Up function
        return () =>{
            if (previousRoute !== 'InstructionsScreen') {
                    Animated.timing(translateY, {
                        toValue: -350,
                        duration: 500,
                        useNativeDriver: true,
                    }).start();
                }
            };
        }, [previousRoute]);

    
    const navigateToNewComponent = () => {
        setAnimateOut(true); // Start exit animation

        // Wait for animation to complete before navigating
        setTimeout(() => {
            router.push("/SetttingsScreen")
        }, 100); 
    };

    const showSettingsModal = () => {
        setModalMessage(`Hi I am ${childName}`); // Set the message for the modal
        setModalVisible(true); // Show the modal
    };

    
    const handleNameChange = async () => {
        console.log(`I am the temp Name ${tempName}`)
        if (!tempName.trim()) {
            return; // Exit the function if the condition is true
        }
    
        Keyboard.dismiss(); // Dismiss the keyboard
        setChildName(tempName); // Update the childName state
        try {
            await AsyncStorage.setItem('ChildName', tempName); // Save the name in AsyncStorage
        } catch (error) {
            console.error('Error saving child name:', error);
        }
        setModalMessage(false); // Close the modal
    };
    


  return (
      <>
      <StatusBar style="light" backgroundColor='#79b3ca' hidden={false}/>

      <Modal 
                isVisible={isModalVisible}
                swipeDirection={['down']}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={2000}
                animationOutTiming={2000}
            >
                <View style={modalStyles.modalView}>
                    {/* Removed the StatusBar component from here */}
                    <Text style={modalStyles.instructionHeading}>Instructions</Text>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <Text style={modalStyles.item}>{item.title}</Text>}
                        keyExtractor={item => item.id}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={modalStyles.button}>
                        <ImageBackground source={backgroundImage} style={modalStyles.image}>
                            <Text style={modalStyles.buttonText}>OK</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
        </Modal>

        <Modal isVisible={modalMessage} swipeDirection={['down']} animationIn="slideInUp" animationOut="slideOutDown" animationInTiming={2000} animationOutTiming={2000}>
           
            <View style={settingsModalStyles.modalView}>

                {/* Header with Cancel Button */}
                <View style={settingsModalStyles.header}>
                <TouchableOpacity style={settingsModalStyles.cancelButton} onPress={() => {
                    Keyboard.dismiss(); // Dismiss the keyboard
                    setModalMessage(false);
                }}>
                    <Text style={settingsModalStyles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                </View>

                <TextInput
                    style={settingsModalStyles.inputBox} 
                    placeholder={"Your New Name"}
                    placeholderTextColor={'grey'}
                    onChangeText={(text) => setTempName(text)}
                />
                 <TouchableOpacity onPress={handleNameChange} style={settingsModalStyles.button}>
                    <ImageBackground source={backgroundImage} style={settingsModalStyles.image}>
                        <Text style={settingsModalStyles.buttonText}>DONE</Text>
                    </ImageBackground>
                </TouchableOpacity>
                 {/* Images at the bottom */}
                <Image 
                    source={require('../assets/settingsScreen/starSettingModal.png')}
                    style={settingsModalStyles.bottomLeftImage}
                />
                    <Image 
                        source={require('../assets/settingsScreen/rainbowSettingModal.png')}
                        style={settingsModalStyles.bottomRightImage}
                    />

            </View>
        </Modal>

            

      <ImageBackground 
          pointerEvents="none"
          source={require('../assets/homeScreen/lightSky.webp')} // Replace with your image path
          style={styles.backgroundImage}
          resizeMode="cover"
      >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Animated.View 
                        style={[
                            styles.selectCategoryKid,
                            { transform: [{ translateY }] } // Apply the animated value here
                        ]}
                    >
                           <TouchableOpacity
                          onPress={() => setModalMessage(true)} // Add onPress event
                          style={styles.settingsIcon} // Add any additional styling if needed
                            >
                                <Image
                                    source={require('../assets/settingsScreen/Picture3.png')}
                                    style={styles.settingsIcon}
                                    contentFit='contain'
                                />
                            </TouchableOpacity>

                        <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                style={styles.instructionsIcon}
                            >
                                <Image
                                    source={require('../assets/settingsScreen/Picture1.png')}
                                    style={styles.instructionsIcon}
                                    contentFit='contain'
                                />
                        </TouchableOpacity>
                        <View style={styles.kidsName}>
                        <View style={styles.hiDiv}>
                        <Text style={styles.emojiText}>👋🏼</Text>
                        
                        </View>
                        <View style={styles.nameDiv}>
                            <Text style={{"color" : "#36454F" , fontSize : 15 , fontFamily: 'RobotoSlab_400Regular' }}>Hello!</Text>
                            <Text  style={{"color" : "#18516F" , fontSize : 30 , fontFamily: 'RobotoSlab_400Regular'}}>{childName}</Text>
                        </View>
                    </View> 
                    <View style={styles.selectCategoryKid}>
                    <View style={styles.imageDiv}>
                        <Image
                            source={require('../assets/homeScreen/categorySelectingKid.webp')}
                            style={styles.selectCategoryKidImage}
                            contentFit='contain'
                        />
                    </View>
                    <View style={styles.titleDiv}>
                        <View style={styles.heading}>
                            <ImageBackground
                                    source={require('../assets/homeScreen/whiteBlueGradient.webp')} // Replace with your image path
                                    style={styles.background}
                                    resizeMode="cover"
                            >
                            <Text style={styles.selectCategoryText}>Your Playtime, Your Choices</Text>
                            </ImageBackground>
                    </View>
                    </View>
                    <Stories></Stories>
                </View>   
            </Animated.View>  
          </ScrollView>
      </ImageBackground> 
      </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
  },
  scrollViewContent: {
      flexGrow: 1,
  },
  kidsName: {
    flexDirection: 'row', // Align children in a row
    marginTop: 65,       // Margin top
    marginLeft: 10,      // Margin left
    marginRight: 10,     // Margin right
    height: window.height * 0.1, // 10% of screen height
    width : window.width * 1.0
  },
  hiDiv:{
    width : window.width*0.2,
    marginRight : 10,
    alignItems : 'center'
  },
  nameDiv: {
      flex: 1,             // Each child takes up equal width
  },
  emojiText: {
    fontSize: window.height*0.065, // Adjust this value to change the size of the emoji
  },
  selectCategoryKidImage: {
    alignSelf : 'center',
    width: window.width*0.5, // Set as per your requirement
    height: window.height*0.15, // Set as per your requirement
    marginBottom:0
  },
  imageDiv: {
      height: window.height*0.15, 
      marginBottom: 0, // No margin at the bottom
  },
  titleDiv: {
      height: 100, // Adjust the height as needed
      marginTop: 0, // No margin at the top
  },
  heading: {
    width: window.width*0.8, // Set the width you want
    height: window.height*0.1, // Set the height you want
    overflow: 'hidden', // To make sure the background image is contained within the button boundaries
    alignSelf : 'center'
  },
  background: {
      flex: 1,
      justifyContent: 'center', // Center the content vertically
      alignItems: 'center', // Center the content horizontally
  },
  selectCategoryText: {
      color: '#3072A8', 
      fontSize : 18,// Set the text color that contrasts well with your background
      fontFamily: 'RobotoSlab_700Bold'
  },
  settingsIcon: {
    position: 'absolute',
    top: 5, // Adjust the top and right as per your layout
    right: 0,
    width: 75,
    height: 65,
 },
  instructionsIcon: {
    position: 'absolute',
    top: 5, // Adjust the top and right as per your layout
    left : 0,
    width: 75,
    height: 60,
 }
});

const modalStyles = StyleSheet.create({
    modalView: {
        backgroundColor: '#B1D3ED',
        padding: 20,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: '#3074A9',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        marginTop: 0, // Adjust this to control the distance from the top
        height: '60%', // You might want to adjust this as well
    },
    instructionHeading: {
        fontSize : 20,
        marginTop : 5,
        marginBottom : 25,
        //fontWeight : 'bold',
        fontFamily : 'RobotoSlab_800ExtraBold',
        color : '#228B22'
    },
    item: {
        fontSize: 15,
        height: 45,
        color : '#fda63a',
        //fontWeight : 'bold',
        marginTop : 4,
        marginBottom : 6,
        fontFamily : 'RobotoSlab_500Medium',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        //Set your desired width and height for the button
        width: 180,
        height: 50,
        resizeMode : 'cover'
      },
    
    button:{
        marginTop : 15,
        marginBottom : 15
    },
    
    buttonText: {
        color: 'white', // Set your desired text color
        textAlign: 'center',
        fontFamily : 'RobotoSlab_800ExtraBold'
        // Add any other styling you need for the text
    },

})


const settingsModalStyles = StyleSheet.create({
    modalView: {
        backgroundColor: '#B1D3ED',
        padding: 20,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: '#3074A9',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        marginTop: 0, // Adjust this to control the distance from the top
        // height: '60%', // You might want to adjust this as well
    },
    instructionHeading: {
        fontSize : 20,
        marginTop : 5,
        marginBottom : 25,
        //fontWeight : 'bold',
        fontFamily : 'RobotoSlab_800ExtraBold',
        color : 'green'
    },
    item: {
        fontSize: 15,
        height: 45,
        color : '#fda63a',
        //fontWeight : 'bold',
        marginTop : 4,
        marginBottom : 6,
        fontFamily : 'RobotoSlab_500Medium',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        // Set your desired width and height for the button
        width: 130,
        height: 50,
        resizeMode : 'cover'
      },
    
    button:{
        marginTop : 30,
        marginBottom : 50
    },
    
    buttonText: {
        color: 'white', // Set your desired text color
        textAlign: 'center',
        //fontWeight : 'bold'
        fontFamily : 'RobotoSlab_800ExtraBold'
        // Add any other styling you need for the text
    },
    welcomeText: {
        color: 'green',
        fontSize: 20,
        textAlign: 'center',
        //fontWeight : 'bold',
        marginTop: 1,
        marginBottom: 10,
        fontFamily: 'RobotoSlab_700Bold', // Uncomment and use if the font is linked
    },
    inputBox: {
        marginTop: '30%',
        marginBottom : '50%',
        backgroundColor: 'white',
        marginBottom: 2,
        width : window.width*0.75,
        padding: 10,
        fontSize: 20,
        color: 'green',
        borderRadius: 5,
        fontFamily: 'RobotoSlab_400Regular', // Uncomment and use if the font is linked
    },
    bottomLeftImage: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: window.width * 0.2, // Adjust size as needed
        height: window.height * 0.2 // Adjust size as needed
    },
    bottomRightImage: {
        position: 'absolute',
        right: 0,
        bottom: -110,
        width: window.width * 0.4, // Adjust size as needed
        height: window.height * 0.4 // Adjust size as needed
    },    
    header: {
        position: 'absolute', // Absolute positioning
        top: 0,              // Align to the top
        left: 0,             // Align to the left
        right: 0,            // Stretch across the modal width
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: '#3D92D4',
        borderBottomWidth: 1,
        borderColor: 'grey', // Optional, for a subtle border at the bottom of the header
    },
    cancelButton: {
        backgroundColor: '#F5C400', // Choose your preferred color
        padding: 10,
        borderRadius: 5,
        width : '30%',
        alignItems : 'center'
    },
    cancelButtonText: {
        color: 'white', // Set your desired text color
        fontFamily: 'RobotoSlab_800ExtraBold'
    }
})



export default HomeScreen;




