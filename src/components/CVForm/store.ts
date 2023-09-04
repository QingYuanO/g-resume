// 初始化 zustand

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OpenKeyStore {
  skillsOpenKey: string;
  workExperienceOpenKey: string;
  changeWorkExperienceOpenKey: (key: string) => void;
  changeSkillsOpenKey: (key: string) => void;
}

const useOpenKeyStore = create<OpenKeyStore>()(
  persist(
    (set) => ({
      skillsOpenKey: 'skills.0',
      workExperienceOpenKey: 'workExperience.0',
      changeSkillsOpenKey: (by) => set(() => ({ skillsOpenKey: by })),
      changeWorkExperienceOpenKey: (by) => set(() => ({ workExperienceOpenKey: by })),
    }),
    {
      name: 'openKeyStore ',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOpenKeyStore;
