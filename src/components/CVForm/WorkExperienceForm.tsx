import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormValues } from '.';
import { PlusIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import BaseInfoFormItem from './BasicFormItem';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { format } from 'date-fns';
import { Button } from '../ui/button';

export default function WorkExperienceForm() {
  const form = useFormContext<FormValues>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'workExperience', // unique name for your Field Array
  });

  const onAddWorkExperience = () => {
    append({
      company: '-',
      position: '-',
      jobName: '-',
      endDate: new Date(),
      startDate: new Date(),
      isNow: false,
      projects: [],
    });
  };
  return (
    <div className='flex flex-col gap-y-2'>
      <Accordion type='single' collapsible className='flex flex-col gap-y-2'>
        {fields.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className='border-b-0'>
            <Card className=''>
              <CardHeader className='p-4'>
                <CardTitle className='text-lg flex justify-between items-start'>
                  {form.watch(`workExperience.${index}.company`)} <AccordionTrigger className='p-0' />
                </CardTitle>
                <CardDescription>
                  {item.position} {format(item.startDate, 'yyyy/MM')} -{' '}
                  {item.isNow ? '现在' : item.endDate && format(item.endDate, 'yyyy/MM')}
                </CardDescription>
              </CardHeader>
              <AccordionContent asChild>
                <CardContent className='gap-x-8 gap-y-2 grid grid-cols-3 md:grid-cols-6 px-4'>
                  <BaseInfoFormItem
                    key={`workExperience.${index}.company`}
                    name={`workExperience.${index}.company`}
                    className='col-span-3'
                    label='公司'
                    type='input'
                  />
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
      <Button variant='outline' onClick={onAddWorkExperience} className='self-start'>
        <PlusIcon className='mr-2' size={20} /> 添加新的工作经历
      </Button>
    </div>
  );
}
