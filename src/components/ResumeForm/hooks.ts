import {
  DefaultValues,
  FieldValues,
  UseFormReturn,
  useForm,
} from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { at } from "lodash-es";

function useSyncFields<
  T extends
    | BaseInfoSchemaType
    | EducationSchemaType
    | SkillsSchemaType
    | WorkExperienceSchemaType,
>(schema: ZodType<T>, initData: DefaultValues<T>) {
  const changeData = useResumeStore((state) => state.changeData);
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: initData,
  });
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      const formatName = (name ?? "")
        .split(".")
        .map((item) => (/^-?\d+$/.test(item) ? `[${item}]` : item))
        .join(".");

      changeData({ field: formatName, value: at(value, formatName)[0] });
    });
    return () => subscription.unsubscribe();
  }, [form, changeData]);
  return form;
}

export { useSyncFields };
