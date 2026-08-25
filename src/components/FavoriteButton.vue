<template>
  <button
    type="button"
    class="inline-flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md transition duration-200 hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none active:scale-90"
    :class="[floating ? 'absolute top-3 right-3 z-10 p-2' : 'shrink-0 p-2.5']"
    :aria-label="active ? 'Remove from favorites' : 'Add to favorites'"
    :aria-pressed="active"
    @click.stop.prevent="toggleFavorite(drink)"
  >
    <svg
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="transition duration-200"
      :class="[
        floating ? 'h-5 w-5' : 'h-6 w-6',
        active ? 'scale-110 text-red-500' : 'text-white/80 hover:text-white',
      ]"
      aria-hidden="true"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        :fill="active ? 'currentColor' : 'none'"
        stroke="currentColor"
      />
    </svg>
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useFavorites } from "@/composables/useFavorites";

const props = defineProps({
  drink: { type: Object, required: true },
  floating: { type: Boolean, default: true },
});

const { isFavorite, toggleFavorite } = useFavorites();

const active = computed(() => isFavorite(props.drink.idDrink));
</script>
