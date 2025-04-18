<template>
  <header class="navbar-wrapper">
    <nav class="navbar navbar-expand-lg navbar-dark container">
      <div class="container-fluid">
        <RouterLink to="/cocktail-recipes/" class="navbar-brand fw-bold">
          🍸 Cocktail Recipes
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/cocktail-recipes/" class="nav-link"
                >Home</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/cocktail-recipes/about" class="nav-link"
                >About</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.navbar-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}

.nav-link {
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #ffc107;
}
</style>
