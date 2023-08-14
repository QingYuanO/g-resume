import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '.';
import BaseInfoFormItem, { FieldOption } from './BasicFormItem';

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
    <div className='gap-x-8 gap-y-2 flex flex-wrap'>
      {baseInfoFields.map((field) => (
        <BaseInfoFormItem key={field.name} {...field} form={form} />
      ))}
    </div>
  );
}
