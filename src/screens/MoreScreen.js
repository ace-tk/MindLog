import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Linking,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { exportData } from '../services/exportService';
import BottomTabBar from '../components/BottomTabBar';

const { width } = Dimensions.get('window');

const MoreScreen = ({ navigation }) => {
    const handleOptionPress = async (option) => {
        if (option === "Export Data") {
            await exportData();
        } else if (option === "Privacy") {
            navigation.navigate("LockScreen");
        } else {
            Alert.alert("Coming Soon", `${option} feature will be available in the next update!`);
        }
    };

    const handleLinkedInPress = (url) => {
        Linking.openURL(url).catch(() => {
            // Silently handle error - user will see native error if URL fails
        });
    };

    const renderOptionItem = (icon, title, subtitle, onPress) => (
        <TouchableOpacity style={styles.optionItem} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={24} color="#6C5CE7" />
            </View>
            <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{title}</Text>
                {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
    );

    // Team Members Data
    const TEAM_MEMBERS = [
        { name: "Tisha Kharade", url: "https://www.linkedin.com/in/tisha-kharade-3b285233a/", gradient: ['#667eea', '#764ba2'] },
        { name: "Shriti Negi", url: "https://www.linkedin.com/in/shriti-negi-323747338?utm_source=share_via&utm_content=profile&utm_medium=member_android", gradient: ['#f093fb', '#f5576c'] },
        { name: "Kumar Gautam", url: "https://www.linkedin.com/in/kumar-gautam-2bb399263/", gradient: ['#4facfe', '#00f2fe'] },
        { name: "Deepak Pathik", url: "https://www.linkedin.com/in/deepak-pathik-944b792a7/?trk=opento_sprofile_topcard", gradient: ['#43e97b', '#38f9d7'] },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>More</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={40} color="#FFF" />
                    </View>
                    <View>
                        <Text style={styles.profileName}>Hello, Friend!</Text>
                        <Text style={styles.profileStatus}>Keep tracking your mind.</Text>
                    </View>
                </View>

                {/* Team Section - Creative Gradient Cards */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Meet the Team</Text>
                    <View style={styles.teamContainer}>
                        {TEAM_MEMBERS.map((member, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.teamCardWrapper}
                                onPress={() => handleLinkedInPress(member.url)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={member.gradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.teamCard}
                                >
                                    <View style={styles.cardOverlay}>
                                        <View style={styles.cardTop}>
                                            <View style={styles.linkedInBadge}>
                                                <Ionicons name="logo-linkedin" size={16} color="#0077B5" />
                                            </View>
                                        </View>
                                        <View style={styles.cardBottom}>
                                            <Text style={styles.memberName}>{member.name}</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Settings Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Settings</Text>
                    {renderOptionItem("notifications", "Notifications", "Reminders to journal", () => handleOptionPress("Notifications"))}
                    {renderOptionItem("lock-closed", "Privacy & Security", "Passcode & FaceID", () => handleOptionPress("Privacy"))}
                </View>

                {/* Data & Support Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Data & Support</Text>
                    {renderOptionItem("download-outline", "Export Data", "Download your entries", () => handleOptionPress("Export Data"))}
                    {renderOptionItem("bulb-outline", "Daily Prompts", "Manage prompt settings", () => handleOptionPress("Daily Prompts"))}
                    {renderOptionItem("help-circle-outline", "Help & Support", "FAQ & Contact", () => handleOptionPress("Help"))}
                </View>

                {/* App Info */}
                <View style={styles.footer}>
                    <Text style={styles.versionText}>MindLog v1.0.0</Text>
                </View>

            </ScrollView>
            <BottomTabBar navigation={navigation} activeTab="More" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#000'
    },
    headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFF' },

    profileSection: {
        flexDirection: 'row', alignItems: 'center', padding: 20,
        backgroundColor: '#1A1A1A', marginHorizontal: 20, borderRadius: 16, marginBottom: 24
    },
    avatarContainer: {
        width: 60, height: 60, borderRadius: 30, backgroundColor: '#6C5CE7',
        justifyContent: 'center', alignItems: 'center', marginRight: 16
    },
    profileName: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    profileStatus: { color: '#AAA', fontSize: 14 },

    sectionContainer: { marginBottom: 24 },
    sectionHeader: {
        color: '#666', fontSize: 14, fontWeight: '600', marginLeft: 20, marginBottom: 16,
        textTransform: 'uppercase', letterSpacing: 1
    },

    // Team Container - Creative Gradient Cards
    teamContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        gap: 12,
    },
    teamCardWrapper: {
        width: (width - 52) / 2,
        height: 110,
        borderRadius: 20,
        overflow: 'hidden',
    },
    teamCard: {
        flex: 1,
        borderRadius: 20,
    },
    cardOverlay: {
        flex: 1,
        padding: 14,
        backgroundColor: 'rgba(0,0,0,0.15)',
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    linkedInBadge: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    cardBottom: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    memberName: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },

    optionItem: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#111',
        padding: 16, marginHorizontal: 20, marginBottom: 2, borderRadius: 12
    },
    iconContainer: {
        width: 40, height: 40, borderRadius: 20, backgroundColor: '#1A1A1A',
        justifyContent: 'center', alignItems: 'center', marginRight: 16
    },
    optionTextContainer: { flex: 1 },
    optionTitle: { color: '#FFF', fontSize: 16, fontWeight: '500', marginBottom: 2 },
    optionSubtitle: { color: '#666', fontSize: 12 },

    footer: { alignItems: 'center', marginTop: 20, marginBottom: 40 },
    versionText: { color: '#666', fontSize: 14, fontWeight: '600', marginBottom: 4 },
});

export default MoreScreen;
