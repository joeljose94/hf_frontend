import VueRouter from "vue-router";
import RecipeList from "@/views/Recipes/List"
import RecipeEdit from "@/views/Recipes/Edit"
import RecipeCreate from "@/views/Recipes/Create"

const routes = [
    { path: '/', component: RecipeList },
    { path: '/recipes', name: "RecipeHome", component: RecipeList },
    { path: '/recipes/:id(\\d+)', name: "RecipeEdit", component: RecipeEdit },
    { path: '/recipes/create', name: "RecipeCreate", component: RecipeCreate }
];


const router = new VueRouter({
    routes, // short for `routes: routes`
    mode: "history",
    scrollBehavior: () => ({ y: 0 })
})


export default router;
