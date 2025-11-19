import React, { createContext, useContext, useState } from "react";

interface TrailerContextType {
  urlKey: string | null;
  setTrailer: (key: string | null) => void;
  isMini: boolean;
  setMini: (mini: boolean) => void;
  shouldMiniOnRoute: boolean;
  triggerMini: () => void;
  resetShouldMini: () => void;
}

const TrailerContext = createContext<TrailerContextType | null>(null);

export const TrailerProvider = ({ children }: { children: React.ReactNode }) => {
  const [urlKey, setUrlKey] = useState<string | null>(null);
  const [isMini, setMini] = useState<boolean>(false);
  const [shouldMiniOnRoute, setShouldMiniOnRoute] = useState<boolean>(false);

  const triggerMini = () => setShouldMiniOnRoute(true);
  const resetShouldMini = () => setShouldMiniOnRoute(false);

  return (
    <TrailerContext.Provider
      value={{
        urlKey,
        setTrailer: setUrlKey,
        isMini,
        setMini,
        shouldMiniOnRoute,
        triggerMini,
        resetShouldMini,
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
