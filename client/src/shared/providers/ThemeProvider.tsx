import { FC } from 'react';
import { useThemeStore } from '../store/theme-store';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  const { theme } = useThemeStore();

  return (
    // Контейнер, который меняет тему
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : 'light'}`}>
      {/* Основной контент с цветами для каждой темы */}
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]">
        {children}
      </div>
    </div>
  );
};
