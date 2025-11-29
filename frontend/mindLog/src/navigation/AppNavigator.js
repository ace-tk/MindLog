import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import JournalEntryScreen from "../screens/JournalEntryScreen";
import MoodDetailScreen from "../screens/MoodDetailScreen";
import StatsScreen from "../screens/StatsScreen";
import MoreScreen from "../screens/MoreScreen";

const Stack = createStackNavigator();

// AppNavigator - Yahan saare screens ka navigation setup hai
export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="JournalEntry" component={JournalEntryScreen} />
            <Stack.Screen name="MoodDetail" component={MoodDetailScreen} />
            <Stack.Screen name="StatsScreen" component={StatsScreen} />
            <Stack.Screen name="MoreScreen" component={MoreScreen} />
        </Stack.Navigator>
    );
}
