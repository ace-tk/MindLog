import AsyncStorage from "@react-native-async-storage/async-storage"
const STORAGE_KEY = '@mindlog_entries'

// Fallback storage for iOS simulator issues
const fallbackStorage = {
  data: [],
  setItem: function(key, value) {
    try {
      this.data = JSON.parse(value);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
  getItem: function(key) {
    try {
      return Promise.resolve(JSON.stringify(this.data));
    } catch (e) {
      return Promise.reject(e);
    }
  }
};

const storage = AsyncStorage || fallbackStorage;

export const getEntries = async () => {
  try {
    const data = await storage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (err) {
    console.warn('AsyncStorage error, using fallback storage:', err)
    try {
      return fallbackStorage.data || []
    } catch (fallbackErr) {
      console.error('Fallback storage error:', fallbackErr)
      return []
    }
  }
}

export const saveEntries = async (entries) => {
  try {
    const data = JSON.stringify(entries);
    await storage.setItem(STORAGE_KEY, data)
  } catch (err) {
    console.warn('AsyncStorage error, using fallback storage:', err)
    try {
      await fallbackStorage.setItem(STORAGE_KEY, data)
    } catch (fallbackErr) {
      console.error("Error saving entries:", fallbackErr)
    }
  }
}

export const addEntry = async (newEntry) => {
  try {
    const currentEntries = await getEntries();

    const entryWithMeta = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      date: new Date().toISOString(),
      ...newEntry
    };

    const updatedEntries = [...currentEntries, entryWithMeta]

    await saveEntries(updatedEntries)
    return updatedEntries
  } catch (err) {
    console.error("Failed to add entry:", err)
    return []
  }
}
