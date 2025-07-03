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
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  toggleFavorite: (word) => {
    set((state) => {
      const exists = state.favorites.some((item) => item.word === word.word);
      return {
        favorites: exists
          ? state.favorites.filter((item) => item.word !== word.word)
          : [...state.favorites, word]
      };
    });
  },
  isFavorite: (word) => get().favorites.some((item) => item.word === word),
}));