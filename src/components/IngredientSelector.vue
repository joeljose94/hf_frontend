<template lang="">
    <div style="margin-top: 10px">
       <label for="ingredient_select">Choose an ingredient:</label>

       <br>

<!-- select drop down to select the ingredient-->
<select v-model="currentlySelectedIngredient" name="ingedient_select" id="ingredient_select">

  <option v-for="ingredient in ingredientsToShow" :key="ingredient.ingredient_id" :value="ingredient.ingredient_id">
      {{ingredient.ingredient_name}}
      </option>

</select>

<!-- qty required for serving size 2-->
<br>
For Serving size 2 : 
<input type=text v-model="qtyForServingSize2"/>




<!-- qty required for serving size 4-->
<br>
For Serving size 4 : 
<input type=text v-model="qtyForServingSize4"/>


<br>
 <button type="button" @click="addToIngredients"> Add to ingredients </button>
    </div>
</template>
<script>
import { getAllIngredients } from "@/api/Ingredient";
import _ from "lodash";

export default {
  props: {
    alreadySelectedIngredientIds: {
      type: Array,
      requird: false,
      default: () => [],
    },
  },
  data() {
    return {
      ingredients: [],
      currentlySelectedIngredient: null,
      selectedIngredients: [],
      qtyForServingSize2: "",
      qtyForServingSize4: "",
    };
  },
  computed: {
    ingredientsToShow() {
      // this is to remove the ingredient from the drop down list after its selected
      return _.reject(this.ingredients, (ingredient) =>
        this.selectedIngredients.includes(ingredient.ingredient_id)
      );
    },
    currentlySelectedIngredientName() {
      let selectedIngredient = _.find(
        this.ingredients,
        (ingredient) =>
          ingredient.ingredient_id === this.currentlySelectedIngredient
      );
      if (selectedIngredient) {
        return selectedIngredient.ingredient_name;
      }
      return "";
    },
  },
  created() {
    getAllIngredients()
      .then(({ data }) => (this.ingredients = data.ingredients))
      .catch(() => {
        console.log("error fetching ingredients");
      });
  },
  methods: {
    // user selects ingredient, emits ingredient details to parent
    addToIngredients() {
      this.selectedIngredients.push(this.currentlySelectedIngredient);
      this.$emit(
        "select",
        this.currentlySelectedIngredient,
        this.currentlySelectedIngredientName,
        this.qtyForServingSize2,
        this.qtyForServingSize4
      );
      this.resetSelection();
    },

    resetSelection() {
      this.currentlySelectedIngredient = null;
      this.qtyForServingSize2 = null;
      this.qtyForServingSize4 = null;
    },
  },
  // watches if the prop is changing and adds to prop
  watch: {
    alreadySelectedIngredientIds: {
      deep: true,
      immediate: true,
      handler() {
        this.selectedIngredients = _.cloneDeep(
          this.alreadySelectedIngredientIds
        );
      },
    },
  },
};
</script>
<style lang="">
</style>