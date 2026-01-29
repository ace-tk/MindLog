import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, SHADOWS, FONTS } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';

const PATIENTS = [
    { id: '1', name: 'Aarav Patel', status: 'Stable', lastCheckIn: '2 hours ago', mood: 'good' },
    { id: '2', name: 'Diya Sharma', status: 'Needs Attention', lastCheckIn: '1 day ago', mood: 'bad' },
    { id: '3', name: 'Vihaan Singh', status: 'Improving', lastCheckIn: '5 hours ago', mood: 'meh' },
    { id: '4', name: 'Ananya Gupta', status: 'Stable', lastCheckIn: '10 mins ago', mood: 'rad' },
    { id: '5', name: 'Ishaan Kumar', status: 'Critical', lastCheckIn: '30 mins ago', mood: 'awful' },
];

export default function PatientListScreen({ navigation, route }) {
    const { trainerName } = route.params || {};
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: () => navigation.replace("SignIn") }
            ]
        );
    };

    const filteredPatients = PATIENTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (mood) => {
        switch (mood) {
            case 'rad': return '#00E676';
            case 'good': return '#AEEA00';
            case 'meh': return '#FFD600';
            case 'bad': return '#FF9100';
            case 'awful': return '#FF1744';
            default: return COLORS.textSecondary;
        }
    };

    const renderPatient = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Home', { patientId: item.id, patientName: item.name })}
            activeOpacity={0.9}
        >
            <LinearGradient
                colors={[COLORS.surface, COLORS.surfaceLight]}
                style={styles.card}
            >
                <View style={styles.cardContent}>
                    <View style={[styles.avatarContainer, { borderColor: getStatusColor(item.mood) }]}>
                        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.statusRow}>
                            <Ionicons name="time-outline" size={12} color={COLORS.textSecondary} />
                            <Text style={styles.lastCheckIn}>{item.lastCheckIn}</Text>
                        </View>
                    </View>

                    <View style={styles.statusBadge}>
                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.mood) }]} />
                        <Text style={[styles.statusText, { color: getStatusColor(item.mood) }]}>{item.status}</Text>
                    </View>

                    <Ionicons name="chevron-forward" size={20} color={COLORS.textDim} />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={[COLORS.background, '#1a1a2e']} style={StyleSheet.absoluteFill} />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello, {trainerName || "Dr. Strange"}</Text>
                    <Text style={styles.subtitle}>Mental Wellness Inspector</Text>
                </View>
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color={COLORS.error || '#FF5252'} />
                </TouchableOpacity>
            </View>

            {/* Search & Stats */}
            <View style={styles.dashboardHeader}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={COLORS.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search patients..."
                        placeholderTextColor={COLORS.textDim}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <TouchableOpacity style={styles.addBtn}>
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.accent]}
                        style={styles.addBtnGradient}
                    >
                        <Ionicons name="add" size={24} color="#FFF" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* Patient List */}
            <FlatList
                data={filteredPatients}
                renderItem={renderPatient}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <Text style={styles.listTitle}>Assigned Patients ({filteredPatients.length})</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.l,
        marginBottom: SPACING.l,
    },
    greeting: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, letterSpacing: 0.5 },
    subtitle: { fontSize: 14, color: COLORS.primary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
    logoutBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: COLORS.surfaceLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 82, 82, 0.2)',
    },

    dashboardHeader: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.l,
        gap: SPACING.m,
        marginBottom: SPACING.l,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        paddingHorizontal: SPACING.m,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.surfaceLight,
    },
    searchInput: {
        flex: 1,
        marginLeft: SPACING.s,
        color: COLORS.text,
        fontSize: 16,
    },
    addBtn: {
        width: 50,
        height: 50,
        borderRadius: 16,
        ...SHADOWS.medium,
    },
    addBtnGradient: {
        flex: 1,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listContent: { padding: SPACING.l, paddingBottom: 100 },
    listTitle: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '700',
        marginBottom: SPACING.m,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    card: {
        borderRadius: 20,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        ...SHADOWS.light,
    },
    cardContent: { flexDirection: 'row', alignItems: 'center', gap: SPACING.m },
    avatarContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.surfaceLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    avatarText: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
    info: { flex: 1 },
    name: { fontSize: 17, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
    statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    lastCheckIn: { fontSize: 12, color: COLORS.textSecondary },

    statusBadge: {
        alignItems: 'flex-end',
        marginRight: SPACING.s,
        backgroundColor: COLORS.surfaceLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusDot: { width: 6, height: 6, borderRadius: 3, marginBottom: 2, display: 'none' }, // Hidden for now, using text color
    statusText: { fontSize: 11, fontWeight: '700' },
});
