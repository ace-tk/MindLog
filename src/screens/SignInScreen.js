import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/ui/Button';
import { COLORS, SPACING, RADIUS } from '../theme/theme';

export default function SignInScreen({ navigation, route }) {
    const { role } = route.params || { role: 'patient' };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        if (role === 'inspector') {
            navigation.replace('PatientList');
        } else {
            navigation.replace('Home');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={['#111827', '#000000']} style={StyleSheet.absoluteFill} />

            <View style={styles.content}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#F3F4F6" />
                </TouchableOpacity>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>
                        {role === 'inspector' ? 'Sign in to access your patients' : 'Sign in to your journal'}
                    </Text>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                            <TouchableOpacity style={styles.forgot}>
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <Button
                            variant="primary"
                            size="large"
                            title="Sign In"
                            onPress={handleSignIn}
                            fullWidth
                            style={styles.signBtn}
                        />
                    </View>

                    <View style={styles.socialMessage}>
                        <View style={styles.line} />
                        <Text style={styles.message}>Login with social accounts</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.socialIcons}>
                        <TouchableOpacity style={styles.icon}>
                            <Ionicons name="logo-google" size={20} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Ionicons name="logo-twitter" size={20} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Ionicons name="logo-github" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp', { role })}>
                            <Text style={styles.signupLink}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#111827' },
    content: { flex: 1, justifyContent: 'center', padding: 20, alignItems: 'center' },
    backBtn: { position: 'absolute', top: 60, left: 20, zIndex: 1 },

    formContainer: {
        width: '100%',
        maxWidth: 340,
        borderRadius: RADIUS.xl,
        backgroundColor: '#111827',
        padding: 32,
        borderWidth: 1,
        borderColor: '#374151',
    },

    title: {
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '700',
        color: '#F3F4F6',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14,
        color: '#9CA3AF',
        marginTop: 4,
    },

    form: { marginTop: 24 },

    inputGroup: { marginTop: 16 },

    label: {
        display: 'flex',
        color: '#9CA3AF',
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
    },

    input: {
        width: '100%',
        borderRadius: RADIUS.m,
        borderWidth: 1,
        borderColor: '#374151',
        backgroundColor: '#111827',
        paddingVertical: 12,
        paddingHorizontal: 16,
        color: '#F3F4F6',
        fontSize: 14,
    },

    forgot: {
        alignItems: 'flex-end',
        marginTop: 8,
        marginBottom: 14,
    },
    forgotText: {
        fontSize: 12,
        color: '#9CA3AF',
    },

    signBtn: {
        marginTop: SPACING.m,
    },

    socialMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
    },
    line: {
        height: 1,
        flex: 1,
        backgroundColor: '#374151',
    },
    message: {
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#9CA3AF',
    },

    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginLeft: 8,
    },

    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signupText: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    signupLink: {
        fontSize: 12,
        color: '#F3F4F6',
        textDecorationLine: 'underline',
    },
});
