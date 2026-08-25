import { computed, ref } from "vue";

const STORAGE_KEY = "cocktail-recipes:favorites-v1";

function isValidEntry(entry) {
  return Boolean(entry && typeof entry === "object" && entry.idDrink);
}

function toSnapshot(drink) {
  return {
    idDrink: drink.idDrink,
    strDrink: drink.strDrink,
    strDrinkThumb: drink.strDrinkThumb,
  };
}

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidEntry);
  } catch {
    return [];
  }
}

function writeStorage(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Storage unavailable (e.g. private mode) — keep working in memory.
  }
}

// Module-scope state: every component using useFavorites() shares one list,
// mirroring the pattern in useCocktails.js.
const favorites = ref(readStorage());

const favoriteIds = computed(
  () => new Set(favorites.value.map((item) => item.idDrink)),
);

function isFavorite(id) {
  return favoriteIds.value.has(id);
}

function toggleFavorite(drink) {
  if (!drink?.idDrink) return;

  const index = favorites.value.findIndex(
    (item) => item.idDrink === drink.idDrink,
  );

  if (index >= 0) {
    favorites.value.splice(index, 1);
  } else {
    favorites.value.unshift(toSnapshot(drink));
  }

  writeStorage(favorites.value);
}

export function useFavorites() {
  return { favorites, favoriteIds, isFavorite, toggleFavorite };
}
