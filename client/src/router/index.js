import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/users",
      name: "Users",
      component: () => import("../views/Users.vue"),
      beforeEnter: () => {},
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const isValid = await useAuthStore().validate()
  if (to.name !== "Login" && isValid === false) next({name: 'Login'})
  else next()
})



export default router;

