// 初始化 zustand
import {
  BaseInfoSchemaType,
  EducationSchemaType,
  ResumeSchemaType,
  SkillsSchemaType,
  WorkExperienceSchemaType,
} from "@/components/ResumeForm/formSchema";
import initValues from "@/utils/initValues";
import { cloneDeep } from "lodash-es";
import { FieldPath, FieldValues } from "react-hook-form";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {set} from 'lodash-es'
let lodashSet = set

type ChangeParams<T extends FieldValues> = {
  field: string;
  value: any;
};

type ResumeStore = {
  changeData: (params: ChangeParams<ResumeSchemaType>) => void;
} & ResumeSchemaType;

const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      baseInfo: initValues.baseInfo,
      workExperience: initValues.workExperience,
      education: initValues.education,
      skills: initValues.skills,
      changeData: (params) => {
        // console.log(params);
        
        set((state) => {          
          return cloneDeep(lodashSet(state, params.field, params.value));
        });
      },
    }),
    {
      name: "resumeStore ",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useResumeStore;
