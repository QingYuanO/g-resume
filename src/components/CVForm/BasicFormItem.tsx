import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { FieldPath, useFormContext } from 'react-hook-form';
import { FormValues } from '.';
import { ReactNode } from 'react';
import { Textarea } from '../ui/textarea';

export type FieldOption = {
  name: FieldPath<FormValues>;
  label: string;
  type: 'input' | 'select' | 'textarea';
  rows?: number;
};

const BaseInfoFormItem = ({
  name,
  label,
  type,
  className,
  labelRight,
  rows,
}: FieldOption & { className?: string; labelRight?: ReactNode }) => {
  const form = useFormContext<FormValues>();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className=' flex justify-between items-center'>
            <FormLabel className='my-2'>{label}</FormLabel>
            {labelRight}
          </div>

          <FormControl>
            {{
              input: <Input placeholder={`请输入${label}`} {...field} value={field.value as string} />,
              textarea: <Textarea placeholder={`请输入${label}`} {...field} value={field.value as string} rows={rows ?? 2} />,
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
