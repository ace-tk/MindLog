import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, SHADOWS, FONTS } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';

export default function RoleSelectionScreen({ navigation }) {
    const handleRoleSelect = (role) => {
        navigation.navigate('SignIn', { role });
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={[COLORS.background, '#1a1a2e']} style={StyleSheet.absoluteFill} />

            <View style={styles.content}>
                <View style={styles.header}>
                    <Ionicons name="fitness-outline" size={60} color={COLORS.primary} />
                    <Text style={styles.title}>MindLog</Text>
                    <Text style={styles.subtitle}>Choose your role to continue</Text>
                </View>

                <View style={styles.cardContainer}>
                    {/* Patient Card */}
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.9}
                        onPress={() => handleRoleSelect('patient')}
                    >
                        <LinearGradient
                            colors={[COLORS.surface, COLORS.surfaceLight]}
                            style={styles.cardGradient}
                        >
                            <View style={styles.iconContainer}>
                                <Ionicons name="person" size={32} color={COLORS.accent} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.roleTitle}>Patient</Text>
                                <Text style={styles.roleDesc}>I want to track my mental wellness and journal my thoughts.</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Inspector Card */}
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.9}
                        onPress={() => handleRoleSelect('inspector')}
                    >
                        <LinearGradient
                            colors={[COLORS.surface, COLORS.surfaceLight]}
                            style={styles.cardGradient}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 230, 118, 0.1)' }]}>
                                <Ionicons name="medkit" size={32} color="#00E676" />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.roleTitle}>Wellness Inspector</Text>
                                <Text style={styles.roleDesc}>I am a trainer or doctor monitoring my patients.</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color={COLORS.textSecondary} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: SPACING.l, justifyContent: 'center' },
    header: { alignItems: 'center', marginBottom: SPACING.xxl },
    title: { fontSize: 40, fontWeight: 'bold', color: COLORS.text, marginTop: SPACING.s },
    subtitle: { fontSize: 16, color: COLORS.textSecondary, marginTop: SPACING.xs },

    cardContainer: { gap: SPACING.l },
    card: {
        borderRadius: 20,
        ...SHADOWS.medium,
    },
    cardGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.l,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.surfaceLight,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 214, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    textContainer: { flex: 1 },
    roleTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
    roleDesc: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 18 },
});
