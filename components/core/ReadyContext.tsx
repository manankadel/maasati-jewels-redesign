"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const ReadyContext = createContext<{ ready: boolean; setReady: (v: boolean) => void }>({
  ready: false,
  setReady: () => {},
});

export function ReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <ReadyContext.Provider value={{ ready, setReady }}>{children}</ReadyContext.Provider>
  );
}

export function useReady() {
  return useContext(ReadyContext);
}
