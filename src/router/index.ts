import { createRouter, createWebHistory } from 'vue-router'
import Wallet from '../views/Wallet.vue'
import Home from '@/views/home/index.vue'
import Supplier from '@/views/supplier/index.vue'
import Buyer from '@/views/buyer/index.vue'
import BuyerAll from '@/views/buyer/all.vue'
import BuyerDetails from '@/views/buyer/details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: Supplier
    },
    {
      path: '/buyer',
      name: 'buyer',
      component: Buyer
    },
    {
      path: '/buyer/all',
      name: 'BuyerAll',
      component: BuyerAll
    },
    {
      path: '/buyer/details',
      name: 'BuyerDetails',
      component: BuyerDetails
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    }
  ]
})

export default router
