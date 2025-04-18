<template>
  <main
    class="about-view container d-flex flex-column justify-content-center align-items-center flex-fill"
  >
    <div class="about-card bg-light rounded p-4 shadow w-100 w-md-75">
      <h1 class="mb-4">🍹 About Cocktail Recipes</h1>
      <p>
        This is a simple Vue 3 + Vite web application where you can search for
        your favorite cocktails or get a random drink suggestion. Powered by the
        <a
          href="https://www.thecocktaildb.com/"
          target="_blank"
          rel="noopener noreferrer"
          >TheCocktailDB API</a
        >, the app offers clean UI and fast interactions for cocktail lovers.
      </p>
      <p>
        You can browse drink details, ingredients, and preparation steps in a
        clean and responsive interface.
      </p>
      <p>
        🔗 Check out the source code on
        <a
          href="https://github.com/sham1ko/cocktail-recipes"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub Repository</a
        >.
      </p>
      <p>
        🙋‍♂️ Created by
        <a
          href="https://github.com/sham1ko"
          target="_blank"
          rel="noopener noreferrer"
          >@sham1ko</a
        >
      </p>
    </div>
  </main>
</template>

<script setup>
// ничего не нужно
</script>

<style scoped>
.about-view {
  min-height: 100vh;
}

.about-card a {
  text-decoration: underline;
  color: #0d6efd;
}

.about-card a:hover {
  color: #0a58ca;
}
</style>
