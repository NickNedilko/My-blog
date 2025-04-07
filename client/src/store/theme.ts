import {create }from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark'; // Тип состояния темы
  toggleTheme: () => void; // Функция для переключения темы
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light', // Считываем сохраненную тему или по умолчанию светлая
  toggleTheme: () => {
    set((state: ThemeState) => {
      
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme }; // Возвращаем объект с обновленным состоянием
    });
  },
}));