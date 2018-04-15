<template>
  <div id="app" class="container">
    <div class="card">
      <div class="logo-container">
        <img class="site-minder-logo" src="./assets/web-logo-pos-circle.svg">
        <img class="site-minder-text" src="./assets/web-logo-text.svg">
      </div>
      <router-view/>
    </div>
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
.logo-container {
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.site-minder-logo {
  width: 100px;
  margin-bottom: 16px;
}
.site-minder-text {
  width: 150px;
}
</style>
