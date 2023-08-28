import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import BaseInfoForm from './BaseInfoForm';
import { defaultValues } from '@/App';
import { ScrollArea } from '../ui/scroll-area';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().optional(),
  job: z.string().optional(),
  jobAddress: z.string().default('').optional(),
  phone: z
    .string()
    .regex(/^1[3456789]\d{9}$/, { message: '手机号格式不正确' })
    .optional(),
  email: z.string().email({ message: '邮箱格式不正确' }).optional(),
  birthday: z.date().optional().default(new Date()),
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
});
export type FormValues = z.infer<typeof formSchema>;

export default function CVForm(props: { onGeneratePdf?: (data: FormValues) => void }) {
  const { onGeneratePdf } = props;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
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
        <Tabs defaultValue='baseInfo' className=''>
          <TabsList className={cn('justify-center w-full md:w-fit md:relative duration-150', isFixedTab && 'fixed top-0 inset-x-0 z-50')}>
            <TabsTrigger value='baseInfo'>基本信息</TabsTrigger>
            <TabsTrigger value='test'>工作经历</TabsTrigger>
            <TabsTrigger value='test1'>专业技能</TabsTrigger>
            <TabsTrigger value='test2'>教育经历</TabsTrigger>
          </TabsList>
          {isFixedTab && <div className='h-10 md:hidden'></div>}
          <ScrollArea className='md:h-[calc(100vh-8rem)]'>
            <TabsContent value='baseInfo'>
              <BaseInfoForm />
            </TabsContent>
            <TabsContent value='test'>1</TabsContent>
          </ScrollArea>
        </Tabs>
        <Button type='submit'>生成PDF</Button>
      </form>
    </Form>
  );
}
