import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { FieldPath, UseFormReturn, useFormContext } from "react-hook-form";
import { ReactNode } from "react";
import { Textarea } from "../ui/textarea";
import { ResumeFieldPath, ResumeSchemaType } from "./formSchema";

export type FieldOption = {
  name: ResumeFieldPath;
  label: string;
  type: "input" | "select" | "textarea";
  rows?: number;
};

const BaseInfoFormItem = (
  props: FieldOption & { className?: string; labelRight?: ReactNode; form:UseFormReturn<any> },
) => {
  const { name, label, type, className, labelRight, rows ,form} = props;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className=" flex items-center justify-between">
            <FormLabel className="my-2">{label}</FormLabel>
            {labelRight}
          </div>

          <FormControl>
            {{
              input: (
                <Input
                  placeholder={`请输入${label}`}
                  {...field}
                  value={field.value as string}
                />
              ),
              textarea: (
                <Textarea
                  placeholder={`请输入${label}`}
                  {...field}
                  value={field.value as string}
                  rows={rows ?? 2}
                />
              ),
              select: "",
            }[type] ?? ""}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BaseInfoFormItem;
