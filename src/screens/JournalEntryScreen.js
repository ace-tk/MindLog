import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import MoodSelector from '../components/MoodSelector';
import { TAGS, MOODS } from '../constants/data';
import { JournalContext } from '../context/JournalContext';

const JournalEntryScreen = ({ navigation, route }) => {
  const { entry, mood: initialMoodName } = route.params || {};
  const { addEntry, updateEntry } = useContext(JournalContext);
  const isEditing = !!entry;

  const [text, setText] = useState(entry?.text || '');
  const [selectedMood, setSelectedMood] = useState(null);
  const [intensity, setIntensity] = useState(entry?.intensity || 5);
  const [energy, setEnergy] = useState(entry?.energy || 5);
  const [selectedTags, setSelectedTags] = useState(entry?.tags || []);

  useEffect(() => {
    if (entry?.mood) {
      const m = MOODS.find((m) => m.name === entry.mood);
      if (m) setSelectedMood(m);
    } else if (initialMoodName) {
      const m = MOODS.find((m) => m.name === initialMoodName);
      if (m) setSelectedMood(m);
    }
  }, [entry, initialMoodName]);

  const handleSave = () => {
    if (!selectedMood) {
      Alert.alert('Missing Info', 'Please select a mood!');
      return;
    }

    const entryData = {
      id: entry?.id || Date.now().toString(),
      text,
      mood: selectedMood.name || selectedMood,
      intensity,
      energy,
      tags: selectedTags,
      favorite: entry?.favorite || false,
      date: entry?.date || new Date().toISOString(),
    };

    if (isEditing) {
      updateEntry(entryData);
    } else {
      addEntry(entryData);
    }
    navigation.goBack();
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Scale component for intensity and energy
  const Scale = ({ label, value, onChange }) => (
    <View style={styles.scaleContainer}>
      <View style={styles.scaleHeader}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.scaleValue}>{value}/10</Text>
      </View>
      <View style={styles.scaleRow}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.scaleBtn,
              value === num && styles.scaleBtnActive,
            ]}
            onPress={() => onChange(num)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.scaleBtnText,
                value === num && styles.scaleBtnTextActive,
              ]}
            >
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Entry' : 'New Entry'}
        </Text>
        <TouchableOpacity onPress={handleSave} activeOpacity={0.7}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.content}>
          {/* Mood Selection */}
          <Text style={styles.sectionTitle}>How are you feeling?</Text>
          <MoodSelector
            selectedMood={selectedMood}
            onSelect={setSelectedMood}
          />

          {/* Scales */}
          <Scale label="Intensity" value={intensity} onChange={setIntensity} />
          <Scale label="Energy Level" value={energy} onChange={setEnergy} />

          {/* Tags */}
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {TAGS.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagChip,
                  selectedTags.includes(tag) && styles.tagChipActive,
                ]}
                onPress={() => toggleTag(tag)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tagText,
                    selectedTags.includes(tag) && styles.tagTextActive,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Text Input */}
          <Text style={styles.sectionTitle}>Your Thoughts</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Write your thoughts here..."
            placeholderTextColor="#666666"
            value={text}
            onChangeText={setText}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingTop: 40,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  saveButton: {
    color: '#2FE0C2',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    color: '#B0B0B0',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  scaleContainer: {
    marginTop: 12,
  },
  scaleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  scaleValue: {
    color: '#2FE0C2',
    fontWeight: 'bold',
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  scaleBtnActive: {
    backgroundColor: '#2FE0C2',
    borderColor: '#2FE0C2',
  },
  scaleBtnText: {
    color: '#B0B0B0',
    fontSize: 10,
  },
  scaleBtnTextActive: {
    color: '#0A0A0A',
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginRight: 8,
    marginBottom: 8,
  },
  tagChipActive: {
    backgroundColor: '#1A1A1A',
    borderColor: '#2FE0C2',
  },
  tagText: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  tagTextActive: {
    color: '#2FE0C2',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    height: 200,
    textAlignVertical: 'top',
    fontSize: 16,
    marginTop: 12,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
});

export default JournalEntryScreen;
