import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Index from '../view/index/index.vue';
import Main from '../view/main.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'main',
        component: Main,
    }, {
        path: '/index',
        name: 'index',
        component: Index,
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        console.log(to)
    }
});
router.afterEach((to, from) => {
    window.scrollTo(0, 0);
});
export default router;