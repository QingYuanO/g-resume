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
import ThemeToggleBtn from "../ThemeProvider/ThemeToggleBtn";

export default function ResumeForm() {
  const tabOpenKey = useOpenKeyStore((state) => state.tabOpenKey);
  const changeTabOpenKey = useOpenKeyStore((state) => state.changeTabOpenKey);
  const [isFixedTab, setIsFixedTab] = useState(false);
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
  return (
    <div className="h-full pt-4 md:h-screen ">
      <Tabs className="" value={tabOpenKey} onValueChange={changeTabOpenKey}>
        <div className="flex justify-between">
          <TabsList
            className={cn(
              "w-full justify-center flex-shrink duration-150 md:relative md:w-fit",
              isFixedTab && "fixed inset-x-0 top-0 z-50",
            )}
          >
            <TabsTrigger value="baseInfo">基本信息</TabsTrigger>
            <TabsTrigger value="workExperience">工作经历</TabsTrigger>
            <TabsTrigger value="skills">专业技能</TabsTrigger>
            <TabsTrigger value="education">教育经历</TabsTrigger>
          </TabsList>
          <ThemeToggleBtn />
        </div>

        {isFixedTab && <div className="h-10 md:hidden"></div>}
        <ScrollArea className="md:h-[calc(100vh-3.5rem)]">
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
