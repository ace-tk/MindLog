export const DAILY_PROMPTS = [
    "What made you smile today?",
    "What is one thing you are grateful for?",
    "How did you take care of yourself today?",
    "What was the most challenging part of your day?",
    "Who did you enjoy connecting with today?",
    "What is something you learned today?",
    "How would you describe your energy level today?",
    "What is one goal you have for tomorrow?",
    "What is a small win you had today?",
    "How did you handle stress today?",
];

export const getDailyPrompt = () => {
    // Simple rotation based on day of year
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return DAILY_PROMPTS[dayOfYear % DAILY_PROMPTS.length];
};
