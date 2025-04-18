<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 mb-4">
    <RouterLink :to="'/cocktail-recipes/' + drink.idDrink" class="card-link">
      <div class="card h-100 shadow-sm">
        <img
          :src="drink.strDrinkThumb"
          class="card-img-top"
          :alt="drink.strDrink"
        />
        <div class="card-body">
          <h5 class="card-title mb-0">{{ drink.strDrink }}</h5>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: ["drink"],
};
</script>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: block;
}

.card-link:hover .card {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
</style>
