import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  root?: HTMLElement;
  disabled?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  disabled: boolean;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  disabled: false
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey,
  root = window.document.documentElement,
  disabled = false,
  ...props
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => (storageKey && (localStorage.getItem(storageKey) as Theme)) || defaultTheme);

  useEffect(() => {
    changeTheme(theme, disabled, root);
  }, [disabled, root, theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      changeTheme(theme, disabled, root);
    };
    if (theme === 'system') {
      mediaQuery.addEventListener('change', handleChange);
    }
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [disabled, root, theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (storageKey) {
        localStorage.setItem(storageKey, theme);
      }
      setTheme(theme);
    },
    disabled
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

const changeTheme = (theme: Theme, disabled: boolean, root: HTMLElement) => {
  if (disabled) {
    return;
  }
  root.classList.remove('light', 'dark');
  root.classList.add(realTheme(theme));
};

const realTheme = (theme: Theme) => {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return { ...context, realTheme: realTheme(context.theme) };
};
