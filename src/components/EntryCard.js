import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MOODS } from '../constants/data';

const EntryCard = ({ entry, onToggleFavorite, onDelete, onPress }) => {
  const mood = MOODS.find((m) => m.name === entry.mood);
  const moodColor = mood ? mood.color : '#B0B0B0';

  // Format date
  const entryDate = new Date(entry.date);
  const dateString = entryDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.moodContainer}>
          <Text style={styles.moodIcon}>{mood?.icon || '—'}</Text>
          <Text style={[styles.moodLabel, { color: moodColor }]}>
            {mood?.label || entry.mood}
          </Text>
        </View>
        <Text style={styles.date}>{dateString}</Text>
      </View>

      {entry.text ? (
        <Text style={styles.text} numberOfLines={3}>
          {entry.text}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <View style={styles.tags}>
          {entry.tags &&
            entry.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => onToggleFavorite(entry.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>
              {entry.favorite ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(entry.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  moodLabel: {
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  date: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    color: '#B0B0B0',
    fontSize: 10,
  },
  actions: {
    flexDirection: 'row',
  },
  actionIcon: {
    fontSize: 20,
    marginLeft: 16,
  },
});

export default EntryCard;
