import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, SHADOWS, RADIUS } from "../theme/theme";

export default function BottomTabBar({ navigation, activeTab }) {
    const tabs = [
        { name: "Entries", icon: "newspaper-outline", route: "Entries" },
        { name: "Stats", icon: "stats-chart", route: "StatsScreen" },
        { name: "Add", icon: "add", route: "JournalEntry", isSpecial: true },
        { name: "Calendar", icon: "calendar-outline", route: "Calendar" },
        { name: "More", icon: "ellipsis-horizontal", route: "More" },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                if (tab.isSpecial) {
                    return (
                        <TabButton
                            key={tab.name}
                            tab={tab}
                            navigation={navigation}
                            isSpecial={true}
                        />
                    );
                }

                const isActive = activeTab === tab.name;
                return (
                    <TabButton
                        key={tab.name}
                        tab={tab}
                        navigation={navigation}
                        isActive={isActive}
                    />
                );
            })}
        </View>
    );
}

// Memoized Tab Button Component with animations
const TabButton = ({ tab, navigation, isActive = false, isSpecial = false }) => {
    const scaleAnim = useRef(new Animated.Value(isActive ? 1.1 : 1)).current;
    const opacityAnim = useRef(new Animated.Value(isActive ? 1 : 0.6)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: isActive ? 1.1 : 1,
                useNativeDriver: true,
                tension: 300,
                friction: 20,
            }),
            Animated.timing(opacityAnim, {
                toValue: isActive ? 1 : 0.6,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isActive]);

    const handlePress = () => {
        navigation.navigate(tab.route);
    };

    if (isSpecial) {
        return (
            <TouchableOpacity
                style={styles.plusBtnWrapper}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <Animated.View
                    style={[
                        styles.plusBtn,
                        {
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <Ionicons name={tab.icon} size={28} color={COLORS.background} />
                </Animated.View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={styles.tab}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <Animated.View
                style={[
                    styles.tabContent,
                    {
                        opacity: opacityAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Ionicons
                    name={tab.icon}
                    size={22}
                    color={isActive ? COLORS.primary : COLORS.textSecondary}
                />
                <Text
                    style={[
                        styles.label,
                        { color: isActive ? COLORS.primary : COLORS.textSecondary },
                    ]}
                >
                    {tab.name}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 85,
        backgroundColor: COLORS.surface,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: SPACING.m + 5, // For iPhone home indicator
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        ...SHADOWS.medium,
    },
    tab: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingVertical: SPACING.s,
    },
    tabContent: {
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: 11,
        marginTop: 4,
        fontWeight: "600",
        letterSpacing: 0.3,
    },
    plusBtnWrapper: {
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -35,
    },
    plusBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
        borderColor: COLORS.background,
        ...SHADOWS.glow,
    },
});
