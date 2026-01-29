/**
 * AI Service Layer
 * 
 * This service is designed to be the interface between the app and any AI backend (OpenAI, Gemini, Local LLM).
 * Currently, it returns placeholder data, but the structure is ready for integration.
 */

import { getEntries } from "./storage";

// Interface for AI Summary
export const generateDailySummary = async (date) => {
    // TODO: Fetch entries for the date
    // TODO: Call AI API with entries
    // Placeholder:
    return "Today was a balanced day. You felt productive in the morning but tired by evening.";
};

// Interface for Pattern Detection
export const detectMoodPatterns = async (entries) => {
    // TODO: Analyze entries for subtle patterns
    // Placeholder:
    return [
        { type: "correlation", message: "You tend to feel anxious on Sunday evenings." },
        { type: "trigger", message: "Lack of sleep seems to trigger irritability." }
    ];
};

// Interface for Personalized Prompts
export const getPersonalizedPrompt = async () => {
    // TODO: Analyze recent mood and suggest a prompt
    // Placeholder:
    return "What is one small thing you can do for yourself today?";
};
