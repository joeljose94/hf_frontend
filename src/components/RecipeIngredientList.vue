<template lang="">
    <div>
        <!-- {{selectedIngredients}} -->

        <div style="margin-top: 10px" :key="ingredient.ingredient.ingredient_id" v-for="ingredient in selectedIngredients">
            <!-- {{ingredient}} -->
            <div>Ingredient: {{ingredient.ingredient.ingredient_name}}</div>
            <div>Qty for 2 : {{ingredient.ingredient_qtys[0].qty}}
            </div>
            <div>Qty for 4 : {{ingredient.ingredient_qtys[1].qty}}
            </div>
            <div><button type="button" @click="removeIngredient(ingredient)">Remove</button></div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    // ingredients: {
    //     type: Array,
    //     required: false,
    //     default: () => []
    // }
  },
  data() {
    return {
      ingredientsList: [],
    };
  },
  computed: {
    selectedIngredients() {
      return this.recipe.recipe_ingredients;
    },
  },

  methods: {
    removeIngredient(ingredient) {
      this.$emit("remove", ingredient.ingredient.ingredient_id);
    },
  }
};
</script>
<style lang="">
</style>