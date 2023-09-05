import { FormValues } from "@/components/CVForm";

const initValues: FormValues = {
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
  skills: [
    {
      description: '使用 Javascript（ES6）/ Typescript 进行前端开发，并且熟练掌握以下框架',
      content:
        'React 通用框架：Next / Taro / Umi / RN\nReact 状态管理：Zustand / Jotai / Redux Toolkit\nReact 组件库：Radix / Ant Design / shadcn/ui\nReact 常用库：React Query / React-hook-form\nRN常用库：React-native-navigation / React-native-reanimated / Tamagui',
    },
    {
      description: '熟练使用 CSS3 以及周边工具 ',
      content: '样式库：Tailwind / Panda Css\n解决方案：CSS Module\n预处理器：Less / PostCSS',
    },
    {
      description: '掌握通用的前端工程化以及构建工具',
      content: '使用 Webpack / Vite 完成Web 应用打包以及对应的前端性能优化的经验。\nPrettier / ESLint 管理编码风格标准。',
    },
    {
      description: '熟练使用Taro / 微信小程序原生语法开发小程序',
    },
    {
      description: '熟练使用Git进行版本控制和代码托管，熟悉Git flow',
    },
  ],
};
export default initValues