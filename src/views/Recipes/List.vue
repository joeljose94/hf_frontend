<template>
  <div>
    <div>
      <router-link to="/recipes/create">Create New Recipe</router-link>
    </div>
    <div class="recipe-list">
      <div :key="recipe.recipe_id" v-for="recipe in recipies">
        <recipe :recipe="recipe" @edit="gotoEdit" @delete="gotoRemove" />
      </div>
    </div>
  </div>
</template>
<script>
import { getRecipes, removeRecipe } from "@/api/Recipe";
import Recipe from "@/components/Recipe";

export default {
  components: {
    Recipe,
  },
  data() {
    return {
      recipies: [],
      page: 1,
      pageSize: 10,
    };
  },
  methods: {
    fetchRecepiesForCurrentPage() {
      getRecipes({ page: this.page, pageSize: this.pageSize }).then(
        ({ data }) => {
          this.recipies = data.recipe;
        }
      );
    },
    gotoEdit(recipe) {
      console.log("inside goto edit method", recipe);
      this.$router.push({
        name: "RecipeEdit",
        params: { id: recipe.recipe_id, recipe },
      });
    },
    gotoRemove(recipe) {
      removeRecipe(recipe.recipe_id)
        .then(() => {
          this.fetchRecepiesForCurrentPage();
        })
        .catch(() => {
          alert("delete failed");
        });
    },
  },
  // page load calls fetch to get updated recipe list
  created() {
    console.log("fetching new list");
    this.fetchRecepiesForCurrentPage();
  },
};
</script>
<style>
.recipe-list {
  display: flex;
  flex-wrap: wrap;
}

.recipe-list > * {
  margin: 20px;
}
</style>