import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '.';

export default function BaseInfoForm({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <div>
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
    </div>
  );
}
