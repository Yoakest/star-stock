import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductCreate from '@/views/ProductCreate.vue'
import ProductList from '@/views/ProductList.vue'
import ProductEdit from '@/views/ProductEdit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }, {
    path: '/product/create',
    name: 'product-create',
    component: ProductCreate
  },
  {
    path: '/product/list',
    name: 'product-list',
    component: ProductList
  }
  ,{
    path: '/product/edit/:id',
    name: 'product-edit',
    component: ProductEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
