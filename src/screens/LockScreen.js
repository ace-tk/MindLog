import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, FONTS } from "../theme/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PIN_LENGTH = 4;

export default function LockScreen({ navigation, route }) {
    const [pin, setPin] = useState("");
    const [storedPin, setStoredPin] = useState(null);
    const [mode, setMode] = useState("check"); // 'check' | 'set' | 'confirm'
    const [tempPin, setTempPin] = useState("");

    useEffect(() => {
        checkStoredPin();
    }, []);

    const checkStoredPin = async () => {
        const p = await AsyncStorage.getItem("user_pin");
        if (p) {
            setStoredPin(p);
            setMode("check");
        } else {
            setMode("set");
        }
    };

    const handlePress = (num) => {
        if (pin.length < PIN_LENGTH) {
            const newPin = pin + num;
            setPin(newPin);
            if (newPin.length === PIN_LENGTH) {
                handlePinComplete(newPin);
            }
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
    };

    const handlePinComplete = async (enteredPin) => {
        setTimeout(async () => {
            if (mode === "check") {
                if (enteredPin === storedPin) {
                    navigation.replace("Home"); // Or go back
                } else {
                    Alert.alert("Error", "Incorrect PIN");
                    setPin("");
                }
            } else if (mode === "set") {
                setTempPin(enteredPin);
                setMode("confirm");
                setPin("");
            } else if (mode === "confirm") {
                if (enteredPin === tempPin) {
                    await AsyncStorage.setItem("user_pin", enteredPin);
                    Alert.alert("Success", "PIN Set Successfully!");
                    navigation.goBack();
                } else {
                    Alert.alert("Error", "PINs do not match. Try again.");
                    setMode("set");
                    setPin("");
                    setTempPin("");
                }
            }
        }, 100);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                {mode === "check"
                    ? "Enter PIN"
                    : mode === "set"
                        ? "Set New PIN"
                        : "Confirm PIN"}
            </Text>

            <View style={styles.dotsContainer}>
                {[...Array(PIN_LENGTH)].map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            i < pin.length ? styles.dotFilled : styles.dotEmpty,
                        ]}
                    />
                ))}
            </View>

            <View style={styles.keypad}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={styles.key}
                        onPress={() => handlePress(num.toString())}
                    >
                        <Text style={styles.keyText}>{num}</Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.key} />
                <TouchableOpacity
                    style={styles.key}
                    onPress={() => handlePress("0")}
                >
                    <Text style={styles.keyText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.key} onPress={handleDelete}>
                    <Ionicons name="backspace-outline" size={28} color={COLORS.text} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: COLORS.text,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 40,
    },
    dotsContainer: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 60,
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    dotFilled: {
        backgroundColor: COLORS.primary,
    },
    dotEmpty: {
        backgroundColor: "transparent",
    },
    keypad: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: 280,
        gap: 20,
        justifyContent: "center",
    },
    key: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.surfaceLight,
        alignItems: "center",
        justifyContent: "center",
    },
    keyText: {
        color: COLORS.text,
        fontSize: 28,
        fontWeight: "600",
    },
});
