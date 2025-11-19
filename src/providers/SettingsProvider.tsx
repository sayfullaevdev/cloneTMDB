import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface SettingsContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  notifications: boolean;
  toggleNotifications: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      return savedTheme;
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      return "dark";
    }
  });

  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "ru");
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved !== null ? saved === "true" : true;
  });


  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);


  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);


  useEffect(() => {
    localStorage.setItem("notifications", String(notifications));
  }, [notifications]);

  const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));
  const toggleNotifications = () => setNotifications(prev => !prev);

  return (
    <SettingsContext.Provider
      value={{ theme, toggleTheme, language, setLanguage, notifications, toggleNotifications }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within SettingsProvider");
  return context;
};

