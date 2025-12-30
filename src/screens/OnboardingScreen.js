import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    Animated,
    Image,
    StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/ui/Button';
import { COLORS, SPACING, FONTS, SHADOWS, RADIUS } from '../theme/theme';

const { width, height } = Dimensions.get('window');

// Onboarding slides data
const slides = [
    {
        id: '1',
        image: require('../assets/Thirdimg.jpg'),
        title: 'Track Your Mood',
        description: 'Monitor your daily emotions and mental well-being with ease and precision',
        icon: 'happy-outline',
    },
    {
        id: '2',
        image: require('../assets/imageTwo.jpg'),
        title: 'Journal Entries',
        description: 'Write your thoughts, feelings, and experiences every day in a safe space',
        icon: 'journal-outline',
    },
    {
        id: '3',
        image: require('../assets/imageFour.jpg'),
        title: 'Insights & Analytics',
        description: 'View patterns and trends in your mental health journey over time',
        icon: 'analytics-outline',
    },
    {
        id: '4',
        image: require('../assets/imageOne.jpg'),
        title: 'Stay Consistent',
        description: 'Build healthy habits and maintain your mental wellness with daily practice',
        icon: 'checkmark-circle-outline',
    },
];

// Memoized Slide Component for performance
const SlideItem = memo(({ item, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const imageOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Staggered entrance animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                delay: index * 100,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 7,
                delay: index * 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                delay: index * 100,
                useNativeDriver: true,
            }),
            Animated.timing(imageOpacity, {
                toValue: 1,
                duration: 800,
                delay: 200 + index * 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, [index]);

    return (
        <Animated.View
            style={[
                styles.slide,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            {/* Image Container with Gradient Overlay */}
            <View style={styles.imageContainer}>
                <Animated.Image
                    source={
                        typeof item.image === 'string'
                            ? { uri: item.image }
                            : item.image
                    }
                    style={[
                        styles.illustration,
                        {
                            opacity: imageOpacity,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', COLORS.background]}
                    style={styles.imageGradient}
                />
            </View>

            {/* Content Container */}
            <View style={styles.contentContainer}>
                <Animated.View
                    style={[
                        styles.iconWrapper,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <Ionicons name={item.icon} size={48} color={COLORS.primary} />
                </Animated.View>

                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </Animated.View>
    );
});

SlideItem.displayName = 'SlideItem';

// Memoized Pagination Dot Component
const PaginationDot = memo(({ isActive, index }) => {
    const scaleAnim = useRef(new Animated.Value(isActive ? 1.2 : 1)).current;
    const widthAnim = useRef(new Animated.Value(isActive ? 24 : 8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: isActive ? 1.2 : 1,
                useNativeDriver: true,
                tension: 300,
                friction: 20,
            }),
            Animated.spring(widthAnim, {
                toValue: isActive ? 24 : 8,
                useNativeDriver: false,
                tension: 300,
                friction: 20,
            }),
        ]).start();
    }, [isActive]);

    return (
        <Animated.View
            style={[
                styles.dot,
                {
                    width: widthAnim,
                    transform: [{ scale: scaleAnim }],
                    backgroundColor: isActive ? COLORS.primary : COLORS.surfaceLight,
                },
            ]}
        />
    );
});

PaginationDot.displayName = 'PaginationDot';

const OnboardingScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const skipButtonOpacity = useRef(new Animated.Value(1)).current;

    // Auto-advance slides (disabled for better UX - user controls)
    // Removed auto-advance to give users control

    // Skip button handler
    const handleSkip = useCallback(() => {
        navigation.replace('UserInfo');
    }, [navigation]);

    // Get Started button handler
    const handleGetStarted = useCallback(() => {
        navigation.replace('UserInfo');
    }, [navigation]);

    // Handle viewable items change
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index || 0;
            setCurrentIndex(newIndex);
            
            // Hide skip button on last slide
            Animated.timing(skipButtonOpacity, {
                toValue: newIndex === slides.length - 1 ? 0 : 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    // Render slide item
    const renderSlide = useCallback(({ item, index }) => (
        <SlideItem item={item} index={index} />
    ), []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* Background Gradient */}
            <LinearGradient
                colors={[COLORS.background, COLORS.backgroundSecondary, COLORS.background]}
                style={StyleSheet.absoluteFill}
            />

            {/* Skip Button */}
            <Animated.View
                style={[
                    styles.skipButtonContainer,
                    { opacity: skipButtonOpacity },
                ]}
                pointerEvents={currentIndex === slides.length - 1 ? 'none' : 'auto'}
            >
                <Button
                    variant="ghost"
                    size="small"
                    title="Skip"
                    onPress={handleSkip}
                    style={styles.skipButton}
                />
            </Animated.View>

            {/* Slides FlatList */}
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderSlide}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                scrollEnabled={true}
                decelerationRate="fast"
                snapToInterval={width}
                snapToAlignment="center"
                getItemLayout={(data, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
            />

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <PaginationDot
                        key={index}
                        isActive={currentIndex === index}
                        index={index}
                    />
                ))}
            </View>

            {/* Get Started Button (shown on last slide) */}
            {currentIndex === slides.length - 1 && (
                <Animated.View
                    style={[
                        styles.buttonContainer,
                        {
                            opacity: skipButtonOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0],
                            }),
                            transform: [
                                {
                                    translateY: skipButtonOpacity.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 20],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Button
                        variant="primary"
                        size="large"
                        title="Get Started"
                        onPress={handleGetStarted}
                        fullWidth
                        style={styles.getStartedButton}
                        icon={
                            <Ionicons
                                name="arrow-forward"
                                size={20}
                                color={COLORS.text}
                            />
                        }
                    />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    skipButtonContainer: {
        position: 'absolute',
        top: 50,
        right: SPACING.l,
        zIndex: 10,
    },
    skipButton: {
        ...SHADOWS.light,
    },
    slide: {
        width: width,
        height: height,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.5,
        overflow: 'hidden',
    },
    illustration: {
        width: '100%',
        height: '100%',
    },
    imageGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
    },
    contentContainer: {
        paddingHorizontal: SPACING.xxl,
        paddingBottom: SPACING.xxxl + 80,
        alignItems: 'center',
        zIndex: 1,
    },
    iconWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
        borderWidth: 2,
        borderColor: COLORS.primary,
        ...SHADOWS.glow,
    },
    title: {
        ...FONTS.h1,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SPACING.m,
    },
    description: {
        ...FONTS.body,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: SPACING.l,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 140,
        alignSelf: 'center',
        gap: SPACING.s,
        zIndex: 10,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: SPACING.xxl + 20,
        left: SPACING.xl,
        right: SPACING.xl,
        zIndex: 10,
    },
    getStartedButton: {
        ...SHADOWS.glow,
    },
});

export default OnboardingScreen;
