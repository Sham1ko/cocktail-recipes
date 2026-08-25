const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

async function request(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TheCocktailDB request failed: HTTP ${response.status}`);
  }
  return response.json();
}

export async function searchCocktails(name) {
  const json = await request("search.php", { s: name });
  return json.drinks ?? [];
}

export async function getRandomCocktail() {
  const json = await request("random.php");
  return json.drinks[0];
}

export async function getCocktailById(id) {
  const json = await request("lookup.php", { i: id });
  return json.drinks?.[0] || null;
}
