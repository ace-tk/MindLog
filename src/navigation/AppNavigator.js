import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { Easing } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import JournalEntryScreen from "../screens/JournalEntryScreen";
import MoodDetailScreen from "../screens/MoodDetailScreen";
import StatsScreen from "../screens/StatsScreen";
import CalendarScreen from "../screens/CalendarScreen";
import EntriesScreen from "../screens/EntriesScreen";
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import UserInfoScreen from "../screens/UserInfoScreen";
import MoreScreen from "../screens/MoreScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PatientListScreen from "../screens/PatientListScreen";
import RoleSelectionScreen from "../screens/RoleSelectionScreen";

import LockScreen from "../screens/LockScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                    open: { animation: 'timing', config: { duration: 300, easing: Easing.out(Easing.cubic) } },
                    close: { animation: 'timing', config: { duration: 250, easing: Easing.in(Easing.cubic) } },
                },
                animationEnabled: true,
            }}
            initialRouteName="Splash"
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="PatientList" component={PatientListScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="UserInfo" component={UserInfoScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="JournalEntry" component={JournalEntryScreen} />
            <Stack.Screen name="MoodDetail" component={MoodDetailScreen} />
            <Stack.Screen name="StatsScreen" component={StatsScreen} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen name="Entries" component={EntriesScreen} />
            <Stack.Screen name="More" component={MoreScreen} />
            <Stack.Screen name="LockScreen" component={LockScreen} />
        </Stack.Navigator>
    );
}
