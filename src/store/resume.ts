// 初始化 zustand
import {
  BaseInfoSchemaType,
  EducationSchemaType,
  ResumeSchemaType,
  SkillsSchemaType,
  WorkExperienceSchemaType,
} from "@/components/ResumeForm/formSchema";
import initValues from "@/utils/initValues";
import { setProperty } from "dot-prop";
import { FieldPath, FieldValues } from "react-hook-form";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type ChangeParams<T extends FieldValues> = {
  field: FieldPath<T>;
  value: any;
};

type ResumeStore = {
  changeData: (params: ChangeParams<ResumeSchemaType>) => void;
} & ResumeSchemaType;

const useResumeStore = create<ResumeStore>()(
  immer(
    persist(
      (set) => ({
        baseInfo: initValues.baseInfo,
        workExperience: initValues.workExperience,
        education: initValues.education,
        skills: initValues.skills,
        changeData: (params) => {
          set((state) => {
            setProperty(state, params.field, params.value);
          });
        },
      }),
      {
        name: "resumeStore ",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

export default useResumeStore;
