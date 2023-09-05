// 初始化 zustand

import { FormValues } from "@/components/CVForm";
import initValues from "@/utils/initValues";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type ResumeStore = {
  data: FormValues;
  changeData: (data: FormValues) => void;
}

const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: initValues,
      changeData(data) {
        set({ data });
      },
    }),
    {
      name: "resumeStore ",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useResumeStore;
