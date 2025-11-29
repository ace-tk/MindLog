import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// UserInfoScreen - User ka naam aur basic info collect karne ke liye
// Yeh screen onboarding ke baad aur home screen se pehle dikhegi
export default function UserInfoScreen({ onFinish }) {
    // State variables - user ka naam store karne ke liye
    const [name, setName] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Animation references - welcome text ke liye fade-in animation
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    // Component mount hone par animation start karo
    useEffect(() => {
        // Parallel animation - fade aur slide dono saath mein
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // User info save karke next screen par jaane ka function
    const handleContinue = async () => {
        if (name.trim()) {
            try {
                // AsyncStorage mein user ka naam save karo
                await AsyncStorage.setItem('userName', name.trim());
                await AsyncStorage.setItem('hasCompletedSetup', 'true');

                // Parent component ko notify karo ki setup complete ho gaya
                onFinish();
            } catch (error) {
                console.error('Error saving user info:', error);
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                {/* Animated Welcome Text */}
                <Animated.View
                    style={[
                        styles.headerContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <Text style={styles.emoji}>👋</Text>
                    <Text style={styles.title}>Welcome to MindLog!</Text>
                    <Text style={styles.subtitle}>
                        Let's get to know you better
                    </Text>
                </Animated.View>

                {/* Name Input Field */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>What should we call you?</Text>
                    <TextInput
                        style={[
                            styles.input,
                            isFocused && styles.inputFocused, // Focus state ke liye purple border
                        ]}
                        placeholder="Enter your name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        autoCapitalize="words"
                        returnKeyType="done"
                        onSubmitEditing={handleContinue}
                    />
                </View>

                {/* Continue Button */}
                <TouchableOpacity
                    style={[
                        styles.button,
                        !name.trim() && styles.buttonDisabled, // Agar naam nahi hai to button disable
                    ]}
                    onPress={handleContinue}
                    disabled={!name.trim()}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>

                {/* Skip Button - optional, agar user skip karna chahe */}
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={async () => {
                        await AsyncStorage.setItem('hasCompletedSetup', 'true');
                        onFinish();
                    }}
                >
                    <Text style={styles.skipText}>Skip for now</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    emoji: {
        fontSize: 60,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 30,
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1A1A1A',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    inputFocused: {
        borderColor: '#8B5CF6', // Purple focus state
        backgroundColor: '#FAFAFA',
    },
    button: {
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: '#D1D5DB',
        shadowOpacity: 0,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    skipButton: {
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },
    skipText: {
        color: '#999',
        fontSize: 14,
    },
});
