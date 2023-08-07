'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().nonempty('不能为空'),
  job: z.string().nonempty('不能为空'),
});
export type FormValues = z.infer<typeof formSchema>;

export default function CVForm(props: { onGeneratePdf?: (data: FormValues) => void }) {
  const { onGeneratePdf } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onGeneratePdf?.(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='gap-x-8 gap-y-2 flex flex-wrap'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='basis-[calc(50%-4rem/2)]'>
              <FormLabel>姓名</FormLabel>
              <FormControl>
                <Input placeholder='请输入姓名' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name='job'
          render={({ field }) => (
            <FormItem className='basis-[calc(50%-4rem/2)]'>
              <FormLabel>职位名称</FormLabel>
              <FormControl>
                <Input placeholder='请输入职位名称' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='basis-full'></div>
        <Button type='submit'>生成基本信息</Button>
      </form>
    </Form>
  );
}
