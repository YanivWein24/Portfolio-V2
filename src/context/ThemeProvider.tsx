import { useState, useEffect, useCallback, type ReactNode } from "react";

import ThemeContext, { type ThemeMode } from "./themeContext";

const STORAGE_KEY = "portfolio-theme";

function getInitialMode(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return "dark";
}

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, isDark: mode === "dark", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
