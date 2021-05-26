import Vue from 'vue';
import VueRouter from 'vue-router';

// 懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Me = () => import('views/me/Me')
const Details = () => import('views/details/Details')

// 1.安装插件
Vue.use(VueRouter);

// 2.创建路由对象router
const routes = [
  {
    // 重定向
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    // 指定的组件
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/me',
    component: Me
  },
  {
    path: '/details/:id',
    component: Details
  },
];

const router = new VueRouter({
  routes,
  // url模式
  mode: 'history',
});

// 3.导出到main.js，进行挂载
export default router;
