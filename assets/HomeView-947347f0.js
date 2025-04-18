import{_ as l,r as _,o as i,c as d,a as p,w as k,b as t,t as u,d as h,v as w,F as f,e as v,n as b,f as g,p as x,g as C}from"./index-69a12787.js";const y={props:["drink"]},D={class:"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 mb-4"},j={class:"card h-100 shadow-sm"},I=["src","alt"],S={class:"card-body"},V={class:"card-title mb-0"};function $(e,s,a,m,c,n){const r=_("RouterLink");return i(),d("div",D,[p(r,{to:"/cocktail-recipes/"+a.drink.idDrink,class:"card-link"},{default:k(()=>[t("div",j,[t("img",{src:a.drink.strDrinkThumb,class:"card-img-top",alt:a.drink.strDrink},null,8,I),t("div",S,[t("h5",V,u(a.drink.strDrink),1)])])]),_:1},8,["to"])])}const B=l(y,[["render",$],["__scopeId","data-v-641042e4"]]);const L={components:{CocktailCard:B},data(){return{data:{drinks:[]},nameCocktail:""}},methods:{async getData(){const e=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.nameCocktail}`,s=await fetch(e);this.data=await s.json()},async randomCocktail(){const a=await(await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")).json();this.$router.push(`/cocktail-recipes/${a.drinks[0].idDrink}`)}}},F=e=>(x("data-v-53ad0dec"),e=e(),C(),e),H=F(()=>t("div",{class:"search-logo text-white fs-1 mb-4 fw-bold"},"Search Cocktail",-1)),N={class:"search-box w-100 w-md-75 px-3"},R={class:"input-group mb-3 shadow rounded overflow-hidden bg-white bg-opacity-75"},T={class:"row w-100 mt-4"};function z(e,s,a,m,c,n){const r=_("cocktail-card");return i(),d("main",{class:b(["container d-flex flex-column justify-content-center align-items-center text-center flex-grow-1",c.data.drinks.length>0?"has-results-padding":""])},[H,t("div",N,[t("div",R,[h(t("input",{type:"text",class:"form-control",placeholder:"Введите название коктейля","onUpdate:modelValue":s[0]||(s[0]=o=>c.nameCocktail=o)},null,512),[[w,c.nameCocktail]]),t("button",{onClick:s[1]||(s[1]=(...o)=>n.getData&&n.getData(...o)),class:"btn btn-success"},"🔍 Поиск"),t("button",{onClick:s[2]||(s[2]=(...o)=>n.randomCocktail&&n.randomCocktail(...o)),class:"btn btn-primary"}," 🎲 Рандом ")])]),t("div",T,[(i(!0),d(f,null,v(c.data.drinks,o=>(i(),g(r,{key:o.idDrink,drink:o,class:"col-12 col-sm-6 col-md-4 mb-4"},null,8,["drink"]))),128))])],2)}const M=l(L,[["render",z],["__scopeId","data-v-53ad0dec"]]);export{M as default};
