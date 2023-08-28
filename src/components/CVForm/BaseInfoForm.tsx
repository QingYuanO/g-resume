import { useFormContext } from 'react-hook-form';
import { FormValues } from '.';
import BaseInfoFormItem, { FieldOption } from './BasicFormItem';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MinusCircle } from 'lucide-react';

const baseInfoFields: FieldOption[] = [
  {
    name: 'job',
    label: '职位名称',
    type: 'input',
  },
  {
    name: 'name',
    label: '姓名',
    type: 'input',
  },
  {
    name: 'jobAddress',
    label: '工作地点',
    type: 'input',
  },
  {
    name: 'phone',
    label: '手机号码',
    type: 'input',
  },
  {
    name: 'email',
    label: '邮箱',
    type: 'input',
  },
  {
    name: 'birthday',
    label: '出生日期',
    type: 'date',
  },
  {
    name: 'weChat',
    label: '微信号',
    type: 'input',
  },
];

export default function BaseInfoForm() {
  const form = useFormContext<FormValues>();
  const onAddCustomUrls = () => {
    form.setValue('customUrls', [...(form.getValues('customUrls') ?? []), { name: '', url: '' }]);
  };
  return (
    <div className='flex flex-col gap-y-3'>
      <Card className=''>
        <CardHeader className='p-4'>
          <CardTitle className='text-lg'>个人信息</CardTitle>
          <CardDescription>包含你的个人信息以及联系方式</CardDescription>
        </CardHeader>
        <CardContent className='gap-x-8 gap-y-2 grid grid-cols-3 md:grid-cols-6 px-4'>
          {baseInfoFields.map((field) => (
            <BaseInfoFormItem key={field.name} {...field} className=' col-span-3' />
          ))}
        </CardContent>
      </Card>
      <Card className=''>
        <CardHeader className='p-4'>
          <CardTitle className='text-lg'>自定义内容</CardTitle>
          <CardDescription>你可以在下方区域添加任何链接或者文本</CardDescription>
        </CardHeader>
        <CardContent className=' px-4'>
          <FormField
            control={form.control}
            name='customUrls'
            render={({ field }) => {
              // field.onChange()
              const onCustomUrlsChange = (value: string, index: number, key: 'name' | 'url') => {
                (field.value ?? [])[index][key] = value;
                field.onChange([...(field.value ?? [])]);
              };
              const onRemove = (index: number) => {
                field.onChange(field.value?.filter((_, i) => i !== index));
              };
              return (
                <div className='flex flex-col gap-y-2'>
                  {field.value?.map((item, index) => (
                    <div key={index} className='flex gap-x-2 items-center'>
                      {/* {item.name}-{item.url} */}
                      <Input className='w-1/3' value={item.name} onChange={(e) => onCustomUrlsChange(e.target.value, index, 'name')} />
                      <Input value={item.url} onChange={(e) => onCustomUrlsChange(e.target.value, index, 'url')} type='url' />
                      <MinusCircle className=' cursor-pointer text-red-500' onClick={() => onRemove(index)} />
                    </div>
                  ))}
                </div>
              );
            }}
          />
        </CardContent>
        <CardFooter className='p-4'>
          <Button variant='link' className='p-0' onClick={onAddCustomUrls} type='button'>
            添加
          </Button>
        </CardFooter>
      </Card>
      <Card className=''>
        <CardHeader className='p-4'>
          <CardTitle className='text-lg'>个人简介</CardTitle>
        </CardHeader>
        <CardContent className='px-4'>
          <FormField
            control={form.control}
            name='introduce'
            render={({ field }) => <Textarea placeholder='请输入个人简介' rows={5} {...field} />}
          />
        </CardContent>
      </Card>
    </div>
  );
}
