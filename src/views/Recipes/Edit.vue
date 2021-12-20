<template lang="">
<div>
 <h2>Edit Recipe</h2>
    <form>
  <label for="recipe_name">Recipe name:</label>
  <input v-model="recipeToModify.name" type="text" id="recipe_name" name="recipe_name"><br><br>
 <br />
      <label class="label" for="recipe_prep_time">Recipe Prep Time:</label>
      <br />
      <input
        v-model="recipeToModify.prep_time"
        id="recipe_prep_time"
        name="recipe_prep_time"
      />
      <br />
      <label class="label" for="recipe_difficulty">Recipe Difficulty:</label>
      <br />
      <input type="radio" id="easy" value="Easy" v-model="recipeToModify.difficulty" />
      <label class="label" for="recipe_difficulty">Easy</label>
      <br />
      <input
        type="radio"
        id="moderate"
        value="Moderate"
        v-model="recipeToModify.difficulty"
      />
      <label class="label" for="recipe_difficulty">Moderate</label>
      <br />
      <input type="radio" id="hard" value="Hard" v-model="recipeToModify.difficulty" />
      <label class="label" for="recipe_difficulty">Hard</label>
      <br />


      <!--  Ingredient Selector  -->
      <ingredient-selector @select="addIngredient" :alreadySelectedIngredientIds="selectedIngredientIds"   />
      <br />

    <!--  Ingredient List  -->
      <recipe-ingredient-list :recipe="recipeToModify" @remove="removeIngredient"/>

        <br/>

    <button type="button" @click="editRecipe"> Submit </button>
    <button type="button" @click="cancelEdit"> Cancel </button>

</form>
</div>
</template>
<script>
import _ from "lodash";
import { getRecipeById, editRecipe } from "@/api/Recipe";
import IngredientSelector from "@/components/IngredientSelector";
import RecipeIngredientList from "@/components/RecipeIngredientList";

export default {
  props: {
    // recipe: {
    //   type: Object,
    //   required: false,
    // },
  },
  components: {
    IngredientSelector,
    RecipeIngredientList,
  },
  data() {
    return {
      // will only modify in edit a temporary place holder
      // so that if user cancels the edit, the original object is not changed
      recipeToModify: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },

    recipe() {
      return this.$route.params.recipe;
    },

    //returns ingredient ids to recipeto modify
    selectedIngredientIds() {
      return _.map(
        this.recipeToModify.recipe_ingredients,
        (recipe_ingredient) => recipe_ingredient.ingredient.ingredient_id
      );
    },
  },
  methods: {
    editRecipe() {
      editRecipe(this.id, this.recipeToModify)
        .then(() => this.$router.push({ name: "RecipeHome" }))
        .catch(() => {
          alert("Not updated!");
        });
    },
    cancelEdit() {
      this.$router.push({ name: "RecipeHome" });
    },

    //removes ingredient from the the current recipe
    removeIngredient(ingredientId) {
      this.recipeToModify.recipe_ingredients = _.reject(
        this.recipeToModify.recipe_ingredients,
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
      this.recipeToModify.recipe_ingredients.push(ingredient);
    },
  },
  // finds recipe object when page is indirectly loaded 
  async created() {
    if (!this.recipe) {
      try {
        let response = await getRecipeById(this.id);
        this.recipeToModify = response.data.recipe;
      } catch (e) {
        alert("Cannot find recipe!");
      }

      console.log(this.recipeToModify);
    } else {
      this.recipeToModify = _.cloneDeep(this.recipe);
    }
  },
  watch: {
    recipeToModify: {
      deep: true,
      handler(newVal, oldVal) {
        console.log("watcher for recipe to modify", newVal, oldVal);
      },
    },
  },
};
</script>
<style lang="">
</style>