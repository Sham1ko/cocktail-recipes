import { ref } from "vue";
import { searchCocktails } from "@/api/cocktailDb";

const drinks = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");
const hasSearched = ref(false);

export function useCocktails() {
  async function search(query) {
    isLoading.value = true;
    hasSearched.value = true;
    errorMessage.value = "";

    try {
      drinks.value = await searchCocktails(query.trim());
    } catch {
      drinks.value = [];
      errorMessage.value =
        "Something went wrong while searching. Please try again later.";
    } finally {
      isLoading.value = false;
    }
  }

  function reset() {
    drinks.value = [];
    errorMessage.value = "";
    hasSearched.value = false;
  }

  return { drinks, isLoading, errorMessage, hasSearched, search, reset };
}
