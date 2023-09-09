"use client";
import { useFieldArray } from "react-hook-form";
import { PlusIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import BaseInfoFormItem from "./BasicFormItem";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import PopoverConfirm from "../PopoverConfirm";
import useOpenKeyStore from "@/store/openKey";
import { skillsSchema } from "./formSchema";
import { Form } from "../ui/form";
import useResumeStore from "@/store/resume";
import { useSyncFields } from "./hooks";

export default function SkillForm() {
  const skills = useResumeStore((state) => state.skills);
  const skillsOpenKey = useOpenKeyStore((state) => state.skillsOpenKey);
  const changeSkillsOpenKey = useOpenKeyStore(
    (state) => state.changeSkillsOpenKey,
  );
  const form = useSyncFields(skillsSchema, { skills });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const onAddSkill = () => {
    append({
      description: "-",
      content: "",
    });
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-y-4">
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-y-4"
          value={skillsOpenKey}
        >
          {fields.map((item, index) => {
            const watchDescription = form.watch(`skills.${index}.description`);
            const key = `skills.${index}`;
            return (
              <AccordionItem key={item.id} value={key} className="border-b-0">
                <Card className="">
                  <CardHeader className="p-4">
                    <CardTitle className="flex items-center justify-between text-lg">
                      {watchDescription}
                      <div className="flex items-start justify-between">
                        {skillsOpenKey !== key && (
                          <PopoverConfirm onConfirm={() => remove(index)} />
                        )}
                        <AccordionTrigger
                          className="ml-2 p-0"
                          onClick={() =>
                            changeSkillsOpenKey(
                              skillsOpenKey === key ? "" : key,
                            )
                          }
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <AccordionContent asChild>
                    <CardContent className="px-4">
                      <div className="grid grid-cols-3 gap-x-8 gap-y-2 md:grid-cols-6 ">
                        <BaseInfoFormItem
                          key={`skills.${index}.description`}
                          name={`skills.${index}.description`}
                          className="col-span-6"
                          label="技能名称"
                          type="input"
                          form={form}
                        />
                        <BaseInfoFormItem
                          key={`skills.${index}.content`}
                          name={`skills.${index}.content`}
                          className="col-span-6"
                          label="描述"
                          type="textarea"
                          rows={6}
                          form={form}
                        />
                      </div>
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            );
          })}
        </Accordion>
        <Button variant="outline" onClick={onAddSkill} className="self-start">
          <PlusIcon className="mr-2" size={20} /> 添加新的技能
        </Button>
      </div>
    </Form>
  );
}
