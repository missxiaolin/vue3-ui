const config: any = {
  versions: [
    {
      name: '1.x',
      link: '/1x/'
    }
  ],
  header: [
    {
      name: 'guide',
      cName: '指南',
      path: '/guide/intro'
    },
    {
      name: 'component',
      cName: '组件',
      path: '/components/layout'
    }
  ],
  docs: {
    baseUrl: '/guide/',
    nav: [
      {
        name: '指南',
        enName: 'guide',
        children: [
          {
            name: 'intro',
            cName: '介绍',
            show: true
          },
          {
            name: 'start',
            cName: '快速上手',
            show: true
          },
          {
            name: 'color',
            cName: '色彩',
            show: true
          },
          {
            name: 'theme',
            cName: '主题定制',
            show: true
          },
          {
            name: 'i18n',
            cName: '国际化',
            show: true
          },
          {
            name: 'contributing',
            cName: '开发者指南',
            show: true
          }
        ]
      }
    ]
  },
  components: {
    baseUrl: '/components/',
    nav: [
      {
        name: '基础组件',
        enName: 'base',
        children: [
          {
            name: 'Button',
            type: 'component',
            cName: '按钮',
            desc: '按钮',
            show: true,
            author: 'lin',
            progress: '100%'
          }, {
            "name": "Link",
            "type": "component",
            "cName": "链接",
            "desc": "文字超链接",
            "show": true,
            "author": "lin",
            "progress": "100%"
          }, {
            "name": "Ellipsis",
            "type": "component",
            "cName": "文本",
            "desc": "文本省略",
            "show": true,
            "author": "lin",
            "progress": "0%"
          }, {
            "name": "Icon",
            "type": "component",
            "cName": "图标",
            "desc": "",
            "show": true,
            "author": "lin",
            "progress": "100%"
          }
        ]
      },
      {
        name: '布局组件',
        enName: 'layout',
        children: [
          {
            name: 'Layout',
            type: 'component',
            cName: '布局组件',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Grid',
            type: 'component',
            cName: '栅格',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          }
        ]
      }
    ]
  }
};

export default config;
