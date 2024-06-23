import Vue from 'vue'
import VueRouter from 'vue-router'

import DashBoard from '@/views/DashBoard.vue'
import Forms from '@/views/Forms.vue'
import Buttons from '@/views/Buttons.vue'
import Inquiry from "@/views/InquiryView.vue";
import EstimateManagement from "@/views/EstimateManagement.vue";
import CustomerCode from "@/views/CustomerCode.vue";
import SupplierCode from "@/views/SupplierCode.vue";
import ShipCode from "@/views/ShipCode.vue";
import EstimateListGrouped from "@/views/EstimateListGrouped.vue";
import Kanban from "@/views/Kanban.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: 'Dashboard',
    component: DashBoard
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
    path: "/inquiry",
    name: 'inquiry',
    component: Inquiry
  },
  {
    path: "/estimateManagement",
    name: 'estimateManagement',
    component: EstimateManagement
  },
  {
    path: "/customer-code",
    name: 'customer-code',
    component: CustomerCode
  },
  {
    path: "/supplier-code",
    name: 'supplier-code',
    component: SupplierCode
  },
  {
    path: "/ship-code",
    name: 'ship-code',
    component: ShipCode
  },
  {
    path: "/estimate-grouped",
    name: 'estimate-grouped',
    component: EstimateListGrouped
  },
  {
    path: "/kanban",
    name: 'kanban',
    component: Kanban
  },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
