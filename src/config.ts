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
      path: '/intro'
    },
    {
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
          }
        ]
      }
    ]
  }
};

export default config;
