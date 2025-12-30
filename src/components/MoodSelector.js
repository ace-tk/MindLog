import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MOODS } from '../constants/data';

const MoodSelector = ({ onSelect, selectedMood }) => {
  const [localSelected, setLocalSelected] = useState(
    typeof selectedMood === 'string' ? selectedMood : selectedMood?.name
  );

  const handleSelect = (mood) => {
    setLocalSelected(mood.name);
    if (onSelect) {
      onSelect(mood);
    }
  };

  return (
    <View style={styles.container}>
      {MOODS.map((mood) => {
        const isSelected = localSelected === mood.name;
        return (
          <TouchableOpacity
            key={mood.name}
            style={styles.touchableWrapper}
            onPress={() => handleSelect(mood)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.moodItem,
                isSelected && {
                  backgroundColor: '#2A2A2A',
                  borderColor: mood.color,
                  borderWidth: 2,
                },
              ]}
            >
              <Text style={styles.icon}>{mood.icon}</Text>
            </View>
            <Text
              style={[
                styles.label,
                isSelected && { color: mood.color, fontWeight: '700' },
              ]}
            >
              {mood.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  touchableWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  moodItem: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  icon: {
    fontSize: 28,
  },
  label: {
    fontSize: 11,
    textTransform: 'capitalize',
    color: '#B0B0B0',
  },
});

export default MoodSelector;
