import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import FoxcycleHome from './views/FoxcycleHome.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: FoxcycleHome,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      //redirect to login page
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
  ],
});
