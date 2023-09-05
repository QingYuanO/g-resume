'use client'
import CVForm, { FormValues } from '@/components/CVForm';
import MyDocument from '@/components/CVTemp/MyDocument';
import initValues from '@/utils/initValues';
import { useState } from 'react';



export default function Home() {
  const [cvData, setCvData] = useState<FormValues>(initValues);
  const handleGeneratePdf = (params: FormValues) => {
    setCvData(params);
  };
  return (
    <main className='grid grid-cols-3 md:grid-cols-6 container gap-x-4 relative'>
      <div className='col-span-3 md:col-span-3 relative'>
        <CVForm onGeneratePdf={handleGeneratePdf} />
      </div>
      <div className='col-span-3 md:col-span-3'>
        <MyDocument cvData={cvData} />
      </div>
    </main>
  );
}
