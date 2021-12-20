<template lang="">
    <div class="recipe">
      <h1>{{ recipe.name }}</h1>

      <div>
        <div>Prep Time: {{ recipe.prep_time }}</div>
        <div>Complexity: {{recipe.difficulty}} </div>
      </div> 

      <button @click="onEdit">Edit</button> 
      <button @click="removeRecord">Delete</button>
    </div>
</template>
<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onEdit() {
      this.$emit("edit", this.recipe);
    },
    removeRecord() {
      if (confirm("Are you sure?") == true) {
        this.$emit("delete", this.recipe);
      }
    },
  },
};
</script>
<style>
.recipe {
  color: orange;
  background: #fff;
  max-width: 250px;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 4px 5px 6px -2px rgba(0, 0, 0, 0.62);
}
</style>