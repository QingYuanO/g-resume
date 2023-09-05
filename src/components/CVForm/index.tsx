'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import BaseInfoForm from './BaseInfoForm';
import { ScrollArea } from '../ui/scroll-area';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import WorkExperienceForm from './WorkExperienceForm';
import SkillForm from './SkillForm';
import initValues from '@/utils/initValues';

const formSchema = z.object({
  name: z.string().optional(),
  job: z.string().optional(),
  jobAddress: z.string().default('').optional(),
  phone: z
    .string()
    .regex(/^1[3456789]\d{9}$/, { message: '手机号格式不正确' })
    .optional(),
  email: z.string().email({ message: '邮箱格式不正确' }).optional(),
  birthday: z.string().optional(),
  weChat: z.string().optional(),
  introduce: z.string().optional(),
  customUrls: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
      })
    )
    .optional(),
  workExperience: z.array(
    z.object({
      id: z.number(),
      company: z.string(),
      position: z.string(),
      jobName: z.string(),
      rangeDate: z.string(),
      projects: z.array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          content: z.string().optional(),
        })
      ),
    })
  ),
  skills: z.array(
    z.object({
      description: z.string(),
      content: z.string().optional(),
    })
  ),
});
export type FormValues = z.infer<typeof formSchema>;

export default function CVForm(props: { onGeneratePdf?: (data: FormValues) => void }) {
  const { onGeneratePdf } = props;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:initValues,
  });
  const [isFixedTab, setIsFixedTab] = useState(false);
  useEffect(() => {
    function handleScroll() {
      // 获取滚动的垂直位置
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 16) {
        setIsFixedTab(true);
      } else {
        setIsFixedTab(false);
      }
    }

    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);

    // 在组件卸载时移除事件监听
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // 2. Define a submit handler.
  function onSubmit(values: FormValues) {
    console.log(values);
    onGeneratePdf?.(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 py-4 h-full md:h-screen '>
        <Tabs defaultValue='workExperience' className=''>
          <TabsList className={cn('justify-center w-full md:w-fit md:relative duration-150', isFixedTab && 'fixed top-0 inset-x-0 z-50')}>
            <TabsTrigger value='baseInfo'>基本信息</TabsTrigger>
            <TabsTrigger value='workExperience'>工作经历</TabsTrigger>
            <TabsTrigger value='skills'>专业技能</TabsTrigger>
            <TabsTrigger value='test2'>教育经历</TabsTrigger>
          </TabsList>
          {isFixedTab && <div className='h-10 md:hidden'></div>}
          <ScrollArea className='md:h-[calc(100vh-8rem)]'>
            <TabsContent value='baseInfo'>
              <BaseInfoForm />
            </TabsContent>
            <TabsContent value='workExperience'>
              <WorkExperienceForm />
            </TabsContent>
            <TabsContent value='skills'>
              <SkillForm />
            </TabsContent>
            <TabsContent value='test2'>1</TabsContent>
          </ScrollArea>
        </Tabs>
        <Button type='submit'>生成PDF</Button>
      </form>
    </Form>
  );
}
