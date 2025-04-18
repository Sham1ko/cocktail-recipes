<script setup>
import { RouterView } from "vue-router";
import CustomHeader from "@/components/CustomHeader.vue";
</script>

<template>
  <div class="d-flex flex-column h-100">
    <custom-header />
    <RouterView />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
