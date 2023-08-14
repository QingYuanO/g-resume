import CVForm, { FormValues } from '@/components/CVForm';
import MyDocument from '@/components/CVTemp/MyDocument';
import { useState } from 'react';

export default function Home() {
  const [cvData, setCvData] = useState<FormValues>({ name: '', job: '' });
  const handleGeneratePdf = (params: FormValues) => {
    setCvData(params);
  };
  return (
    <main className='flex container gap-x-4'>
      <div className='flex-1 py-4'>
        <CVForm onGeneratePdf={handleGeneratePdf} />
      </div>
      <div className='flex-1'>
        <MyDocument cvData={cvData} />
      </div>
    </main>
  );
}
