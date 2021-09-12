import Vue, { AsyncComponent } from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '@/views/layout/Layout.vue';

const Login: AsyncComponent = () => import('@/views/login/login.vue');

const Course: AsyncComponent = () => import('@/views/course/index.vue');
const Plan: AsyncComponent = () => import('@/views/plan/index.vue');
const Record: AsyncComponent = () => import('@/views/record/index.vue');
const User: AsyncComponent = () => import('@/views/user/index.vue');
const Template: AsyncComponent = () => import('@/views/template/index.vue');

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/course',
      name: '选课',
      component: Layout,
      children: [
        {
          name: '选课',
          path: '/',
          component: Course,
        },
      ],
    },
    {
      path: '/plan',
      name: '计划',
      component: Layout,
      children: [
        {
          name: '计划',
          path: '/',
          component: Plan,
        },
      ],
    },
    {
      path: '/record',
      name: '记录',
      component: Layout,
      children: [
        {
          name: '记录',
          path: '/',
          component: Record,
        },
      ],
    },
    {
      path: '/user',
      name: '个人信息',
      component: Layout,
      children: [
        {
          name: '个人信息',
          path: '/',
          component: User,
        },
      ],
    },
    {
      path: '/template',
      name: 'TemplatePage',
      component: Template,
    },
    {
      path: '*',
      redirect: '/course',
    },
  ],
});
