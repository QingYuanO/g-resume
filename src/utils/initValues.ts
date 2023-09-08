import { ResumeSchemaType } from "@/components/ResumeForm/formSchema";

const initValues: ResumeSchemaType = {
  baseInfo: {
    name: "陈守园",
    job: "前端开发工程师",
    jobAddress: "深圳",
    phone: "13933332066",
    email: "qingyuano@foxmail.com",
    birthday: "1998-02",
    weChat: "123",
    introduce:
      "四年前端开发经验，对 React 以及周边⽣态系统有⽐较深⼊的了解，拥有丰富的实战经验，对前端开发领域拥有极⼤的热情与兴趣，喜欢探索未知。",
    customUrls: [
      { name: "Github", url: "https://github.com/chen-shouyuan" },
      { name: "掘金", url: "https://github.com/QingYuanO" },
    ],
    hobby: ["阅读", "爬山", "跑步", "骑行"],
    certificate: ["计算机C语言二级"],
  },

  workExperience: [
    {
      company: "深圳瑞赛网络科技有限公司",
      jobName: "前端开发工程师",
      position: "深圳",
      rangeDate: "2021/07 - 至今",
      projects: [
        {
          name: "爱文集",
          description:
            "爱文集是一款集阅读/收集文章、推广植入、获取客户线索等功能的综合性文章营销小程序工具。",
          content: `使用 Taro 以及 Typescript 作为开发框架和语言。\n使用 Tailwind作为样式解决方案。\n基于事件代理实现简易编辑器。\n基于此项目衍生出一个高度可用的Taro模板，集成常用功能。`,
        },
        {
          name: "基于⻛控系统的⼀系列管理中后台",
          description:
            "公司的主营项⽬，已经迭代5年，基于此系统，搭建了⼀系列定制化的中后台，项⽬使⽤React （Class组件），Redux。",
          content:
            "实现⾼度定制化Table组件，极⼤简化CRUD表格⻚⾯\n实现配置⻚⾯功能，配置实现表格⻚、详情⻚，减少重复⼯作\n通过React-Pdf实现动态PDF⽣成报表",
        },
      ],
    },
    {
      company: "深圳市欧克互动科技有限公司",
      jobName: "前端开发工程师",
      position: "深圳",
      rangeDate: "2020/08 - 2021/07",
      projects: [
        {
          name: "菜菜到家电商系统",
          description:
            "菜菜到家是⼀整套电商系统，包含⼩程序、ios、android平台渠道以及相应的后台管理。",
          content: `使⽤微信⼩程序原⽣语法并搭配vant weapp开发⼩程序版本。\n使⽤React Native并搭配Typescript 开发双端，主要使⽤react-native-navigation、react-native-elements、expo。\n使⽤React以及antd搭建后台管理`,
        },
        {
          name: "资产管理app",
          description:
            "该项⽬主要的需求是完成⼀个资产管理的 APP ，主要⽤于管理甲⽅内部的各种资产。",
          content: "使⽤ Expo 进⾏开发\n独⽴完成全过程",
        },
      ],
    },
    {
      company: "⼴西盛源⾏电⼦信息股份有限公司",
      jobName: "前端开发工程师",
      position: "⼴西柳州",
      rangeDate: "2019/07 - 2020/06",
      projects: [
        {
          name: "东⻛⻛⾏移动⻔⼾",
          description:
            "项⽬是⼀个混合App，主要业务是实现⼀个移动端的⻋辆客服中⼼系统，对⻋主的来电进⾏处理。 使⽤的技术主要有 jQuery、Bootstrap，我的主要⼯作是编写响应式移动端⻚⾯。",
        },
      ],
    },
  ],
  skills: [
    {
      description:
        "使用 Javascript（ES6）/ Typescript 进行前端开发，并且熟练掌握以下框架",
      content:
        "React 通用框架：Next / Taro / Umi / RN\nReact 状态管理：Zustand / Jotai / Redux Toolkit\nReact 组件库：Radix / Ant Design / shadcn/ui\nReact 常用库：React Query / React-hook-form\nRN常用库：React-native-navigation / React-native-reanimated / Tamagui",
    },
    {
      description: "熟练使用 CSS3 以及周边工具 ",
      content:
        "样式库：Tailwind / Panda Css\n解决方案：CSS Module\n预处理器：Less / PostCSS",
    },
    {
      description: "掌握通用的前端工程化以及构建工具",
      content:
        "使用 Webpack / Vite 完成Web 应用打包以及对应的前端性能优化的经验。\nPrettier / ESLint 管理编码风格标准。",
    },
    {
      description: "熟练使用Taro / 微信小程序原生语法开发小程序",
    },
    {
      description: "熟练使用Git进行版本控制和代码托管，熟悉Git flow",
    },
  ],
  education: [
    {
      school: "桂林电子科技大学信息科技学院",
      level: "本科",
      major: "软件工程",
      rangeDate: "2016/09 - 2020/07",
    },
  ],
};
export default initValues;
