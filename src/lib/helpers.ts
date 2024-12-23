import { v4 as uuidv4 } from 'uuid';

export function getUniqueId() : string {
    return uuidv4();
}

export function SaveData(fileName: string, data: string) {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}