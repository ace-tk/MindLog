import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { JournalContext } from "../context/JournalContext";
import EntryCard from "../components/EntryCard";
import { COLORS, SPACING } from "../theme/theme";
import BottomTabBar from "../components/BottomTabBar";

export default function EntriesScreen({ navigation }) {
    const { entries, toggleFavorite, deleteEntry } = useContext(JournalContext);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEntries = entries.filter((entry) => {
        const textMatch = entry.text?.toLowerCase().includes(searchQuery.toLowerCase());
        const moodMatch = entry.mood?.toLowerCase().includes(searchQuery.toLowerCase());
        const tagMatch = entry.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return textMatch || moodMatch || tagMatch;
    });

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Entries</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search entries, moods, tags..."
                    placeholderTextColor={COLORS.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Entries List */}
            <FlatList
                data={filteredEntries}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: SPACING.l }}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No entries found.</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <EntryCard
                        entry={item}
                        onToggleFavorite={toggleFavorite}
                        onDelete={deleteEntry}
                        onPress={() => navigation.navigate("JournalEntry", { entry: item })}
                    />
                )}
            />
            <BottomTabBar navigation={navigation} activeTab="Entries" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 50 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: SPACING.l,
        marginBottom: SPACING.l,
    },
    headerTitle: { color: COLORS.text, fontSize: 20, fontWeight: "bold" },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surfaceLight,
        marginHorizontal: SPACING.l,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 12,
        marginBottom: SPACING.l,
    },
    searchInput: { flex: 1, color: COLORS.text, fontSize: 16 },
    empty: { alignItems: "center", marginTop: 50 },
    emptyText: { color: COLORS.textSecondary, fontSize: 16 },
});
