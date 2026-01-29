import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { getEntries } from './storage';

export const exportData = async () => {
    try {
        const entries = await getEntries();
        const data = JSON.stringify(entries, null, 2);

        const fileUri = FileSystem.documentDirectory + 'mindlog_export.json';

        await FileSystem.writeAsStringAsync(fileUri, data, {
            encoding: FileSystem.EncodingType.UTF8,
        });

        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri);
        } else {
            alert("Sharing is not available on this device");
        }
    } catch (error) {
        console.error("Export failed:", error);
        alert("Failed to export data.");
    }
};
