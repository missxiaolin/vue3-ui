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
          },
          {
            name: 'Link',
            type: 'component',
            cName: '链接',
            desc: '文字超链接',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Ellipsis',
            type: 'component',
            cName: '文本',
            desc: '文本省略',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Icon',
            type: 'component',
            cName: '图标',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
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
          },
          {
            name: 'Space',
            type: 'component',
            cName: '间距',
            desc: '给组件之间提供统一的间距',
            show: true,
            author: 'lyc',
            progress: '100%'
          },
          {
            name: 'Divider',
            type: 'component',
            cName: '分割线',
            desc: '',
            show: true,
            author: 'lijuntao',
            progress: '100%'
          }
        ]
      },
      {
        name: '数据录入组件',
        enName: 'exhibition',
        children: [
          {
            name: 'Switch',
            type: 'component',
            cName: '开关',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          }
        ]
      },
      {
        name: '导航组件',
        enName: 'navigation',
        children: [
          {
            name: 'Sticky',
            type: 'component',
            cName: '粘性布局',
            desc: '',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'Anchor',
            type: 'component',
            cName: '锚点',
            desc: '锚点 anchor',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'BackTop',
            type: 'component',
            cName: '回到顶部',
            desc: '',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'Breadcrumb',
            type: 'component',
            cName: '面包屑',
            desc: '面包屑是辅助导航模式，用于识别⻚面在层次结构内的位置，并根据需要向上返回',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Loading-bar',
            type: 'component',
            cName: '加载条',
            desc: '',
            author: 'lin',
            show: true,
            progress: '100%'
          },
          {
            name: 'Page-header',
            type: 'component',
            cName: '页头',
            desc: '',
            author: 'lin',
            show: true,
            progress: '100%'
          },
          {
            name: 'Steps',
            type: 'component',
            cName: '步骤',
            desc: '',
            author: 'lin',
            show: true,
            progress: '100%'
          }
        ]
      },
      {
        name: '数据展示组件',
        enName: 'exhibition',
        children: [
          {
            name: 'Badge',
            type: 'component',
            cName: '徽标',
            desc: '按钮和图标上的数字或状态标记。',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'Empty',
            type: 'component',
            cName: '空状态',
            desc: '数据为空时候的展示状态',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Trend-arrow',
            type: 'component',
            cName: '趋势箭头',
            desc: '趋势箭头',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Pagination',
            type: 'component',
            cName: '分页',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Collapse',
            type: 'component',
            cName: '折叠面板',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Panel',
            type: 'component',
            cName: '卡片',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Statistic',
            type: 'component',
            cName: '统计数据',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Timeline',
            type: 'component',
            cName: '时间轴',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Tabs',
            type: 'component',
            cName: '标签页',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Progress',
            type: 'component',
            cName: '进度',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          }
        ]
      },
      {
        name: '反馈组件',
        children: [
          {
            name: 'Message',
            type: 'component',
            cName: ' 全局提示',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Tooltip',
            type: 'component',
            cName: '文字提示',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Dialog',
            type: 'component',
            cName: '对话框',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Drawer',
            type: 'component',
            cName: '抽屉',
            desc: '',
            show: true,
            author: '',
            progress: '100%'
          },
          {
            name: 'message-box',
            type: 'component',
            cName: '消息弹出框',
            desc: '',
            show: true,
            author: '',
            progress: '100%'
          },
          {
            name: 'Notification',
            type: 'component',
            cName: '通知提示框',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Dropdown',
            type: 'component',
            cName: '下拉菜单',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Popover',
            type: 'component',
            cName: '气泡卡片',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Popconfirm',
            type: 'component',
            cName: '气泡确认框',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Skeleton',
            type: 'component',
            cName: '骨架屏',
            desc: '在需要等待加载内容的位置设置一个骨架屏',
            show: true,
            author: 'lin',
            progress: '100%'
          }
        ]
      },
      {
        name: '展示组件',
        enName: 'exhibition',
        children: [
          {
            name: 'Overlay',
            type: 'component',
            cName: '遮罩',
            desc: '遮罩',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Watermark',
            type: 'component',
            cName: '水印',
            desc: '水印',
            show: true,
            author: 'lin',
            progress: '100%'
          },
          {
            name: 'Video',
            type: 'component',
            cName: '视频播放器',
            desc: '',
            show: true,
            author: 'lin',
            progress: '100%'
          }, {
            "name": "Avatar",
            "type": "component",
            "cName": "头像",
            "desc": "头像组件",
            "show": true,
            "author": "lin",
            "progress": "100%"
          },
        ]
      },
      {
        name: '工具组件',
        children: [
          {
            name: 'Scroll',
            type: 'component',
            cName: '滚动条',
            desc: '滚动条',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          }
        ]
      }
    ]
  }
};

export default config;
