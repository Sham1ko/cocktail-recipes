<template>
  <RouterLink
    :to="{ name: 'details', params: { id: drink.idDrink } }"
    class="group relative block overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-lg shadow-black/30 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/15"
  >
    <img
      :src="drink.strDrinkThumb"
      :alt="drink.strDrink"
      loading="lazy"
      class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
    />
    <FavoriteButton :drink="drink" />
    <div class="p-4">
      <h3 class="truncate font-display text-lg font-semibold text-white">
        {{ drink.strDrink }}
      </h3>
    </div>
  </RouterLink>
</template>

<script setup>
import FavoriteButton from "@/components/FavoriteButton.vue";

defineProps({
  drink: { type: Object, required: true },
});
</script>
