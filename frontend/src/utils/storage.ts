import { MMKV } from 'react-native-mmkv';

// ---------------------------
// Storage instance
// ---------------------------
export const storage = new MMKV({
  id: 'appStorage',
});

// ---------------------------
// Helpers
// ---------------------------

// Load string
export function loadString(key: string): string | null {
  try {
    return storage.getString(key) ?? null;
  } catch {
    return null;
  }
}

// Save string
export function saveString(key: string, value: string): boolean {
  try {
    storage.set(key, value);
    return true;
  } catch {
    return false;
  }
}

// Load JSON object
export function load<T>(key: string): T | null {
  try {
    const raw = loadString(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

// Save object
export function save(key: string, value: unknown): boolean {
  try {
    return saveString(key, JSON.stringify(value));
  } catch {
    return false;
  }
}

// Remove item
export function remove(key: string): void {
  try {
    storage.delete(key);
  } catch {}
}

// Clear all
export function clear(): void {
  try {
    storage.clearAll();
  } catch {}
}

// Redux Persist storage adapter
export const reduxStorage = {
  setItem: (key: string, value: string) => {
    saveString(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = loadString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    remove(key);
    return Promise.resolve();
  },
};
