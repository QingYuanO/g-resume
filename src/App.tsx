import CVForm, { FormValues } from '@/components/CVForm';
import MyDocument from '@/components/CVTemp/MyDocument';
import { useState } from 'react';

export const defaultValues: FormValues = {
  name: '陈守园',
  job: '前端开发工程师',
  jobAddress: '深圳',
  phone: '13933332066',
  email: '123@qq.com',
  birthday: '1998-02',
  weChat: '123',
  introduce:
    '五年前端开发经验，三年大厂任职经验，对React以及周边生态系统有比较深入的了解，拥有丰富的实战经验，对前端开发领域拥有极大的热情与兴趣。',
  customUrls: [{ name: 'Github', url: 'https://github.com/chen-shouyuan' }],
  workExperience: [
    {
      id: new Date().getTime(),
      company: '深圳瑞赛网络科技有限公司',
      jobName: '前端开发工程师',
      position: '深圳',
      rangeDate: '2021-07 - 至今',
      projects: [
        {
          name: '爱文集',
          description: '爱文集是一款集阅读/收集文章、推广植入、获取客户线索等功能的综合性文章营销小程序工具。',
          content: `使用 Taro 以及 Typescript 作为开发框架和语言。\n使用 Tailwind作为样式解决方案。\n基于事件代理实现简易编辑器。\n基于此项目衍生出一个高度可用的Taro模板，集成常用功能。`,
        },
      ],
    },
  ],
};

export default function Home() {
  const [cvData, setCvData] = useState<FormValues>(defaultValues);
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
