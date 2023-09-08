import { DefaultValues, FieldValues, UseFormReturn, useForm } from "react-hook-form";
import {
  BaseInfoSchemaType,
  EducationSchemaType,
  ResumeSchemaType,
  SkillsSchemaType,
  WorkExperienceSchemaType,
  baseInfoSchema,
} from "./formSchema";
import { useEffect } from "react";
import useResumeStore from "@/store/resume";
import { getProperty } from "dot-prop";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

function useSyncFields<
  T extends
    | BaseInfoSchemaType
    | EducationSchemaType
    | SkillsSchemaType
    | WorkExperienceSchemaType,
>(schema: ZodType<T>, initData: DefaultValues<T>  ) {
  const changeData = useResumeStore((state) => state.changeData);
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: initData,
  });
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name && value) {
        changeData({ field: name, value: getProperty(value, name) });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, changeData]);
  return form
}

export { useSyncFields };
