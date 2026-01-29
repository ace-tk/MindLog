import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, FONTS, SHADOWS } from '../theme/theme';

/**
 * Premium Splash Screen with smooth animations
 * Displays app logo with elegant entrance animations
 */
const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const logoGlow = useRef(new Animated.Value(0)).current;
    const subtitleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Parallel animations for smooth entrance
        Animated.parallel([
            // Logo fade in
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            // Logo scale with bounce
            Animated.sequence([
                Animated.spring(scaleAnim, {
                    toValue: 1.1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]),
            // Subtle rotation
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            // Glow effect
            Animated.loop(
                Animated.sequence([
                    Animated.timing(logoGlow, {
                        toValue: 1,
                        duration: 1500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(logoGlow, {
                        toValue: 0,
                        duration: 1500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ),
            // Subtitle fade in (delayed)
            Animated.timing(subtitleAnim, {
                toValue: 1,
                duration: 600,
                delay: 400,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();

        // Navigate after animation completes
        const navigationTimeout = setTimeout(() => {
            navigation.replace('RoleSelection');
        }, 2500);

        return () => {
            clearTimeout(navigationTimeout);
        };
    }, [navigation]);

    // Rotation interpolation
    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-5deg', '0deg'],
    });

    // Glow opacity interpolation
    const glowOpacity = logoGlow.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* Background Gradient */}
            <LinearGradient
                colors={[COLORS.background, COLORS.backgroundSecondary, COLORS.background]}
                style={StyleSheet.absoluteFill}
            />

            {/* Animated Logo Container */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { scale: scaleAnim },
                            { rotate: rotation },
                        ],
                    },
                ]}
            >
                {/* Glow Effect */}
                <Animated.View
                    style={[
                        styles.glowContainer,
                        {
                            opacity: glowOpacity,
                        },
                    ]}
                >
                    <View style={styles.glowCircle} />
                </Animated.View>

                {/* Logo Image */}
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Animated.View>

            {/* Subtitle */}
            <Animated.View
                style={[
                    styles.subtitleContainer,
                    {
                        opacity: subtitleAnim,
                        transform: [
                            {
                                translateY: subtitleAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [10, 0],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <View style={styles.subtitleLine} />
                <Animated.Text style={styles.subtitle}>
                    Your Mental Wellness Companion
                </Animated.Text>
                <View style={styles.subtitleLine} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.glowStrong,
    },
    glowContainer: {
        position: 'absolute',
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    glowCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: COLORS.primary,
        opacity: 0.2,
    },
    logo: {
        width: 280,
        height: 120,
        zIndex: 1,
    },
    subtitleContainer: {
        position: 'absolute',
        bottom: SPACING.xxxl + 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.m,
    },
    subtitleLine: {
        width: 30,
        height: 1,
        backgroundColor: COLORS.primary,
        opacity: 0.5,
    },
    subtitle: {
        ...FONTS.caption,
        color: COLORS.textSecondary,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
});

export default SplashScreen;
