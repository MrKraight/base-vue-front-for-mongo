import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "news",
    component: () => import("@/views/NewsView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("@/views/RegistrationView.vue"),
    meta: { requiresUnauth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: { requiresUnauth: true },
  }
];

const router = createRouter({
  history:  createWebHistory(),
  routes,
});

import { useAuthStore } from '@/stores/authStore.js';

router.beforeEach((to, from, next) => {
  const authService = useAuthStore(); 
  const isAuthenticated = authService.isActiveUser

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresUnauth && isAuthenticated) {
    next('/');
  } else {
    if(to.meta.requresAdminOrOperator && authService.user.role == 'client')
      next('/');
    next();
  }
});

export default router;
