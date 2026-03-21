import { createContext } from "react";

export type ThemeMode = "dark" | "light";

export interface ThemeContextValue {
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export default ThemeContext;
