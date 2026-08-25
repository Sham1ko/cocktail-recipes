<template>
  <main
    class="flex w-full grow flex-col items-center justify-center px-4 pb-16 pt-28"
  >
    <div
      v-if="isLoading"
      class="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-amber-400"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>

    <div
      v-else-if="errorMessage"
      class="rounded-xl border border-red-400/30 bg-red-500/20 px-4 py-3 text-red-100 backdrop-blur"
      role="alert"
    >
      {{ errorMessage }}
    </div>

    <div
      v-else-if="drink"
      class="grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/40 md:grid-cols-2"
    >
      <div class="flex items-center justify-center p-6">
        <img
          :src="drink.strDrinkThumb"
          :alt="drink.strDrink"
          class="max-h-96 w-full rounded-xl border border-gray-200 object-cover"
        />
      </div>

      <div class="p-6 text-left text-gray-800">
        <h2 class="font-display mb-4 text-3xl font-bold text-gray-900">
          {{ drink.strDrink }}
        </h2>

        <dl class="mb-5 space-y-1 text-sm">
          <div>
            <dt class="inline font-semibold">Category:</dt>
            <dd class="inline">{{ drink.strCategory }}</dd>
          </div>
          <div>
            <dt class="inline font-semibold">Alcoholic:</dt>
            <dd class="inline">{{ drink.strAlcoholic }}</dd>
          </div>
          <div>
            <dt class="inline font-semibold">Glass type:</dt>
            <dd class="inline">{{ drink.strGlass }}</dd>
          </div>
        </dl>

        <h3 class="mb-2 font-semibold text-gray-900">🧪 Ingredients</h3>
        <ul class="mb-5 space-y-1 text-sm">
          <li v-for="(ingredient, index) in ingredients" :key="index">
            <span class="text-amber-600">•</span>
            {{ ingredient.name }}
            <span v-if="ingredient.measure" class="text-gray-500">
              — {{ ingredient.measure }}</span
            >
          </li>
        </ul>

        <h3 class="mb-2 font-semibold text-gray-900">📋 Instructions</h3>
        <p class="text-sm leading-relaxed text-gray-700">
          {{ drink.strInstructions }}
        </p>

        <div
          v-if="drink.strImageSource || drink.strImageAttribution"
          class="mt-5 border-t border-gray-200 pt-3 text-xs text-gray-500"
        >
          <p v-if="drink.strImageSource">
            📷 Image source:
            <a
              :href="drink.strImageSource"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 underline underline-offset-2 hover:text-blue-500"
              >{{ drink.strImageSource }}</a
            >
          </p>
          <p v-if="drink.strImageAttribution">
            📎 Attribution: {{ drink.strImageAttribution }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useCocktail } from "@/composables/useCocktail";

const route = useRoute();
const { drink, isLoading, errorMessage, load } = useCocktail();

const ingredients = computed(() => {
  if (!drink.value) return [];
  const list = [];

  for (let i = 1; i <= 15; i++) {
    const name = drink.value[`strIngredient${i}`];
    const measure = drink.value[`strMeasure${i}`];
    if (name) {
      list.push({ name, measure });
    }
  }

  return list;
});

watch(
  () => route.params.id,
  async (id) => {
    await load(id);
    if (drink.value) {
      document.title = `${drink.value.strDrink} — Cocktail Recipes`;
    }
  },
  { immediate: true },
);
</script>
