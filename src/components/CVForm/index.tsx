"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BaseInfoForm from "./BaseInfoForm";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import WorkExperienceForm from "./WorkExperienceForm";
import SkillForm from "./SkillForm";
import initValues from "@/utils/initValues";
import EducationForm from "./EducationForm";
import useOpenKeyStore from "@/store/openKey";
import useResumeStore from "@/store/resume";

const formSchema = z.object({
  avatar:z.string().optional(),
  name: z.string().optional(),
  job: z.string().optional(),
  jobAddress: z.string().default("").optional(),
  phone: z
    .string()
    .regex(/^1[3456789]\d{9}$/, { message: "手机号格式不正确" })
    .optional(),
  email: z.string().email({ message: "邮箱格式不正确" }).optional(),
  birthday: z.string().optional(),
  weChat: z.string().optional(),
  introduce: z.string().optional(),
  customUrls: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  workExperience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      jobName: z.string(),
      rangeDate: z.string(),
      projects: z.array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          content: z.string().optional(),
        }),
      ),
    }),
  ),
  skills: z.array(
    z.object({
      description: z.string(),
      content: z.string().optional(),
    }),
  ),
  education: z.array(
    z.object({
      school: z.string(),
      level: z.string().optional(),
      major: z.string().optional(),
      rangeDate: z.string().optional(),
    }),
  ),
  hobby: z.array(z.string()).optional(),
  certificate: z.array(z.string()).optional(),
});
export type FormValues = z.infer<typeof formSchema>;

export default function CVForm() {
  const changeData = useResumeStore((state) => state.changeData);
  const data = useResumeStore((state) => state.data);
  const tabOpenKey = useOpenKeyStore((state) => state.tabOpenKey);
  const changeTabOpenKey = useOpenKeyStore((state) => state.changeTabOpenKey);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });
  const [isFixedTab, setIsFixedTab] = useState(false);
  useEffect(() => {
    const subscription = form.watch((value) => changeData(value as FormValues));
    return () => subscription.unsubscribe();
  }, [form, changeData]);
  useEffect(() => {
    function handleScroll() {
      // 获取滚动的垂直位置
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 16) {
        setIsFixedTab(true);
      } else {
        setIsFixedTab(false);
      }
    }

    // 添加滚动事件监听
    window.addEventListener("scroll", handleScroll);

    // 在组件卸载时移除事件监听
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // 2. Define a submit handler.
  function onSubmit(values: FormValues) {
    console.log(values);
    changeData?.(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full space-y-2 py-4 md:h-screen "
      >
        <Tabs className="" value={tabOpenKey} onValueChange={changeTabOpenKey}>
          <TabsList
            className={cn(
              "w-full justify-center duration-150 md:relative md:w-fit",
              isFixedTab && "fixed inset-x-0 top-0 z-50",
            )}
          >
            <TabsTrigger value="baseInfo">基本信息</TabsTrigger>
            <TabsTrigger value="workExperience">工作经历</TabsTrigger>
            <TabsTrigger value="skills">专业技能</TabsTrigger>
            <TabsTrigger value="education">教育经历</TabsTrigger>
          </TabsList>
          {isFixedTab && <div className="h-10 md:hidden"></div>}
          <ScrollArea className="md:h-[calc(100vh-8rem)]">
            <TabsContent value="baseInfo">
              <BaseInfoForm />
            </TabsContent>
            <TabsContent value="workExperience">
              <WorkExperienceForm />
            </TabsContent>
            <TabsContent value="skills">
              <SkillForm />
            </TabsContent>
            <TabsContent value="education">
              <EducationForm />
            </TabsContent>
          </ScrollArea>
        </Tabs>
        <Button type="submit">生成PDF</Button>
      </form>
    </Form>
  );
}
