<template>
  <header
    class="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <RouterLink
        :to="{ name: 'home' }"
        class="font-display text-lg font-bold tracking-wide text-white"
        @click="reset"
      >
        🍸 Cocktail Recipes
      </RouterLink>

      <button
        type="button"
        class="rounded-lg p-2 text-xl leading-none text-white transition hover:bg-white/10 md:hidden"
        :aria-expanded="isOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle navigation"
        @click="isOpen = !isOpen"
      >
        ☰
      </button>

      <ul class="hidden items-center gap-8 text-sm font-medium md:flex">
        <li>
          <RouterLink
            :to="{ name: 'home' }"
            class="text-white/80 transition hover:text-amber-400"
          >
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'favorites' }"
            class="inline-flex items-center gap-1.5 text-white/80 transition hover:text-amber-400"
          >
            ❤️ Favorites
            <span
              v-if="count > 0"
              class="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-gray-950"
            >
              {{ count }}
            </span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'explore' }"
            class="text-white/80 transition hover:text-amber-400"
          >
            🧭 Explore
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'about' }"
            class="text-white/80 transition hover:text-amber-400"
          >
            About
          </RouterLink>
        </li>
      </ul>
    </nav>

    <ul
      id="mobile-nav"
      v-show="isOpen"
      class="space-y-1 border-t border-white/10 px-4 py-3 text-sm font-medium md:hidden"
    >
      <li>
        <RouterLink
          :to="{ name: 'home' }"
          class="block rounded-lg px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-amber-400"
          @click="isOpen = false"
        >
          Home
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="{ name: 'favorites' }"
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-amber-400"
          @click="isOpen = false"
        >
          ❤️ Favorites
          <span
            v-if="count > 0"
            class="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-gray-950"
          >
            {{ count }}
          </span>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="{ name: 'explore' }"
          class="block rounded-lg px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-amber-400"
          @click="isOpen = false"
        >
          🧭 Explore
        </RouterLink>
      </li>
      <li>
        <RouterLink
          :to="{ name: 'about' }"
          class="block rounded-lg px-3 py-2 text-white/80 transition hover:bg-white/10 hover:text-amber-400"
          @click="isOpen = false"
        >
          About
        </RouterLink>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useCocktails } from "@/composables/useCocktails";
import { useFavorites } from "@/composables/useFavorites";

const { reset } = useCocktails();
const { favorites } = useFavorites();

const count = computed(() => favorites.value.length);

const isOpen = ref(false);
</script>
