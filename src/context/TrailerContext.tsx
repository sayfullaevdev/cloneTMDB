import { useState, createContext, useContext } from "react";

interface TrailerContextType {
  urlKey: string | null;
  setTrailer: (key: string | null) => void;
  isMini: boolean;
  setMini: (mini: boolean) => void;
  shouldMiniOnRoute: boolean;
  triggerMini: () => void;
}

const TrailerContext = createContext<TrailerContextType | null>(null);

export const TrailerProvider = ({ children }: { children: React.ReactNode }) => {
  const [urlKey, setUrlKey] = useState<string | null>(null);
  const [isMini, setMini] = useState(false);
  const [shouldMiniOnRoute, setShouldMiniOnRoute] = useState(false);

  const triggerMini = () => setShouldMiniOnRoute(true);

  return (
    <TrailerContext.Provider
      value={{
        urlKey,
        setTrailer: setUrlKey,
        isMini,
        setMini,
        shouldMiniOnRoute,
        triggerMini,
      }}
    >
      {children}
    </TrailerContext.Provider>
  );
};

export const useTrailer = () => {
  const ctx = useContext(TrailerContext);
  if (!ctx) throw new Error("useTrailer must be used inside TrailerProvider");
  return ctx;
};
