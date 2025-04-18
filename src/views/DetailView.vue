<template>
  <main
    class="details-view container d-flex flex-column justify-content-center align-items-center flex-grow-1"
  >
    <div v-if="drink" class="row bg-light rounded shadow overflow-hidden">
      <!-- Image -->
      <div
        class="col-12 col-md-6 p-4 d-flex justify-content-center align-items-center"
      >
        <img
          :src="drink.strDrinkThumb"
          class="img-fluid rounded border"
          :alt="drink.strDrink"
        />
      </div>

      <!-- Info -->
      <div class="col-12 col-md-6 p-4">
        <h2 class="fw-bold mb-3">{{ drink.strDrink }}</h2>

        <p><strong>Category:</strong> {{ drink.strCategory }}</p>
        <p><strong>Alcoholic:</strong> {{ drink.strAlcoholic }}</p>
        <p><strong>Glass type:</strong> {{ drink.strGlass }}</p>

        <h4 class="mt-4">🧪 Ingredients</h4>
        <ul class="list-unstyled">
          <li
            v-for="(ingredient, index) in ingredients"
            :key="index"
            class="mb-1"
          >
            - {{ ingredient.name
            }}<span v-if="ingredient.measure"> — {{ ingredient.measure }}</span>
          </li>
        </ul>

        <h4 class="mt-4">📋 Instructions</h4>
        <p>{{ drink.strInstructions }}</p>

        <div
          v-if="drink.strImageSource || drink.strImageAttribution"
          class="mt-4 small text-muted"
        >
          <p v-if="drink.strImageSource">
            📷 Image source:
            <a :href="drink.strImageSource" target="_blank">{{
              drink.strImageSource
            }}</a>
          </p>
          <p v-if="drink.strImageAttribution">
            📎 Attribution: {{ drink.strImageAttribution }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      drink: null,
    };
  },
  computed: {
    ingredients() {
      if (!this.drink) return [];
      const list = [];

      for (let i = 1; i <= 15; i++) {
        const name = this.drink[`strIngredient${i}`];
        const measure = this.drink[`strMeasure${i}`];
        if (name) {
          list.push({ name, measure });
        }
      }

      return list;
    },
  },
  mounted() {
    this.getDetailCocktail();
  },
  methods: {
    async getDetailCocktail() {
      const id = this.$route.params.id;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const json = await response.json();
      this.drink = json.drinks?.[0] || null;
    },
  },
};
</script>

<style scoped>
.details-view {
  min-height: 100vh;
  padding-top: 60px;
}

img {
  max-height: 400px;
  object-fit: cover;
}

ul {
  padding-left: 1rem;
}
</style>
