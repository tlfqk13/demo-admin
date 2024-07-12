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
import MakeInquiry from "@/views/MakeInquiry.vue";
import EmailForm from "@/views/EmailForm.vue";
import AuthSuccess from "@/views/AuthSuccess.vue";
import Profile from "@/views/Profile.vue";
import EstimateDetail from "@/views/EstimateDetail.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/dashboard",
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
    path: "/make-inquiry",
    name: 'make-inquiry',
    component: MakeInquiry
  },
  {
    path: "/send-email",
    name: 'send-email',
    component: EmailForm
  },
  {
    path: "/auth/success", // 새로운 경로 추가
    name: 'auth-success',
    component: AuthSuccess
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/estimateManagement/:estimateId',
    name: 'estimate-detail',
    component: EstimateDetail
  }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
