/**
 * @file 
 * @author wuyupeng
 */

import Vue from 'vue';
// import VueRouter from 'vue-router';
import VueRouter from './vue-fake-router';
import Main from './pages/main.vue';
import Setting from './pages/setting.vue';
import {reachBottomNotify, functionalTool} from './utils';

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
    }
];

const router = new VueRouter({
    routes
});

const vm = new Vue({
    el: '#app',
    router,
    render: h => h('router-view')
});
