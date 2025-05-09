import { createRouter, createWebHistory } from 'vue-router'

const HomeView    = () => import('@/views/HomeView.vue')
const AboutView   = () => import('@/views/AboutView.vue')
const StoreView   = () => import('@/views/StoreView.vue')
const ContactView = () => import('@/views/ContactView.vue')

const routes = [
  { path: '/',         name: 'Home',    component: HomeView },
  { path: '/about',    name: 'About',   component: AboutView },
  { path: '/store',    name: 'Store',   component: StoreView },
  { path: '/contact',  name: 'Contact', component: ContactView },
  // fallback на главную
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
