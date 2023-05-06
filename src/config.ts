const config: any = {
  versions: [
    {
      name: '1.x',
      link: '/1x/'
    }
  ],
  header: [
    {
      name: 'intro,theme,start',
      cName: '指南',
      path: '/guide/intro'
    }, {
      name: 'component',
      cName: '组件',
      path: '/'
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
          }, {
            "name": "start",
            "cName": "快速上手",
            "show": true
          }, {
            "name": "color",
            "cName": "色彩",
            "show": true
          }, {
            "name": "theme",
            "cName": "主题定制",
            "show": true
          }, {
            "name": "i18n",
            "cName": "国际化",
            "show": true
          }, {
            "name": "contributing",
            "cName": "开发者指南",
            "show": true
          }
        ]
      }
    ]
  }
};

export default config;
