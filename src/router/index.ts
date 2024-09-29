import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/IndexHome.vue'
import YearView from '../views/IndexYear.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/year',
        name: 'year',
        component: YearView
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
