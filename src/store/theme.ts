// 初始化 zustand

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeType = "dark" | "light";
interface OpenKeyStore {
  theme: ThemeType;
  toggleTheme: () => void;
}

const useThemeStore = create<OpenKeyStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () =>
        set(() => ({ theme: get().theme === "dark" ? "light" : "dark" })),
    }),
    {
      name: "useThemeStore ",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useThemeStore;
