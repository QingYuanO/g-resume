import CVForm, { FormValues } from '@/components/CVForm';
import MyDocument from '@/components/CVTemp/MyDocument';
import { useState } from 'react';

export const defaultValues: FormValues = {
  name: '陈守园',
  job: '前端开发工程师',
  jobAddress: '深圳',
  phone: '13933332066',
  email: '123@qq.com',
  birthday: new Date(),
  weChat: '123',
};

export default function Home() {
  const [cvData, setCvData] = useState<FormValues>(defaultValues);
  const handleGeneratePdf = (params: FormValues) => {
    setCvData(params);
  };
  return (
    <main className='flex container gap-x-4'>
      <div className='flex-1 basis-1/3 py-4'>
        <CVForm onGeneratePdf={handleGeneratePdf} />
      </div>
      <div className='flex-1 basis-2/3'>
        <MyDocument cvData={cvData} />
      </div>
    </main>
  );
}
