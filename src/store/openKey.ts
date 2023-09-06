// 初始化 zustand

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OpenKeyStore {
  tabOpenKey: string;
  skillsOpenKey: string;
  workExperienceOpenKey: string;
  educationOpenKey: string;
  changeWorkExperienceOpenKey: (key: string) => void;
  changeSkillsOpenKey: (key: string) => void;
  changeEducationOpenKey: (key: string) => void;
  changeTabOpenKey: (key: string) => void;
}

const useOpenKeyStore = create<OpenKeyStore>()(
  persist(
    (set) => ({
      tabOpenKey:'baseInfo',
      skillsOpenKey: 'skills.0',
      workExperienceOpenKey: 'workExperience.0',
      educationOpenKey: 'education.0',
      changeTabOpenKey: (by) => set(() => ({ tabOpenKey: by })),
      changeSkillsOpenKey: (by) => set(() => ({ skillsOpenKey: by })),
      changeEducationOpenKey: (by) => set(() => ({ educationOpenKey: by })),
      changeWorkExperienceOpenKey: (by) => set(() => ({ workExperienceOpenKey: by })),
    }),
    {
      name: 'openKeyStore ',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOpenKeyStore;
