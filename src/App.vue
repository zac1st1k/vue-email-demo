<template>
  <div id="app">
    <img class="app-logo" src="./assets/web-logo-pos-circle.svg">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.app-logo {
  height: 100px;
  margin-bottom: 64px;
}
</style>
