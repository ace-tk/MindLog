import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// MoreScreen - Settings, About, aur Team info dikhane ke liye
// Yeh screen bottom tab bar ke "More" button se khulegi
export default function MoreScreen({ navigation }) {
    // User ka naam AsyncStorage se load karo
    const [userName, setUserName] = useState('User');

    // Component mount hone par user ka naam load karo
    useEffect(() => {
        loadUserName();
    }, []);

    const loadUserName = async () => {
        try {
            const name = await AsyncStorage.getItem('userName');
            if (name) {
                setUserName(name);
            }
        } catch (error) {
            console.error('Error loading user name:', error);
        }
    };

    // Team members ka data
    const teamMembers = [
        {
            name: 'Gautam Jha',
            role: 'Full Stack Developer',
            linkedin: 'https://linkedin.com/in/gautamjha',
            gradient: ['#667eea', '#764ba2'],
        },
        {
            name: 'Team Member 2',
            role: 'UI/UX Designer',
            linkedin: 'https://linkedin.com',
            gradient: ['#f093fb', '#f5576c'],
        },
        {
            name: 'Team Member 3',
            role: 'Backend Developer',
            linkedin: 'https://linkedin.com',
            gradient: ['#4facfe', '#00f2fe'],
        },
    ];

    // Settings options
    const settingsOptions = [
        {
            icon: 'person-outline',
            label: 'Edit Profile',
            onPress: () => {
                // Navigate to user info screen or edit profile
                console.log('Edit Profile');
            },
        },
        {
            icon: 'notifications-outline',
            label: 'Notifications',
            onPress: () => console.log('Notifications'),
        },
        {
            icon: 'lock-closed-outline',
            label: 'Privacy',
            onPress: () => console.log('Privacy'),
        },
        {
            icon: 'help-circle-outline',
            label: 'Help & Support',
            onPress: () => console.log('Help'),
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>More</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* User Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>
                            {userName.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.userName}>Hello, {userName}! 👋</Text>
                    <Text style={styles.userSubtitle}>Keep tracking your mood!</Text>
                </View>

                {/* Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    {settingsOptions.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionCard}
                            onPress={option.onPress}
                            activeOpacity={0.7}
                        >
                            <View style={styles.optionLeft}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name={option.icon} size={22} color="#8B5CF6" />
                                </View>
                                <Text style={styles.optionLabel}>{option.label}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#666" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Team Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Meet the Team</Text>
                    {teamMembers.map((member, index) => (
                        <View key={index} style={styles.teamCard}>
                            <View style={styles.teamInfo}>
                                <View
                                    style={[
                                        styles.teamAvatar,
                                        {
                                            backgroundColor: member.gradient[0],
                                        },
                                    ]}
                                >
                                    <Text style={styles.teamAvatarText}>
                                        {member.name.charAt(0)}
                                    </Text>
                                </View>
                                <View style={styles.teamDetails}>
                                    <Text style={styles.teamName}>{member.name}</Text>
                                    <Text style={styles.teamRole}>{member.role}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.linkedinButton}
                                onPress={() => Linking.openURL(member.linkedin)}
                            >
                                <Ionicons name="logo-linkedin" size={20} color="#0A66C2" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* About Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <View style={styles.aboutCard}>
                        <Text style={styles.aboutText}>
                            MindLog helps you track your daily moods and emotions. Keep a
                            journal of your thoughts and see patterns over time.
                        </Text>
                        <Text style={styles.versionText}>Version 1.0.0</Text>
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={async () => {
                        // Clear user data and go back to onboarding
                        await AsyncStorage.clear();
                        // You can add navigation to restart the app flow here
                        console.log('Logged out');
                    }}
                >
                    <Ionicons name="log-out-outline" size={20} color="#FF1744" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 48,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#1F1F1F',
        marginHorizontal: 16,
        marginTop: 10,
        borderRadius: 16,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    userSubtitle: {
        fontSize: 14,
        color: '#999',
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    optionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1F1F1F',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2A2A2A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionLabel: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    teamCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1F1F1F',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
    },
    teamInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    teamAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    teamAvatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    teamDetails: {
        flex: 1,
    },
    teamName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    teamRole: {
        fontSize: 13,
        color: '#999',
    },
    linkedinButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F4FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutCard: {
        backgroundColor: '#1F1F1F',
        padding: 16,
        borderRadius: 12,
    },
    aboutText: {
        fontSize: 14,
        color: '#CCCCCC',
        lineHeight: 22,
        marginBottom: 12,
    },
    versionText: {
        fontSize: 12,
        color: '#666',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F1F1F',
        padding: 16,
        borderRadius: 12,
        marginHorizontal: 16,
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#FF1744',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF1744',
        marginLeft: 8,
    },
});
