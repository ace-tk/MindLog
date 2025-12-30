import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, SHADOWS, RADIUS } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/ui/Button';

export default function SignUpScreen({ navigation, route }) {
    const { role } = route.params || { role: 'patient' };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Animation for pulse effect
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const handleSignUp = () => {
        if (role === 'inspector') {
            navigation.replace('PatientList', { trainerName: name });
        } else {
            navigation.replace('Home', { patientName: name });
        }
    };

    const InputField = ({ label, value, onChange, secureTextEntry, placeholder }) => (
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.input}
                placeholder=" "
                placeholderTextColor="transparent"
                value={value}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
            />
            <Text style={[styles.floatingLabel, value ? styles.floatingLabelActive : {}]}>
                {label}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1a1a1a', '#000000']} style={StyleSheet.absoluteFill} />

            <View style={styles.content}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>

                <View style={styles.formCard}>
                    <View style={styles.titleContainer}>
                        <View style={styles.dot} />
                        <Text style={styles.title}>Register</Text>
                        <Animated.View style={[styles.dotPulse, { transform: [{ scale: pulseAnim }] }]} />
                    </View>

                    <Text style={styles.message}>
                        {role === 'inspector' ? 'Join as a Wellness Inspector' : 'Signup now and get full access to our app.'}
                    </Text>

                    <View style={styles.form}>
                        <InputField
                            label="Full Name"
                            value={name}
                            onChange={setName}
                        />

                        <InputField
                            label="Email"
                            value={email}
                            onChange={setEmail}
                        />

                        <InputField
                            label="Password"
                            value={password}
                            onChange={setPassword}
                            secureTextEntry
                        />

                        <Button
                            variant="primary"
                            size="large"
                            title="Sign Up"
                            onPress={handleSignUp}
                            fullWidth
                            style={styles.submitBtn}
                        />

                        <View style={styles.signinContainer}>
                            <Text style={styles.signinText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn', { role })}>
                                <Text style={styles.linkText}>Signin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a1a' },
    content: { flex: 1, justifyContent: 'center', padding: 20 },
    backBtn: { position: 'absolute', top: 60, left: 20, zIndex: 1 },

    formCard: {
        backgroundColor: '#1a1a1a',
        borderRadius: RADIUS.xl,
        padding: 20,
        borderWidth: 1,
        borderColor: '#333',
        gap: 10,
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        position: 'relative',
        paddingLeft: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#00bfff',
        letterSpacing: -1,
        marginLeft: 10,
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#00bfff',
        position: 'absolute',
        left: 0,
    },
    dotPulse: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#00bfff',
        position: 'absolute',
        left: 0,
        opacity: 0.5,
    },

    message: {
        fontSize: 14.5,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 20,
    },

    form: {
        gap: 15,
    },

    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#333',
        color: '#fff',
        width: '100%',
        padding: 15,
        paddingTop: 20,
        paddingBottom: 10,
        borderRadius: RADIUS.m,
        borderWidth: 1,
        borderColor: 'rgba(105, 105, 105, 0.397)',
        fontSize: 16,
    },
    floatingLabel: {
        position: 'absolute',
        left: 15,
        top: 18,
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 14,
        pointerEvents: 'none',
    },
    floatingLabelActive: {
        top: 5,
        fontSize: 10,
        color: '#00bfff',
        fontWeight: '600',
    },

    submitBtn: {
        marginTop: SPACING.m,
    },

    signinContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    signinText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14.5,
    },
    linkText: {
        color: '#00bfff',
        fontSize: 14.5,
        textDecorationLine: 'underline',
    },
});
