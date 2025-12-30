# MindLog – Your Personal Mental Health Companion 🧠✨

MindLog is a comprehensive mental health journaling and mood tracking application designed to help users understand their emotional patterns and maintain mental well-being. Built with **React Native (Expo)** and a **Node.js/MongoDB** backend, it offers a seamless experience for daily reflection.

---

## 📽️ Preview & Design
| Beautiful UI | Interactive Insights | Smart Journaling |
| :---: | :---: | :---: |
| ![Splash](https://raw.githubusercontent.com/Gautam-Bharadwaj/MindLog/main/src/assets/splash-icon.png) | ![Mood Tracking](https://raw.githubusercontent.com/Gautam-Bharadwaj/MindLog/main/src/assets/logo.png) | ![Modern Cards](https://raw.githubusercontent.com/Gautam-Bharadwaj/MindLog/main/src/assets/imageOne.jpg) |

---

## 🚀 Key Features

### 📖 Smart Journaling
- **Mood Tracking:** Record how you feel with intuitive mood selectors (Happy, Neutral, Sad, Anxious, Angry).
- **Daily Prompts:** Rotating pre-defined journaling questions to beat writer's block.
- **Rich Entries:** Add text notes and optional tags (Work, Family, Health).
- **Favorites:** Mark important reflections for quick access.

### 📊 Powerful Insights
- **Mood Trends:** Week/Month overview with color-coded trends.
- **Statistics:** Analyze your most common moods and tags over the last 7/30 days.
- **AI-Driven Summaries:** Personalized summary messages based on your emotional patterns.

### 🔐 Security & Personalization
- **Role-Based Access:** Specialized interfaces for **Patients** and **Wellness Inspectors**.
- **Auth Flow:** Secure Sign-In and Sign-Up screens.
- **Onboarding:** A smooth introduction to the app's core features.

### 🛠️ Utilities
- **Calendar View:** Easily navigate through your history.
- **Export Data:** Export your last 7/30 entries to text format.
- **Lock Screen:** (Coming soon/Implemented) Keep your private thoughts secure.

---

## 🏗️ Technology Stack

**Frontend:**
- React Native & Expo
- React Navigation (Stack & Tabs)
- Context API (State Management)
- Expo Linear Gradient & Vector Icons

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- Vercel for Deployment

---

## 📦 Project Structure
```text
MindLog/
├── src/                # React Native Frontend
│   ├── components/     # Reusable UI components
│   ├── screens/        # App screens (Home, Journal, Stats, etc.)
│   ├── services/       # API and Storage logic
│   ├── navigation/     # App routing
│   └── theme/          # Global styles and colors
├── backend/            # Express.js API
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   └── controllers/    # Business logic
└── App.js              # Entry point
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- Expo Go app on your phone or an emulator

### Installation
1.  **Clone the repo:**
    ```bash
    git clone https://github.com/Gautam-Bharadwaj/MindLog.git
    cd MindLog
    ```
2.  **Frontend Setup:**
    ```bash
    npm install
    npx expo start
    ```
3.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    # Set your MONGO_URI in .env
    npm start
    ```

---

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request to help improve MindLog.

---

## 📄 License
This project is licensed under the MIT License.

---

*Made with ❤️ for Mental Well-being.*
