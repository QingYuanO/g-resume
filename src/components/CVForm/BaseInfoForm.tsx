import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '.';
import BaseInfoFormItem, { FieldOption } from './BasicFormItem';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '../ui/textarea';
import { FormField } from '../ui/form';
import { Button } from '../ui/button';

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

export default function BaseInfoForm({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <div className='flex flex-col gap-y-3'>
      <Card className=''>
        <CardHeader className='p-4'>
          <CardTitle className='text-lg'>个人信息</CardTitle>
          <CardDescription>包含你的个人信息以及联系方式</CardDescription>
        </CardHeader>
        <CardContent className='gap-x-8 gap-y-2 flex flex-wrap px-4'>
          {baseInfoFields.map((field) => (
            <BaseInfoFormItem key={field.name} {...field} form={form} />
          ))}
        </CardContent>
      </Card>
      <Card className=''>
        <CardHeader className='p-4'>
          <CardTitle className='text-lg'>自定义内容</CardTitle>
          <CardDescription>你可以在下方区域添加任何链接或者文本</CardDescription>
        </CardHeader>
        <CardContent className=''>
          <FormField
            control={form.control}
            name='customUrls'
            render={({ field }) => {
              // field.onChange()
              return (
                <div>
                  {field.value?.map((item, index) => (
                    <div key={index}>
                      {item.name}-{item.url}
                    </div>
                  ))}
                </div>
              );
            }}
          />
        </CardContent>
        <CardFooter className='p-4'>
          <Button variant='link' className='p-0'>
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
