<template>
  <main
    class="flex w-full grow flex-col items-center justify-center px-4 pb-16 pt-28 text-center"
  >
    <h1
      class="font-display mb-2 text-4xl font-bold tracking-wide text-white drop-shadow-lg sm:text-5xl"
    >
      Search Cocktail
    </h1>
    <p class="mb-8 text-white/70">
      Find your favorite drink or let luck choose for you 🍀
    </p>

    <div
      class="flex w-full max-w-xl flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-md sm:flex-row"
    >
      <div class="relative w-full sm:w-auto sm:flex-1">
        <input
          v-model="nameCocktail"
          type="text"
          placeholder="Enter a cocktail name..."
          class="w-full rounded-xl bg-white/95 px-4 py-3 pr-11 text-gray-900 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-amber-400"
          @keydown.enter="getData"
        />
        <button
          v-if="nameCocktail || hasSearched"
          type="button"
          class="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-600 transition hover:bg-gray-300 hover:text-gray-900"
          aria-label="Clear search"
          @click="clearSearch"
        >
          ✕
        </button>
      </div>
      <button
        type="button"
        :disabled="isLoading"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
        @click="getData"
      >
        <span
          v-if="isLoading"
          class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        ></span>
        🔍 Search
      </button>
      <button
        type="button"
        :disabled="isLoading"
        class="whitespace-nowrap rounded-xl bg-amber-400 px-5 py-3 font-semibold text-gray-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
        @click="randomCocktail"
      >
        🎲 Random
      </button>
    </div>

    <div
      v-if="errorMessage"
      class="mt-6 w-full max-w-xl rounded-xl border border-red-400/30 bg-red-500/20 px-4 py-3 text-red-100 backdrop-blur"
      role="alert"
    >
      {{ errorMessage }}
    </div>
    <div
      v-else-if="hasSearched && !isLoading && drinks.length === 0"
      class="mt-6 w-full max-w-xl rounded-xl border border-amber-400/30 bg-amber-500/15 px-4 py-3 text-amber-100 backdrop-blur"
      role="alert"
    >
      😕 Nothing found. Try another cocktail name.
    </div>

    <div
      v-if="drinks.length > 0"
      class="mt-10 grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <CocktailCard v-for="item in drinks" :key="item.idDrink" :drink="item" />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CocktailCard from "@/components/CocktailCard.vue";
import { getRandomCocktail } from "@/api/cocktailDb";
import { useCocktails } from "@/composables/useCocktails";

const router = useRouter();
const { drinks, isLoading, errorMessage, hasSearched, search, reset } =
  useCocktails();

const nameCocktail = ref("");

async function getData() {
  if (isLoading.value) return;
  await search(nameCocktail.value);
}

function clearSearch() {
  nameCocktail.value = "";
  reset();
}

async function randomCocktail() {
  reset();
  const randomDrink = await getRandomCocktail();
  router.push({ name: "details", params: { id: randomDrink.idDrink } });
}
</script>
