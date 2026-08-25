<template>
  <main
    :class="[
      'container d-flex flex-column justify-content-center align-items-center text-center flex-grow-1',
      drinks.length > 0 ? 'has-results-padding' : '',
    ]"
  >
    <div class="search-logo text-white fs-1 mb-4 fw-bold">Search Cocktail</div>

    <div class="search-box w-100 w-md-75 px-3">
      <div
        class="input-group mb-3 shadow rounded overflow-hidden bg-white bg-opacity-75"
      >
        <input
          type="text"
          class="form-control"
          placeholder="Введите название коктейля"
          v-model="nameCocktail"
        />
        <button @click="getData" class="btn btn-success" :disabled="isLoading">
          <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm me-1"
            aria-hidden="true"
          ></span>
          🔍 Поиск
        </button>
        <button
          @click="randomCocktail"
          class="btn btn-primary"
          :disabled="isLoading"
        >
          🎲 Рандом
        </button>
      </div>
    </div>

    <div
      v-if="errorMessage"
      class="alert alert-danger w-100 w-md-75"
      role="alert"
    >
      {{ errorMessage }}
    </div>
    <div
      v-else-if="hasSearched && !isLoading && drinks.length === 0"
      class="alert alert-warning w-100 w-md-75"
      role="alert"
    >
      😕 Ничего не найдено. Попробуйте другое название коктейля.
    </div>

    <div class="row w-100 mt-4">
      <cocktail-card
        v-for="item in drinks"
        :key="item.idDrink"
        :drink="item"
        class="col-12 col-sm-6 col-md-4 mb-4"
      />
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
const { drinks, isLoading, errorMessage, search } = useCocktails();

const nameCocktail = ref("");
const hasSearched = ref(false);

async function getData() {
  hasSearched.value = true;
  await search(nameCocktail.value);
}

async function randomCocktail() {
  const randomDrink = await getRandomCocktail();
  router.push({ name: "details", params: { id: randomDrink.idDrink } });
}
</script>

<style scoped>
.search-logo {
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
}

.search-box input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: none;
}

.search-box button {
  min-width: 100px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.search-box button:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
    gap: 0.5rem;
    border-radius: 0.5rem;
  }

  .input-group input {
    border-radius: 0.5rem !important;
  }

  .search-box button {
    width: 100%;
  }
}

.has-results-padding {
  padding-top: 60px; /* высота хедера */
}
</style>
