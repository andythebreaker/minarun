import { Buffer } from 'buffer';

// Function to calculate data volume
export function calculateDataVolume(jsonObj) {
    const jsonString = JSON.stringify(jsonObj);
    const bytes = Buffer.byteLength(jsonString, 'utf8');
    
    // Convert bytes to the appropriate unit
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    // Round size to two decimal places
    size = Math.round(size * 100) / 100;
    
    return `${size} ${units[unitIndex]}`;
  }

