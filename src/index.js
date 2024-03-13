// import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";
import publicRoutes from "./public.js";
import privateRoutes from "./private.js";
import { $modalEmitter } from "@/events/modal/index.js";
import { $drawerEmitter } from "@/events/drawer/index.js";

const routes = [...publicRoutes, ...privateRoutes];

const router = new createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior() {
    document.querySelector("body").scrollIntoView({ behavior: "smooth" });
  },
});

// Before each
router.beforeEach((to, from, next) => {
  if (to.meta.public) {
    next();
  } else {
    if (localStorage.getItem("APP-token")) {
      next();
    } else {
      next({ name: "login" });
    }
  }
});

// After each
const default_title = "Page Title";
router.afterEach((to, from) => {
  // Vue.nextTick(() => {
  document.title = to.meta.title || default_title;
  // });
  $modalEmitter.emit("modal-close");
  $drawerEmitter.emit("drawer-close");
});

export default router;
