import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MindLog</Text>
      <Text style={styles.subtitle}>Your Daily Journal & Mood Companion</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8D8FF", 
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4B2E83", 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#5A4A74",
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#7F56D9", 
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
