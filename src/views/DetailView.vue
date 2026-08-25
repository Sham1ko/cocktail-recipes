<template>
  <main
    class="flex w-full grow flex-col items-center justify-center px-4 pb-16 pt-28"
  >
    <div class="mb-5 w-full max-w-4xl">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:border-amber-400/40 hover:bg-white/20"
        @click="goBack"
      >
        ← Back
      </button>
    </div>

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
      class="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl shadow-black/30 backdrop-blur-md md:grid-cols-2"
    >
      <div class="flex items-center justify-center p-6">
        <img
          :src="drink.strDrinkThumb"
          :alt="drink.strDrink"
          class="max-h-96 w-full rounded-xl border border-white/15 object-cover"
        />
      </div>

      <div class="p-6 text-left text-white/90">
        <h2 class="font-display mb-4 text-3xl font-bold text-white">
          {{ drink.strDrink }}
        </h2>

        <dl class="mb-5 space-y-1 text-sm">
          <div>
            <dt class="inline font-semibold text-white">Category:</dt>
            <dd class="inline text-white/80">{{ drink.strCategory }}</dd>
          </div>
          <div>
            <dt class="inline font-semibold text-white">Alcoholic:</dt>
            <dd class="inline text-white/80">{{ drink.strAlcoholic }}</dd>
          </div>
          <div>
            <dt class="inline font-semibold text-white">Glass type:</dt>
            <dd class="inline text-white/80">{{ drink.strGlass }}</dd>
          </div>
        </dl>

        <h3 class="mb-2 font-semibold text-white">🧪 Ingredients</h3>
        <ul class="mb-5 space-y-1 text-sm text-white/85">
          <li v-for="(ingredient, index) in ingredients" :key="index">
            <span class="text-amber-400">•</span>
            {{ ingredient.name }}
            <span v-if="ingredient.measure" class="text-white/60">
              — {{ ingredient.measure }}</span
            >
          </li>
        </ul>

        <h3 class="mb-2 font-semibold text-white">📋 Instructions</h3>
        <p class="text-sm leading-relaxed text-white/80">
          {{ drink.strInstructions }}
        </p>

        <div
          v-if="drink.strImageSource || drink.strImageAttribution"
          class="mt-5 border-t border-white/15 pt-3 text-xs text-white/60"
        >
          <p v-if="drink.strImageSource">
            📷 Image source:
            <a
              :href="drink.strImageSource"
              target="_blank"
              rel="noopener noreferrer"
              class="text-amber-300 underline underline-offset-2 hover:text-amber-200"
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
import { useRoute, useRouter } from "vue-router";
import { useCocktail } from "@/composables/useCocktail";

const route = useRoute();
const router = useRouter();
const { drink, isLoading, errorMessage, load } = useCocktail();

function goBack() {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push({ name: "home" });
  }
}

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
