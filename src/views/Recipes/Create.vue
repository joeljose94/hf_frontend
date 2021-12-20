<template>
  <div>
    <h2>Create A New Recipe</h2>
    <form>
      <label class="label" for="recipe_name">Recipe name:</label>
      <br />
      <input v-model="recipe.name" id="recipe_name" name="recipe_name" />
      <br />
      <label class="label" for="recipe_prep_time">Recipe Prep Time:</label>
      <br />
      <input
        v-model="recipe.prep_time"
        id="recipe_prep_time"
        name="recipe_prep_time"
      />
      <br />
      <label class="label" for="recipe_difficulty">Recipe Difficulty:</label>
      <br />
      <input type="radio" id="easy" value="Easy" v-model="recipe.difficulty" />
      <label class="label" for="recipe_difficulty">Easy</label>
      <br />
      <input
        type="radio"
        id="moderate"
        value="Moderate"
        v-model="recipe.difficulty"
      />
      <label class="label" for="recipe_difficulty">Moderate</label>
      <br />
      <input type="radio" id="hard" value="Hard" v-model="recipe.difficulty" />
      <label class="label" for="recipe_difficulty">Hard</label>
      <br />

      <!--  Ingredient Selector  -->
      <ingredient-selector @select="addIngredient" />
      <br />
      <!--  list of ingredients  -->  
      <recipe-ingredient-list :recipe="recipe" @remove="removeIngredient" />

      <br />
      <button type="button" @click="createRecipe">Create</button>
      <button class="cancel-btn" type="button" @click="cancelCreate">
        Cancel
      </button>
    </form>
  </div>
</template>
<script>
import { createRecipe } from "@/api/Recipe";
import IngredientSelector from "@/components/IngredientSelector";
import RecipeIngredientList from "@/components/RecipeIngredientList";
import _ from "lodash";

export default {
  components: {
    IngredientSelector,
    RecipeIngredientList,
  },
  data() {
    return {
      recipe: {
        difficulty: "Easy",
        instructions: null,
        name: "",
        nutitional_information: null,
        prep_time: "",
        recipe_ingredients: [],
        utensils: null,
      },
    };
  },
  methods: {
    createRecipe() {
      createRecipe(this.recipe)
        .then(() => this.$router.push({ name: "RecipeHome" }))
        .catch(() => {
          alert("Create Failed!");
        });
    },
    cancelCreate() {
      this.$router.push({ name: "RecipeHome" });
    },
    // removes ingredient from existing list when user hits remove ingredient
    removeIngredient(ingredientId) {
      this.recipe.recipe_ingredients = _.reject(
        this.recipe.recipe_ingredients,
        (recipe_ingredient) =>
          recipe_ingredient.ingredient.ingredient_id == ingredientId
      );
    },
    addIngredient(ingredientId, ingredient_name, qtyForSize2, qtyForSize4) {
      // event handler when user selects an ingredient from ingredient selector component
      let ingredient = {
        ingredient: {
          ingredient_id: ingredientId,
          ingredient_name: ingredient_name,
        },

        ingredient_qtys: [
          {
            qty: qtyForSize2,
            serving_amt: 2,
          },
          {
            qty: qtyForSize4,
            serving_amt: 4,
          },
        ],
      };
      this.recipe.recipe_ingredients.push(ingredient);
    },
  },
};
</script>
<style>
.label {
  margin-top: 10px;
  display: inline-block;
}
.cancel-btn {
  margin-left: 5px;
}
</style>