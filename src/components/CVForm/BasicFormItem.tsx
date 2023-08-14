import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormValues } from '.';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export type FieldOption = {
  name: keyof FormValues;
  label: string;
  type: 'input' | 'select' | 'date';
};

const BaseInfoFormItem = ({ form, name, label, type }: { form: UseFormReturn<FormValues> } & FieldOption) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='basis-[calc(50%-4rem/2)]'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {{
              input: <Input placeholder={`请输入${label}`} {...field} value={field.value as string} />,
              date: (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value && field.value instanceof Date ? format(field.value, 'yyyy-MM-dd') : <span>选择日期</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value as Date}
                      onSelect={field.onChange}
                      locale={zhCN}
                      disabled={(date: Date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ),
              select: '',
            }[type] ?? ''}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BaseInfoFormItem;
