import { ref } from "vue";
import {
  getAlcoholOptions,
  getCategoryOptions,
  getFilteredCocktails,
  getGlassOptions,
} from "@/api/cocktailDb";

const FILTER_GROUPS = ["category", "glass", "alcohol"];

// Applied whenever no filter group is active (first visit without query
// params, or after clearing every chip): the page never sits empty.
export const DEFAULT_SELECTION = Object.freeze({
  category: "Cocktail",
  glass: null,
  alcohol: null,
});

// Module-scope state: every component using useExplore() shares it,
// mirroring the pattern in useCocktails.js and useFavorites.js.
const options = ref({ category: [], glass: [], alcohol: [] });
const areOptionsLoading = ref(false);
const selected = ref({ category: null, glass: null, alcohol: null });
const results = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");

let optionsPromise = null;
let requestSeq = 0;

function cloneSelection(selection) {
  return {
    category: selection.category ?? null,
    glass: selection.glass ?? null,
    alcohol: selection.alcohol ?? null,
  };
}

export function isSameSelection(a, b) {
  return FILTER_GROUPS.every(
    (group) => (a?.[group] ?? null) === (b?.[group] ?? null),
  );
}

function hasAnySelection(selection) {
  return FILTER_GROUPS.some((group) => selection[group]);
}

// Fetches the three chip lists once per session; a failure clears the
// cached promise so the next attempt can retry.
function loadOptionsOnce() {
  if (!optionsPromise) {
    areOptionsLoading.value = true;
    optionsPromise = Promise.all([
      getCategoryOptions(),
      getGlassOptions(),
      getAlcoholOptions(),
    ])
      .then(([category, glass, alcohol]) => {
        options.value = { category, glass, alcohol };
      })
      .catch((error) => {
        optionsPromise = null;
        throw error;
      })
      .finally(() => {
        areOptionsLoading.value = false;
      });
  }
  return optionsPromise;
}

async function applySelection(nextSelection) {
  const selection = hasAnySelection(nextSelection)
    ? cloneSelection(nextSelection)
    : cloneSelection(DEFAULT_SELECTION);

  // Assigned synchronously so the UI reflects the choice immediately,
  // before the network round-trips finish.
  selected.value = selection;
  errorMessage.value = "";
  isLoading.value = true;

  const seq = ++requestSeq;
  const activeGroups = FILTER_GROUPS.filter((group) => selection[group]);

  try {
    const lists = await Promise.all(
      activeGroups.map((group) =>
        getFilteredCocktails(group, selection[group]),
      ),
    );

    // A newer selection superseded this request — discard it.
    if (seq !== requestSeq) return;

    // Intersect by idDrink, seeding from the shortest response.
    lists.sort((a, b) => a.length - b.length);
    let matched = lists[0];
    for (const list of lists.slice(1)) {
      const ids = new Set(list.map((drink) => drink.idDrink));
      matched = matched.filter((drink) => ids.has(drink.idDrink));
    }

    results.value = matched;
  } catch {
    if (seq !== requestSeq) return;
    results.value = [];
    errorMessage.value =
      "Something went wrong while filtering. Please try again later.";
  } finally {
    if (seq === requestSeq) {
      isLoading.value = false;
    }
  }
}

export function useExplore() {
  return {
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
  };
}
