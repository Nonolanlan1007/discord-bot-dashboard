import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashAccess from "@/views/DashAccess.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/dash",
    name: "dash",
    component: DashAccess
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
