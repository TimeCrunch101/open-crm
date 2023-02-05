// import { nextTick } from "vue";
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
      path: "/admin",
      name: "Admin",
      component: () => import("../views/Admin.vue"),
      beforeEnter: () => {},
    },
    {
      path: "/clients",
      name: "Clients",
      component: () => import("../views/Clients.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/client/:clientID",
      name: "Client",
      component: () => import("../views/ClientView.vue"),
    },
    {
      path: "/create/ticket",
      name: "Create Ticket",
      component: () => import("../views/CreateTicket.vue"),
    },
    {
      path: "/create/project",
      name: "Create Project",
      component: () => import("../views/CreateProject.vue"),
    },
    {
      path: "/my/workspace",
      name: "My Workspace",
      component: () => import("../views/MyWorkspace.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const isValid = await useAuthStore().validate();
  if (to.name !== "Login" && isValid === false) next({ name: "Login" });
  else next();
});

export default router;
