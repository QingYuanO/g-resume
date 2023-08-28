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
  introduce:
    '五年前端开发经验，三年大厂任职经验，对React以及周边生态系统有比较深入的了解，拥有丰富的实战经验，对前端开发领域拥有极大的热情与兴趣。',
  customUrls: [{ name: 'Github', url: 'https://github.com/chen-shouyuan' }],
};

export default function Home() {
  const [cvData, setCvData] = useState<FormValues>(defaultValues);
  const handleGeneratePdf = (params: FormValues) => {
    setCvData(params);
  };
  return (
    <main className='grid grid-cols-3 md:grid-cols-5 container gap-x-4 relative'>
      <div className='col-span-3 md:col-span-3 relative'>
        <CVForm onGeneratePdf={handleGeneratePdf} />
      </div>
      <div className='col-span-3 md:col-span-2'>
        <MyDocument cvData={cvData} />
      </div>
    </main>
  );
}
