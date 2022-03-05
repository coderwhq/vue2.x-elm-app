import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// import Goods from '../views/goods/Goods';
// import Ratings from '../views/ratings/Ratings';
// import Seller from '../views/seller/Seller';

//懒加载
const Goods = () => import('../views/goods/Goods');
const Ratings = () => import('../views/ratings/Ratings');
const Seller = () => import('../views/seller/Seller');

const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router;