import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/cocktail-recipes/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/cocktail-recipes/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/cocktail-recipes/:id",
      name: "details",
      component: () => import("../views/DetailView.vue"),
    },
  ],
});

export default router;
