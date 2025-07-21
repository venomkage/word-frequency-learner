import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type Word = {
  id: string;
  word: string;
  meaning: string;
};

type FavoriteStore = {
  favorites: Word[];
  toggleFavorite: (word: Word) => void;
  isFavorite: (id: string) => boolean;
  loadFavorites: () => Promise<void>;
};

const FAVORITES_KEY = 'favorites';

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],

  toggleFavorite: async (word) => {
    const { favorites } = get();
    const exists = favorites.some((item) => item.word === word.word);
    let updatedFavorites: Word[];

    if (exists) {
      updatedFavorites = favorites.filter((item) => item.word !== word.word);
    } else {
      updatedFavorites = [...favorites, word];
    }

    set({ favorites: updatedFavorites });

    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (e) {
      console.error('Failed to save favorites:', e);
    }
  },

  isFavorite: (word) => get().favorites.some((item) => item.word === word),

  loadFavorites: async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed: Word[] = JSON.parse(stored);
        set({ favorites: parsed });
      }
    } catch (e) {
      console.error('Failed to load favorites:', e);
    }
  },
}));
