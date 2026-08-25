<template>
  <main class="flex w-full grow flex-col items-center px-4 pb-16 pt-28">
    <div class="mb-8 text-center">
      <h1
        class="font-display mb-2 text-4xl font-bold tracking-wide text-white drop-shadow-lg sm:text-5xl"
      >
        🧭 Explore Drinks
      </h1>
      <p class="text-white/70">
        Browse the cocktail cabinet — mix and match the chips below.
      </p>
    </div>

    <section
      aria-label="Explore filters"
      class="w-full max-w-6xl rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl shadow-black/30 backdrop-blur-md sm:p-6"
    >
      <div
        v-if="!areOptionsLoading"
        class="mb-4 flex items-center justify-between gap-4"
      >
        <p class="text-sm font-semibold uppercase tracking-wider text-white/70">
          Filters
        </p>
        <button
          v-if="hasCustomSelection"
          type="button"
          class="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80 transition hover:border-amber-400/60 hover:text-amber-400"
          @click="resetFilters"
        >
          ✕ Reset
        </button>
      </div>

      <div v-if="areOptionsLoading" class="space-y-5" aria-hidden="true">
        <div v-for="n in 3" :key="n" class="space-y-2">
          <div class="h-3 w-24 animate-pulse rounded bg-white/15"></div>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="m in n + 3"
              :key="m"
              class="h-8 animate-pulse rounded-full bg-white/10"
              :style="{ width: `${44 + ((n * m * 13) % 90)}px` }"
            ></div>
          </div>
        </div>
      </div>

      <div v-else class="space-y-5">
        <div v-for="group in CHIP_GROUPS" :key="group.key">
          <h2
            class="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60"
          >
            {{ group.label }}
          </h2>
          <div
            class="flex flex-wrap gap-2"
            role="group"
            :aria-label="group.label"
          >
            <button
              v-for="label in options[group.key]"
              :key="label"
              type="button"
              :aria-pressed="selected[group.key] === label"
              class="rounded-full border px-4 py-1.5 text-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              :class="
                selected[group.key] === label
                  ? 'border-amber-400 bg-amber-400 font-semibold text-gray-950'
                  : 'border-white/15 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white'
              "
              @click="toggleChip(group.key, label)"
            >
              {{ label }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <div
      v-if="errorMessage"
      class="mt-6 flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 rounded-xl border border-red-400/30 bg-red-500/20 px-4 py-3 text-red-100 backdrop-blur"
      role="alert"
    >
      <span>{{ errorMessage }}</span>
      <button
        type="button"
        class="rounded-lg bg-red-500/40 px-3 py-1.5 text-sm font-semibold transition hover:bg-red-500/60"
        @click="retry"
      >
        🔁 Retry
      </button>
    </div>
    <p
      v-else-if="results.length > 0"
      class="mt-6 text-sm text-white/60 transition-opacity duration-300"
      :class="{ 'opacity-0': isLoading }"
    >
      {{ results.length }} {{ results.length === 1 ? "drink" : "drinks" }}
    </p>

    <div
      v-if="!errorMessage && isLoading && results.length === 0"
      class="mt-12 flex flex-col items-center gap-3"
      role="status"
    >
      <span
        class="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-amber-400"
        aria-hidden="true"
      ></span>
      <span class="sr-only">Loading cocktails</span>
    </div>
    <div
      v-else-if="!errorMessage && !areOptionsLoading && results.length === 0"
      class="mt-6 w-full max-w-xl rounded-xl border border-amber-400/30 bg-amber-500/15 px-6 py-5 text-center text-amber-100 backdrop-blur"
    >
      😕 Nothing matches this combination. Try removing a chip.
    </div>
    <div
      v-else-if="results.length > 0"
      class="explore-grid mt-8 grid w-full max-w-6xl grid-cols-1 gap-5 transition-opacity duration-300 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      :class="{ 'pointer-events-none opacity-50': isLoading }"
    >
      <CocktailCard v-for="item in results" :key="item.idDrink" :drink="item" />
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CocktailCard from "@/components/CocktailCard.vue";
import { useExplore } from "@/composables/useExplore";

const CHIP_GROUPS = [
  { key: "category", label: "Categories" },
  { key: "glass", label: "Glasses" },
  { key: "alcohol", label: "Alcohol" },
];

// The route query is the single source of truth: chips only rewrite the
// URL, and the watcher below turns any query into data.
const QUERY_KEYS = { category: "cat", glass: "glass", alcohol: "alc" };

const route = useRoute();
const router = useRouter();
const {
  options,
  areOptionsLoading,
  selected,
  results,
  isLoading,
  errorMessage,
  DEFAULT_SELECTION,
  isSameSelection,
  loadOptionsOnce,
  applySelection,
} = useExplore();

const hasCustomSelection = computed(
  () => !isSameSelection(selected.value, DEFAULT_SELECTION),
);

function isValidValue(group, value) {
  return typeof value === "string" && options.value[group].includes(value);
}

function selectionFromQuery(query) {
  // Unknown or hand-edited values are dropped; the preset fills the rest.
  return {
    category: isValidValue("category", query.cat) ? query.cat : null,
    glass: isValidValue("glass", query.glass) ? query.glass : null,
    alcohol: isValidValue("alcohol", query.alc) ? query.alc : null,
  };
}

function queryFromSelection(selection) {
  const query = {};
  for (const [group, key] of Object.entries(QUERY_KEYS)) {
    if (selection[group]) query[key] = selection[group];
  }
  return query;
}

function syncUrl(selection) {
  const target = queryFromSelection(selection);
  const current = queryFromSelection(selectionFromQuery(route.query));
  if (JSON.stringify(target) !== JSON.stringify(current)) {
    router.replace({ query: target });
  }
}

async function runForCurrentQuery() {
  if (route.name !== "explore") return;

  try {
    await loadOptionsOnce();
  } catch {
    errorMessage.value =
      "Could not load the filters. Check your connection and try again.";
    return;
  }

  const fromQuery = selectionFromQuery(route.query);
  const hasFreshResults = results.value.length > 0 || isLoading.value;

  // Returning to the page with an unchanged selection: keep cached data.
  if (isSameSelection(fromQuery, selected.value) && hasFreshResults) {
    syncUrl(fromQuery);
    return;
  }

  await applySelection(fromQuery);
  syncUrl(selected.value);
}

function setSelection(next) {
  router.replace({ query: queryFromSelection(next) });
}

function toggleChip(group, label) {
  const next = { ...selected.value };
  next[group] = next[group] === label ? null : label;
  setSelection(next);
}

function resetFilters() {
  setSelection({ ...DEFAULT_SELECTION });
}

function retry() {
  void runForCurrentQuery();
}

onMounted(() => {
  void runForCurrentQuery();
});

watch(
  () => route.query,
  () => {
    void runForCurrentQuery();
  },
);
</script>

<style scoped>
/* Soft staggered entrance for freshly loaded cards. */
.explore-grid > * {
  animation: card-in 0.4s ease backwards;
}
.explore-grid > *:nth-child(2) {
  animation-delay: 0.05s;
}
.explore-grid > *:nth-child(3) {
  animation-delay: 0.1s;
}
.explore-grid > *:nth-child(4) {
  animation-delay: 0.15s;
}
.explore-grid > *:nth-child(5) {
  animation-delay: 0.2s;
}
.explore-grid > *:nth-child(n + 6) {
  animation-delay: 0.25s;
}
@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .explore-grid > * {
    animation: none;
  }
}
</style>
