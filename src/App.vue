<template>
  <div id="app">
    <a href="#" @click="goToHome" class="home_page_link">Home</a>
    <router-view></router-view>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    
  },
  methods: {
    goToHome(){
      this.$router.push({
        name: "RecipeHome"
      })
    }
  }
}
</script>

<style>

* 
*:after,
*:before {
  box-sizing: border-box;
}

body {
  background-color: #eee;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #eee;
}

.home_page_link:visited,
.home_page_link:active
.home_page_link:link {
  text-decoration: none;
}
</style>
