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

// filter.php accepts a single parameter at a time; values use underscores
// instead of spaces (e.g. "Ordinary_Drink", "Non_Alcoholic").
const FILTER_PARAM = { category: "c", glass: "g", alcohol: "a" };

async function getListOptions(paramKey) {
  const json = await request("list.php", { [paramKey]: "list" });
  return (json.drinks ?? []).map((item) => Object.values(item)[0]);
}

export function getCategoryOptions() {
  return getListOptions("c");
}

export function getGlassOptions() {
  return getListOptions("g");
}

export function getAlcoholOptions() {
  return getListOptions("a");
}

// group must be one of: "category" | "glass" | "alcohol".
// Returns lightweight drink snapshots {idDrink, strDrink, strDrinkThumb},
// or an empty array when the API answers with drinks: null.
export async function getFilteredCocktails(group, label) {
  const paramKey = FILTER_PARAM[group];
  if (!paramKey) {
    throw new Error(`Unknown filter group: ${group}`);
  }

  const json = await request("filter.php", {
    [paramKey]: label.replaceAll(" ", "_"),
  });
  return json.drinks ?? [];
}
