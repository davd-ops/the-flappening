import React from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-secondary-white dark:bg-primary-oxford hover:bg-secondary-white/80 dark:hover:bg-primary-oxford/80 transition-colors"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <SunIcon className="h-5 w-5 text-secondary-jasmine" />
      ) : (
        <MoonIcon className="h-5 w-5 text-primary-crayola" />
      )}
    </button>
  );
};

export default DarkModeToggle;