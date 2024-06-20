import Vue from 'vue'
import VueRouter from 'vue-router'

import DashBoard from '@/views/DashBoard.vue'
import GridSystem from '@/views/GridSystem.vue'
import GridListPage from '@/views/GridListPage.vue'
import Breakpoints from '@/views/Breakpoints.vue'
import Typography from '@/views/Typography.vue'
import Table from '@/views/Table.vue'
import Forms from '@/views/Forms.vue'
import Buttons from '@/views/Buttons.vue'
import Icons from '@/views/Icons.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: 'Dashboard',
    component: DashBoard
  },
  {
    path: "/grid-system",
    name: 'GridSystem',
    component: GridSystem
  },
  {
    path: "/grid-list-page",
    name: 'GridListPage',
    component: GridListPage
  },
  {
    path: "/breakpoints",
    name: 'Breakpoints',
    component: Breakpoints
  },
  {
    path: "/typography",
    name: 'Typography',
    component: Typography
  },
  {
    path: "/table",
    name: 'table',
    component: Table
  },
  {
    path: "/forms",
    name: 'forms',
    component: Forms
  },
  {
    path: "/buttons",
    name: 'buttons',
    component: Buttons
  },
  {
    path: "/icons",
    name: 'icons',
    component: Icons
  },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
