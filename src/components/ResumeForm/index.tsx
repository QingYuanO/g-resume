"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BaseInfoForm from "./BaseInfoForm";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import WorkExperienceForm from "./WorkExperienceForm";
import SkillForm from "./SkillForm";
import EducationForm from "./EducationForm";
import useOpenKeyStore from "@/store/openKey";



export default function CVForm() {

  const tabOpenKey = useOpenKeyStore((state) => state.tabOpenKey);
  const changeTabOpenKey = useOpenKeyStore((state) => state.changeTabOpenKey);

  // const resumeRef = useRef(useResumeStore.getState().data);

  // useEffect(
  //   () => useResumeStore.subscribe((state) => (resumeRef.current = state.data)),
  //   [],
  // );

  // const form = useForm<FormValues>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: resumeRef.current,
  // });
  const [isFixedTab, setIsFixedTab] = useState(false);
  // useEffect(() => {
  //   let subscription: any;
  //   if (process.env.NODE_ENV === "development") {
  //     subscription = form.watch((value) => {
  //       changeData(value as FormValues);
  //     });
  //     return () => subscription.unsubscribe();
  //   }
  // }, [form, changeData]);

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
  // // 2. Define a submit handler.
  // function onSubmit(values: FormValues) {
  //   console.log(values);
  //   changeData?.(values);
  // }
  return (
    <div className="h-full pt-4 md:h-screen ">
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
        <ScrollArea className="md:h-[calc(100vh-4.5rem)]">
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
    </div>
  );
}
