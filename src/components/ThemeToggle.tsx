import { Sun, Moon, Monitor } from 'lucide-react';

type ThemeProps = {
  colorScheme: 'system' | 'light' | 'dark';
  themeChange: (scheme: 'system' | 'light' | 'dark') => void;
};

export default function ThemeToggle({ colorScheme, themeChange }: ThemeProps) {
  return (
    <div className='flex gap-2'>
      <button
        className={`p-2 rounded ${
          colorScheme === 'light'
            ? 'bg-blue-500 text-[#fff]'
            : 'bg-gray-100 dark:bg-[#2C2C2C] dark:text-[#fff]'
        }`}
        onClick={() => themeChange('light')}
      >
        <Sun size={15} />
      </button>
      <button
        className={`p-2 rounded ${
          colorScheme === 'dark'
            ? 'bg-amber-300 text-[#000]'
            : 'bg-gray-100 dark:bg-[#2C2C2C] dark:text-[#fff] '
        }`}
        onClick={() => themeChange('dark')}
      >
        <Moon size={15} />
      </button>
      <button
        className={`p-2 rounded ${
          colorScheme === 'system'
            ? 'bg-[#fff]'
            : 'bg-gray-100 dark:bg-[#2C2C2C] dark:text-[#fff]'
        }`}
        onClick={() => themeChange('system')}
      >
        <Monitor size={15} />
      </button>
    </div>
  );
}
