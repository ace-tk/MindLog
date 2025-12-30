import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/ui/Button';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';

const { width } = Dimensions.get('window');

// Concept: Mood Data Array
const MOODS = [
    { id: 'happy', icon: 'happy-outline', label: 'Happy', color: '#FFD700' }, // Gold
    { id: 'calm', icon: 'leaf-outline', label: 'Calm', color: '#4DB6AC' },   // Teal
    { id: 'sad', icon: 'sad-outline', label: 'Sad', color: '#64B5F6' },      // Blue
    { id: 'angry', icon: 'flame-outline', label: 'Angry', color: '#FF5252' }, // Red
];

const UserInfoScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [selectedMood, setSelectedMood] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const handleContinue = () => {
        if (name.trim() && selectedMood) {
            navigation.replace('Home');
        }
    };

    const isButtonActive = name.trim().length > 0 && selectedMood !== null;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Animated.View style={[
                styles.content,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }
            ]}>

                {/* GIF Section */}
                <View style={styles.imageContainer}>
                    {/* 
                        TODO: Replace 'logo.png' with 'mindLog.gif' when available.
                        Currently using logo.png to prevent crash.
                    */}
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.gif}
                        resizeMode="contain"
                    />
                </View>

                {/* Name Input Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>What's your name?</Text>
                    <TextInput
                        style={[
                            styles.input,
                            isFocused && styles.inputFocused
                        ]}
                        placeholder="Your Name"
                        placeholderTextColor="#555"
                        value={name}
                        onChangeText={setName}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        autoCapitalize="words"
                    />
                </View>

                {/* Mood Selection Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>How are you feeling?</Text>
                    <View style={styles.moodRow}>
                        {MOODS.map((mood) => {
                            const isSelected = selectedMood === mood.id;
                            return (
                                <TouchableOpacity
                                    key={mood.id}
                                    style={styles.moodItem}
                                    onPress={() => setSelectedMood(mood.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[
                                        styles.iconContainer,
                                        isSelected && {
                                            backgroundColor: mood.color,
                                            borderColor: mood.color,
                                            transform: [{ scale: 1.1 }],
                                            shadowColor: mood.color,
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.4,
                                            shadowRadius: 8,
                                            elevation: 6,
                                        }
                                    ]}>
                                        <Ionicons
                                            name={mood.icon}
                                            size={28}
                                            color={isSelected ? '#FFF' : '#888'}
                                        />
                                    </View>
                                    <Text style={[
                                        styles.moodLabel,
                                        isSelected && { color: mood.color, fontWeight: '700' }
                                    ]}>
                                        {mood.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Continue Button */}
                <Button
                    variant="primary"
                    size="large"
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!isButtonActive}
                    fullWidth
                    icon={<Ionicons name="arrow-forward" size={20} color={COLORS.text} />}
                    style={styles.button}
                />

            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 80, // Increased padding to lift the button
        justifyContent: 'space-between',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
        height: 200, // Increased height for zoomed GIF
        justifyContent: 'center',
    },
    gif: {
        width: 500, // Increased width
        height: 500, // Increased height
    },
    section: {
        marginBottom: 30,
    },
    label: {
        fontSize: 24,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 20,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.l,
        paddingVertical: 18,
        paddingHorizontal: 20,
        fontSize: 18,
        color: COLORS.text,
        borderWidth: 2,
        borderColor: COLORS.border,
        textAlign: 'center',
    },
    inputFocused: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.surfaceLight,
        ...SHADOWS.glow,
    },
    moodRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    moodItem: {
        alignItems: 'center',
        width: (width - 64) / 4,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.border,
        marginBottom: 8,
    },
    iconContainerSelected: {
        backgroundColor: '#6C5CE7',
        borderColor: '#6C5CE7',
        transform: [{ scale: 1.1 }],
    },
    moodLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    moodLabelSelected: {
        color: COLORS.text,
        fontWeight: '700',
    },
    button: {
        marginTop: SPACING.l,
    },
});

export default UserInfoScreen;
