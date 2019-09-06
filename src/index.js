/**
 * @file 
 * @author wuyupeng
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueRouter from './vue-fake-router';
import Main from './pages/main.vue';
import Setting from './pages/setting.vue';
import Login from './pages/login.vue';
import { reachBottomNotify, functionalTool } from './utils';

Vue.use(VueRouter);
Vue.use(reachBottomNotify);
Vue.use(functionalTool);

const routes = [
    {
        path: '/page',
        component: Main
    },
    {
        path: '/setting',
        component: Setting
    },
    {
        path: '/login',
        comments: Login
    }
];

const router = new VueRouter({
    routes
});

// router.beforeEach((to, from, next) => {
//     console.log('beforeEach:::', to, from, next);
//     if(!/uid/.test(document.cookie) && to.path !=='/page/login'){
//         next('/page/login');
//     }else{
//         next()
//     }
// })

const vm = new Vue({
    el: '#app',
    router,
    render: h => h('router-view')
});
