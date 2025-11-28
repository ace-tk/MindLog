import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

// Concept: Functional Component
// Screen component jo splash screen display karega with smooth animations
const SplashScreen = ({ onFinish }) => {
    // Concept: useRef for Animated Values
    // Animated values ko store karne ke liye useRef use karte hain
    // Ye values re-render ke baad bhi persist rahti hain
    const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity ke liye
    const scaleAnim = useRef(new Animated.Value(0.3)).current; // Scale ke liye
    const rotateAnim = useRef(new Animated.Value(0)).current; // Rotation ke liye

    // Concept: useEffect
    // Component mount hone par animation start karne ke liye
    useEffect(() => {
        // Concept: Animated.parallel
        // Multiple animations ko ek saath chalane ke liye
        Animated.parallel([
            // Fade In Animation
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.exp), // Smooth easing function
                useNativeDriver: true, // Better performance
            }),

            // Scale Animation with Bounce
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 600,
                    easing: Easing.out(Easing.back(1.5)), // Bounce effect
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),

            // Subtle Rotation Animation
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();

        // 3 seconds baad main screen par navigate karne ke liye
        const navigationTimeout = setTimeout(() => {
            onFinish();
        }, 3000);

        // Cleanup function
        return () => {
            clearTimeout(navigationTimeout);
        };
    }, [onFinish]);

    // Rotation value ko degrees mein convert karna
    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-10deg', '0deg'], // -10 degree se 0 degree tak rotate
    });

    return (
        // Concept: View & Flexbox
        // Container ko center karne ke liye Flexbox use kiya hai
        <View style={styles.container}>
            {/* Concept: Animated.Image */}
            {/* Animated component use kar rahe hain smooth animation ke liye */}
            <Animated.Image
                source={require('../assets/logo.png')}
                style={[
                    styles.logo,
                    {
                        opacity: fadeAnim, // Fade animation
                        transform: [
                            { scale: scaleAnim }, // Scale animation
                            { rotate: rotation }, // Rotation animation
                        ],
                    },
                ]}
                resizeMode="contain"
            />
        </View>
    );
};

// Concept: Styling
// Stylesheet create kar rahe hain clean code ke liye
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // Black background to match logo
        justifyContent: 'center', // Vertical center
        alignItems: 'center', // Horizontal center
    },
    logo: {
        width: 300,
        height: 120,
    },
});

export default SplashScreen;
