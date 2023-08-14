import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import BaseInfoForm from './BaseInfoForm';

const formSchema = z.object({
  name: z.string().optional(),
  job: z.string().optional(),
  jobAddress: z.string().default('').optional(),
  phone: z
    .string()
    .regex(/^1[3456789]\\d{9}$/, { message: '手机号格式不正确' })
    .optional(),
  email: z.string().email({ message: '邮箱格式不正确' }).optional(),
  birthday: z.date().optional(),
  weChat: z.string().optional(),
});
export type FormValues = z.infer<typeof formSchema>;

export default function CVForm(props: { onGeneratePdf?: (data: FormValues) => void }) {
  const { onGeneratePdf } = props;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      job: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: FormValues) {
    console.log(values);
    onGeneratePdf?.(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <Tabs defaultValue='baseInfo' className=''>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='baseInfo'>基本信息</TabsTrigger>
            <TabsTrigger value='test'>Password</TabsTrigger>
          </TabsList>
          <TabsContent value='baseInfo'>
            <BaseInfoForm form={form} />
          </TabsContent>
          <TabsContent value='test'>1</TabsContent>
        </Tabs>
        <div className='basis-full'></div>
        <Button type='submit'>生成PDF</Button>
      </form>
    </Form>
  );
}
