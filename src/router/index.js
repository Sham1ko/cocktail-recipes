import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/cocktail-recipes/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { title: "Cocktail Recipes — Search Drinks" },
    },
    {
      path: "/cocktail-recipes/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: { title: "About — Cocktail Recipes" },
    },
    {
      path: "/cocktail-recipes/favorites",
      name: "favorites",
      component: () => import("../views/FavoritesView.vue"),
      meta: { title: "Favorites — Cocktail Recipes" },
    },
    {
      path: "/cocktail-recipes/explore",
      name: "explore",
      component: () => import("../views/ExploreView.vue"),
      meta: { title: "Explore — Cocktail Recipes" },
    },
    {
      path: "/cocktail-recipes/:id",
      name: "details",
      component: () => import("../views/DetailView.vue"),
    },
  ],
});

router.afterEach((to) => {
  document.title = to.meta.title ?? "Cocktail Recipes";
});

export default router;
