import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { getDailyPrompt } from '../constants/prompts';
import EntryCard from '../components/EntryCard';
import SimpleButton from '../components/SimpleButton';
import MoodSelector from '../components/MoodSelector';
import { JournalContext } from '../context/JournalContext';
import BottomTabBar from '../components/BottomTabBar';

const HomeScreen = ({ navigation }) => {
  const { entries, addEntry, deleteEntry, toggleFavorite } = useContext(JournalContext);
  const [selectedMood, setSelectedMood] = useState(null);

  // Get today's date and greeting
  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const dateString = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const dailyPrompt = getDailyPrompt();

  // Check if entry exists today
  const todayDate = today.toDateString();
  const hasEntryToday = entries.some((entry) => {
    const entryDate = new Date(entry.date).toDateString();
    return entryDate === todayDate;
  });

  // Handle mood selection
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    navigation.navigate('JournalEntry', { mood: mood.name });
  };

  // Render header content
  const renderHeader = () => {
    return (
      <View>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting},</Text>
            <Text style={styles.date}>{dateString}</Text>
          </View>
        </View>

        {/* Daily Prompt Card */}
        <View style={styles.promptCard}>
          <Text style={styles.promptLabel}>DAILY REFLECTION</Text>
          <Text style={styles.promptText}>"{dailyPrompt}"</Text>
        </View>

        {/* Mood Check-in Section */}
        {!hasEntryToday && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>How are you feeling?</Text>
            <View style={styles.moodContainer}>
              <MoodSelector
                onSelect={handleMoodSelect}
                selectedMood={selectedMood}
              />
            </View>
          </View>
        )}

        {/* Add Entry Button */}
        <View style={styles.addButtonContainer}>
          <SimpleButton
            title="+ New Entry"
            onPress={() => navigation.navigate('JournalEntry')}
            style={styles.addButton}
          />
        </View>

        <Text style={styles.sectionTitle}>Recent Entries</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📔</Text>
            <Text style={styles.emptyText}>Your journal is empty.</Text>
            <Text style={styles.emptySubText}>Tap the button above to start writing.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <EntryCard
            entry={item}
            onToggleFavorite={toggleFavorite}
            onDelete={deleteEntry}
            onPress={() => navigation.navigate('JournalEntry', { entry: item })}
          />
        )}
      />
      <BottomTabBar navigation={navigation} activeTab="Home" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  listContent: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  date: {
    fontSize: 16,
    color: '#B0B0B0',
    marginTop: 4,
  },
  promptCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  promptLabel: {
    color: '#FFD600',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  promptText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 26,
    fontWeight: '500',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  moodContainer: {
    marginHorizontal: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  addButtonContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  addButton: {
    width: '100%',
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  emptySubText: {
    color: '#B0B0B0',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default HomeScreen;
