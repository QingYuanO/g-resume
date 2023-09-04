import { FieldPath, useFieldArray, useFormContext } from 'react-hook-form';
import { FormValues } from '.';
import { PlusIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import BaseInfoFormItem from './BasicFormItem';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import PopoverConfirm from '../PopoverConfirm';
import useOpenKeyStore from './store';

export default function WorkExperienceForm() {
  const form = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'workExperience', // unique name for your Field Array
  });
  const workExperienceOpenKey = useOpenKeyStore((state) => state.workExperienceOpenKey);
  const changeWorkExperienceOpenKey = useOpenKeyStore((state) => state.changeWorkExperienceOpenKey);
  const onAddWorkExperience = () => {
    append({
      id: new Date().getTime(),
      company: '-',
      position: '-',
      jobName: '',
      rangeDate: '',
      projects: [],
    });
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <Accordion type='single' collapsible className='flex flex-col gap-y-4' value={workExperienceOpenKey}>
        {fields.map((item, index) => {
          const watchCompany = form.watch(`workExperience.${index}.company`);
          const watchRangeDate = form.watch(`workExperience.${index}.rangeDate`);

          const watchPosition = form.watch(`workExperience.${index}.position`);
          const key = `workExperience.${index}`;
          return (
            <AccordionItem key={item.id} value={key} className='border-b-0'>
              <Card className=''>
                <CardHeader className='p-4'>
                  <CardTitle className='text-lg flex justify-between items-center'>
                    {watchCompany}
                    <div className='flex justify-between items-start'>
                      {workExperienceOpenKey !== key && <PopoverConfirm onConfirm={() => remove(index)} />}
                      <AccordionTrigger
                        className='p-0 ml-2'
                        onClick={() => changeWorkExperienceOpenKey(workExperienceOpenKey === key ? '' : key)}
                      />
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {watchPosition} {watchRangeDate}
                  </CardDescription>
                </CardHeader>
                <AccordionContent asChild>
                  <CardContent className='px-4'>
                    <div className='gap-x-8 gap-y-2 grid grid-cols-3 md:grid-cols-6 '>
                      <BaseInfoFormItem
                        key={`workExperience.${index}.company`}
                        name={`workExperience.${index}.company`}
                        className='col-span-3'
                        label='公司名称'
                        type='input'
                      />
                      <BaseInfoFormItem
                        key={`workExperience.${index}.jobName`}
                        name={`workExperience.${index}.jobName`}
                        className='col-span-3'
                        label='职位名称'
                        type='input'
                      />
                      <BaseInfoFormItem
                        key={`workExperience.${index}.position`}
                        name={`workExperience.${index}.position`}
                        className='col-span-3'
                        label='所在城市'
                        type='input'
                      />

                      <BaseInfoFormItem
                        key={`workExperience.${index}.rangeDate`}
                        name={`workExperience.${index}.rangeDate`}
                        className='col-span-3'
                        label='开始&结束时间'
                        type='input'
                      />
                    </div>
                    <Projects index={index} />
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>
      <Button variant='outline' onClick={onAddWorkExperience} className='self-start'>
        <PlusIcon className='mr-2' size={20} /> 添加新的工作经历
      </Button>
    </div>
  );
}

const Projects = ({ index }: { index: number }) => {
  const form = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `workExperience.${index}.projects`,
  });
  const onAddProject = () => {
    append({
      name: '项目',
      description: '',
      content: '',
    });
  };

  const getProjectFieldName = (idx: number, name: string) => {
    return `workExperience.${index}.projects.${idx}.${name}` as FieldPath<FormValues>;
  };
  return (
    <div className='gap-x-8 gap-y-2 grid grid-cols-3 md:grid-cols-6 mt-4 '>
      <div className='col-span-6 flex justify-between'>
        <span className='text-lg font-semibold'>项目</span> <PlusIcon className='cursor-pointer' size={20} onClick={onAddProject} />
      </div>
      <Accordion type='single' collapsible className='col-span-6 flex flex-col gap-y-3 '>
        {fields.map((item, idx) => {
          const watchProjectName = form.watch(`workExperience.${index}.projects.${idx}.name`);
          return (
            <AccordionItem key={item.id} value={`projects-${idx}`} className='rounded-lg border bg-card text-card-foreground p-2'>
              <div className='flex justify-between items-center font-semibold'>
                {watchProjectName}
                <div className='flex justify-between items-start'>
                  <AccordionTrigger className='p-0 mr-2' />
                  <PopoverConfirm onConfirm={() => remove(idx)} />
                </div>
              </div>
              <AccordionContent asChild>
                <div key={item.name} className='gap-x-8 gap-y-2 grid grid-cols-3 md:grid-cols-6  p-2 '>
                  <BaseInfoFormItem
                    key={getProjectFieldName(idx, 'name')}
                    name={getProjectFieldName(idx, 'name')}
                    className='col-span-6'
                    label='名称'
                    type='input'
                  />
                  <BaseInfoFormItem
                    key={getProjectFieldName(idx, 'description')}
                    name={getProjectFieldName(idx, 'description')}
                    className='col-span-6 md:col-span-3'
                    label='介绍'
                    type='textarea'
                    rows={5}
                  />
                  <BaseInfoFormItem
                    key={getProjectFieldName(idx, 'content')}
                    name={getProjectFieldName(idx, 'content')}
                    className='col-span-6 md:col-span-3'
                    label='详情'
                    type='textarea'
                    rows={5}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
