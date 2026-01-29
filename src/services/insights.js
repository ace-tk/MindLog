import { getEntries } from './storage'

// numerical mapping for scoring 
const MOOD_SCORES = {
  'rad': 2,
  'good': 1,
  'meh': 0,
  'bad': -1,
  'awful': -2,
}

const calculateFrequencies = (entries) => {
  const moodCounts = {};
  const tagCounts = {};
  const tagMoodScores = {}; // { tagName: { totalScore: 0, count: 0 } }
  let totalScore = 0;

  entries.forEach(entry => {
    // mood and score calculation
    const mood = entry.mood;
    const score = MOOD_SCORES[mood] !== undefined ? MOOD_SCORES[mood] : 0;

    if (mood) {
      moodCounts[mood] = (moodCounts[mood] || 0) + 1
      totalScore += score
    }

    // tag calculation
    const tags = entry.tags
    if (tags && Array.isArray(tags)) {
      tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;

        // Correlation data
        if (!tagMoodScores[tag]) {
          tagMoodScores[tag] = { totalScore: 0, count: 0 };
        }
        tagMoodScores[tag].totalScore += score;
        tagMoodScores[tag].count += 1;
      })
    }
  })

  return { moodCounts, tagCounts, totalScore, tagMoodScores };
};


export const getInsights = async (days = 7) => {

  const findMostCommon = (counts) => {
    return Object.entries(counts).reduce(
      (acc, [key, value]) => {
        if (value > acc.count) {
          return { name: key, count: value };
        }
        return acc
      },
      { name: 'N/A', count: 0 }
    )
  }

  const allEntries = await getEntries();

  // filter entries for the specific time
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const recentEntries = allEntries.filter(entry => {
    // Use entry.date instead of timestamp
    return new Date(entry.date) >= cutoffDate;
  });

  if (recentEntries.length === 0) {
    return {
      mostCommonMood: { name: 'N/A', count: 0 },
      mostCommonTag: { name: 'N/A', count: 0 },
      summaryMessage: `No entries in the last ${days} days. Start logging your mood to see insights!`,
      moodTrendData: [],
      correlation: null,
      timePeriod: days
    }
  }

  // frequency calculations and average score
  const { moodCounts, tagCounts, totalScore, tagMoodScores } = calculateFrequencies(recentEntries);
  const totalEntries = recentEntries.length;
  const averageScore = totalScore / totalEntries

  const mostCommonMood = findMostCommon(moodCounts)
  const mostCommonTag = findMostCommon(tagCounts)

  // Calculate correlations
  let bestTag = null;
  let worstTag = null;
  let highestAvg = -3;
  let lowestAvg = 3;

  Object.entries(tagMoodScores).forEach(([tag, data]) => {
    const avg = data.totalScore / data.count;
    if (avg > highestAvg) {
      highestAvg = avg;
      bestTag = tag;
    }
    if (avg < lowestAvg) {
      lowestAvg = avg;
      worstTag = tag;
    }
  });

  // summary
  let summaryMessage = "";
  const mostMood = mostCommonMood.name.toUpperCase();
  const mostTag = mostCommonTag.name;

  if (averageScore >= 1.0) {
    summaryMessage = `You've been doing great! Your most common mood was ${mostMood}.`;
    if (bestTag) summaryMessage += ` You seem happiest when you focus on ${bestTag}.`;
  } else if (averageScore >= 0) {
    summaryMessage = `Things are balanced. Your mood is generally stable.`;
    if (mostTag !== 'N/A') summaryMessage += ` ${mostTag} has been a big part of your week.`;
  } else {
    summaryMessage = `It's been a tough period. Be kind to yourself.`;
    if (worstTag) summaryMessage += ` You might want to reflect on how ${worstTag} affects you.`;
  }

  const moodTrendData = recentEntries.map(entry => ({
    date: new Date(entry.date || entry.timestamp).toLocaleDateString(),
    moodValue: MOOD_SCORES[entry.mood] || 0,
    moodName: entry.mood,
  }));

  return {
    timePeriod: days,
    mostCommonMood,
    mostCommonTag,
    summaryMessage,
    moodTrendData,
    correlation: { bestTag, worstTag }
  }
}

export { MOOD_SCORES, calculateFrequencies }