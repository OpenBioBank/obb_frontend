import { createRouter, createWebHistory } from 'vue-router'
import Wallet from '../views/Wallet.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    }
  ]
})

export default router
