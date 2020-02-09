<template>
  <div id="app">
    <AppHeader />
    <Game />  
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import Game from './components/Game.vue'

export default {
  name: 'app',
  components: {
    AppHeader,
    Game
  }
}
</script>

<style>
html {
  background-color:#1e2a36;
  color: azure;
  height: 100vh;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
