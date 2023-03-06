import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: import('../views/Home.vue'),
    },
    {
        path: '/member',
        name: 'member',
        component: import('../views/Member.vue'),
    },
    {
        path: '/schedual',
        name: 'schedual',
        component: import('../views/Schedual.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
