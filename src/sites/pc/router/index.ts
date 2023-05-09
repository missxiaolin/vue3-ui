import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Index from '../view/index/index.vue';

import config from '../../../config';

const docsMds = import.meta.glob('/src/sites/pc/docs/*.md');
const componentsMds = import.meta.glob('/src/packages/components/**/docs/doc.md');
const modulesComponents: any = {};
const modulesDocs: any = {};
for (const path in docsMds) {
  const name = (/sites\/pc\/docs\/(.*).md/.exec(path) as any[])[1];
  modulesDocs[name] = docsMds[path];
}

for (const path in componentsMds) {
  const name = (/packages\/components\/(.*)\/docs\/doc.md/.exec(path) as any[])[1];
  modulesComponents[name] = componentsMds[path];
}

/**
 * @description 路由重构
 * @param navs 
 * @param type type 1: 组件类md ;  2: 指南类md
 */
const routeFormat = (navs: any = [], type = 1) => {
  // md 文件  集合
  const mdTypes: any = {
    1: modulesComponents,
    2: modulesDocs
  };
  // 获取
  const { baseUrl, nav } = navs;
  const navList: any = [];
  nav.forEach((item: any) => {
    item = {
      ...item,
      path: `${baseUrl}${item.enName}`,
      component: Index
    };
    const childrens: any = [];
    // 子组件
    (item.children || []).forEach((sitem: any) => {
      const name = sitem.name.toLowerCase();
      childrens.push({
        ...sitem,
        path: `${baseUrl}${name}`,
        component: mdTypes[type][name]
      });
    });

    item.children = childrens;
    navList.push(item);
  });

  return navList;
}

// 业务组件
export const guideNav: any = routeFormat(config.docs, 2);

// UI组件
export const componentsNavs: any = routeFormat(config.components);

// console.log('guideNav----', guideNav);
console.log('componentsNavs----', componentsNavs);

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/guide/intro'
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  ...guideNav,
  ...componentsNavs
];

routes.push({
  name: 'notFound',
  path: '/:path(.*)+',
  redirect: {
    name: '/'
  }
});

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    // console.log(to);
  }
});
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});
export default router;
