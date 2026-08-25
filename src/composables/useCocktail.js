import { ref } from "vue";
import { getCocktailById } from "@/api/cocktailDb";

export function useCocktail() {
  const drink = ref(null);
  const isLoading = ref(false);
  const errorMessage = ref("");

  async function load(id) {
    isLoading.value = true;
    errorMessage.value = "";

    try {
      drink.value = await getCocktailById(id);
      if (!drink.value) {
        errorMessage.value = "Cocktail not found.";
      }
    } catch {
      drink.value = null;
      errorMessage.value =
        "Failed to load cocktail details. Please try again later.";
    } finally {
      isLoading.value = false;
    }
  }

  return { drink, isLoading, errorMessage, load };
}
