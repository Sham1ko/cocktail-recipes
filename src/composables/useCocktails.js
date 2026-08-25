import { ref } from "vue";
import { searchCocktails } from "@/api/cocktailDb";

export function useCocktails() {
  const drinks = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  async function search(query) {
    isLoading.value = true;
    errorMessage.value = "";

    try {
      drinks.value = await searchCocktails(query.trim());
    } catch {
      drinks.value = [];
      errorMessage.value =
        "Что-то пошло не так при поиске. Попробуйте ещё раз позже.";
    } finally {
      isLoading.value = false;
    }
  }

  return { drinks, isLoading, errorMessage, search };
}
