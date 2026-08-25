<script setup>
import CustomHeader from "@/components/CustomHeader.vue";
</script>

<template>
  <div class="flex h-full flex-col">
    <CustomHeader />
    <RouterView v-slot="{ Component }">
      <KeepAlive include="HomeView">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
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
