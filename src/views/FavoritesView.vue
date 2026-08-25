<template>
  <main class="flex w-full grow flex-col items-center px-4 pb-16 pt-28">
    <div v-if="favorites.length" class="mb-8 text-center">
      <h1
        class="font-display text-4xl font-bold tracking-wide text-white drop-shadow-lg sm:text-5xl"
      >
        ❤️ Your Favorites
      </h1>
      <p class="mt-2 text-white/70">
        {{ count }}
        {{ count === 1 ? "cocktail" : "cocktails" }} saved for later
      </p>
    </div>

    <div
      v-if="favorites.length"
      class="grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <CocktailCard
        v-for="item in favorites"
        :key="item.idDrink"
        :drink="item"
      />
    </div>

    <div
      v-else
      class="w-full max-w-xl rounded-2xl border border-white/15 bg-white/10 p-10 text-center shadow-xl shadow-black/30 backdrop-blur-md"
    >
      <p class="mb-3 text-5xl" aria-hidden="true">💔</p>
      <h1
        class="font-display mb-2 text-2xl font-bold tracking-wide text-white sm:text-3xl"
      >
        No favorites yet
      </h1>
      <p class="mb-6 text-white/70">
        Tap the ♥ on any cocktail to keep it here for your next mix.
      </p>
      <button
        type="button"
        class="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-400"
        @click="router.push({ name: 'home' })"
      >
        🔍 Find cocktails
      </button>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import CocktailCard from "@/components/CocktailCard.vue";
import { useFavorites } from "@/composables/useFavorites";

const router = useRouter();
const { favorites } = useFavorites();

const count = computed(() => favorites.value.length);
</script>
