import { PlusIcon } from "lucide-react";
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { FormValues } from ".";
import PopoverConfirm from "../PopoverConfirm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import BaseInfoFormItem from "./BasicFormItem";
import useOpenKeyStore from "@/store/openKey";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";

export default function EducationForm() {
  const form = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "education", // unique name for your Field Array
  });
  const educationOpenKey = useOpenKeyStore(
    (state) => state.educationOpenKey,
  );
  const changeEducationOpenKey = useOpenKeyStore(
    (state) => state.changeEducationOpenKey,
  );
  const onAddEducation= () => {
    append({
      school:'-',
      major:'-'
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-y-4"
        value={educationOpenKey}
      >
        {fields.map((item, index) => {
          const watchSchool = form.watch(`education.${index}.school`);
          const watchRangeDate = form.watch(
            `education.${index}.rangeDate`,
          );

          const watchMajor = form.watch(`education.${index}.major`);
          const key = `education.${index}`;
          return (
            <AccordionItem key={item.id} value={key} className="border-b-0">
              <Card className="">
                <CardHeader className="p-4">
                  <CardTitle className="flex items-center justify-between text-lg">
                    {watchSchool}
                    <div className="flex items-start justify-between">
                      {educationOpenKey !== key && (
                        <PopoverConfirm onConfirm={() => remove(index)} />
                      )}
                      <AccordionTrigger
                        className="ml-2 p-0"
                        onClick={() =>
                          changeEducationOpenKey(
                            educationOpenKey === key ? "" : key,
                          )
                        }
                      />
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {watchMajor} {watchRangeDate}
                  </CardDescription>
                </CardHeader>
                <AccordionContent asChild>
                  <CardContent className="px-4">
                    <div className="grid grid-cols-3 gap-x-8 gap-y-2 md:grid-cols-6 ">
                      <BaseInfoFormItem
                        key={`education.${index}.school`}
                        name={`education.${index}.school`}
                        className="col-span-3"
                        label="学校名称"
                        type="input"
                      />
                      <BaseInfoFormItem
                        key={`education.${index}.level`}
                        name={`education.${index}.level`}
                        className="col-span-3"
                        label="最高学历"
                        type="input"
                      />
                      <BaseInfoFormItem
                        key={`education.${index}.major`}
                        name={`education.${index}.major`}
                        className="col-span-3"
                        label="专业"
                        type="input"
                      />

                      <BaseInfoFormItem
                        key={`education.${index}.rangeDate`}
                        name={`education.${index}.rangeDate`}
                        className="col-span-3"
                        label="开始&结束时间"
                        type="input"
                      />
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>
      <Button
        variant="outline"
        onClick={onAddEducation}
        className="self-start"
      >
        <PlusIcon className="mr-2" size={20} /> 添加新的教育经历
      </Button>
    </div>
  );
}
