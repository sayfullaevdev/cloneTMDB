import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  setName: (name: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        return;
      } catch {

      }
    }


    const fetchUser = async () => {
      try {
    
        const res = await fetch("https://api.themoviedb.org/3/account?api_key=YOUR_API_KEY&session_id=YOUR_SESSION_ID");
        const data = await res.json();

        const userData: User = {
            name: data.username || "Unknown",
            role: "user",
            email: ""
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.error("Ошибка при загрузке данных пользователя с TMDB:", err);
      }
    };

    fetchUser();
  }, []);

  const setName = (name: string) => {
    if (!user) return;
    const newUser = { ...user, name };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, setName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
