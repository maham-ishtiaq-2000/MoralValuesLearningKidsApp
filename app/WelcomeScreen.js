import React, { useState,useRef, useEffect } from 'react';
import { Animated, StyleSheet, View,ImageBackground, Dimensions, TextInput, Text, ScrollView , TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { router } from 'expo-router';

const window = Dimensions.get('window');
const WelcomeScreen = () => {
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(true);
    const componentsOpacity = useRef(new Animated.Value(0)).current;
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const backgroundColor = useRef(new Animated.Value(0)).current; // New animated value for background color

    const shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
        ]).start();
    }

    useEffect(() => {
        Animated.timing(componentsOpacity, {
            toValue: 1,
            duration: 3000, // Duration for fade-in
            useNativeDriver: true,
        }).start();
    }, []);

    const handlePress = async () => {
        if (name.trim() === '') {
            setIsValid(false); // Set isValid to false if name is empty
            shake(); // Trigger shake animation
            return;
        } else {
            setIsValid(true); // Set isValid to true if name is not empty
        }

         try {
            await AsyncStorage.setItem('ChildName', name);
            console.log('Name saved:', name);

            Animated.timing(backgroundColor, {
                toValue: 1,
                duration: 1000, // Duration of the fade to blue
                useNativeDriver: false, // 'useNativeDriver' must be false for color animations
            }).start(() => {
                router.replace("/HomeScreen");
            });
        } catch (error) {
            console.error('Error saving name:', error);
        }
    };

        


    return (
        <>
            <StatusBar style="light" backgroundColor='#04164e' />
            {/* Set the background color to blue here */}
            <ImageBackground
                    source={require('../assets/welcomeScreen/Stars.webp')}
                    style={[styles.container, { backgroundColor: '#054480' }]} // Set the background color to your desired blue color
                    resizeMode='cover'
                >
            <Animated.View style={[styles.container, { opacity: componentsOpacity }]}>
                     <View style={styles.container}>
                    <KeyboardAvoidingView style={styles.container}
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            keyboardVerticalOffset={-90}>
                            <ScrollView style={styles.scrollViewStyle}>
                            <ImageBackground 
                                source={require('../assets/welcomeScreen/Stars.webp')} 
                                style={styles.backgroundImage}
                                resizeMode='cover'
                            />
                                <Image
                                    source={require('../assets/welcomeScreen/planets.webp')}
                                    style={styles.rocketImage}
                                    contentFit='contain'
                                />
                                <Image
                                    source={require('../assets/welcomeScreen/rocket.webp')}
                                    style={styles.planetImage}
                                    contentFit='contain'
                                />
                                <View style={styles.nameInputBox}>
                                    <Text style={styles.welcomeText}>WELCOME</Text>
                                    <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                                        <TextInput
                                            style={[styles.inputBox, !isValid ? styles.invalidInput : null]} // Apply invalid style if not valid
                                            placeholder="Enter your name"
                                            placeholderTextColor={!isValid ? 'red' : 'grey'} // Change placeholder text color based on isValid
                                            onChangeText={text => {
                                                setName(text);
                                                if (text.trim() !== '') {
                                                    setIsValid(true); // Set isValid to true when user starts typing
                                                }
                                            }}
                                            value={name}
                                        />

                                    </Animated.View>

                                    
                                        <TouchableOpacity onPress={handlePress} style={styles.button}>
                                        <ImageBackground
                                            source={require('../assets/welcomeScreen/backgroundGradient.webp')} // Replace with your image path
                                            style={styles.background}
                                            resizeMode="cover"
                                        >
                                            <Text style={styles.buttonText}>Get Started</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    
                                </View>
                                <Image
                                    source={require('../assets/welcomeScreen/flippedKid.webp')}
                                    style={styles.kidImage}
                                    contentFit='contain'
                                />
                                <View style={styles.extraSpace}/>
                            </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Animated.View>
            </ImageBackground>
        </>
        
    );
};

const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject, // This ensures the image covers the whole area
    },
    rocketImage: {
        top : window.height*0.01,
        right : window.width*0.1,
        position: 'absolute',
        width: window.width*0.5, // Set as per your requirement
        height: window.height*0.3, // Set as per your requirement
    },
    planetImage:{
        top : window.height*0.25,
        left : window.width*0.05,
        position: 'absolute',
        width: window.width*0.3, // Set as per your requirement
        height: window.height*0.2, // Set as per your requirement
    },
    kidImage:{
        width: window.width * 0.5,
        height: window.height * 0.27,
        alignSelf: 'center',
        marginBottom: window.height * 0.01,
        marginRight : window.width*0.6,
        marginTop : window.height*0.01
    },
    nameInputBox:{
        backgroundColor : 'rgba(28, 57, 187, 0.5)',
        padding: 10,
        borderWidth: 4,
        borderColor: 'yellow',
        borderRadius: 7,
        width: window.width * 0.9,
        height : window.height * 0.3,
        alignSelf: 'center',
        marginTop: window.height * 0.45, // Adjust as needed
    },
    welcomeText:{
        color : 'yellow',
        fontFamily : 'RobotoSlab_700Bold',
        textAlign : 'center',
        fontSize : 30,
        marginTop : 1,
        marginBottom : 10
    },
    inputBox:{
        marginTop : 15,
        backgroundColor : 'white',
        marginBottom : 10,
        padding : 10,
        color : '#3D92D4',
        borderRadius : 5,
        fontFamily : 'RobotoSlab_400Regular',
        fontSize : 18
    },
    extraSpace: {
        height: 10, // Add extra space if needed for scrolling
    },
    button: {
        marginTop : 10,
        width: 200, // Set the width you want
        height: 50, // Set the height you want
        overflow: 'hidden', // To make sure the background image is contained within the button boundaries
        alignSelf : 'center'
    },
    background: {
        flex: 1,
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally
    },
    buttonText: {
        color: 'white', 
        fontSize : 18,
        fontFamily : 'RobotoSlab_400Regular'
    },
    modalStyle: {
        justifyContent: 'center', // Align to the top
        
    },
    touchableButton: {
        width: window.width * 0.25, // Set your desired width, e.g., 100
        alignSelf : 'center',
        marginTop : 10
        // Other styling as needed
    },
    imageBackground: {
        width: '100%', // Make the ImageBackground take the full width of the TouchableOpacity
        height: 40, // Set your desired height
        justifyContent: 'center', // Center the text vertically
        alignItems: 'center', 
    },
    invalidInput: {
        borderColor: '#FF181D', 
        borderWidth: 3
    }
});
   
   


export default WelcomeScreen;