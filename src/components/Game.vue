<template>
    <div class="game-screen">
        <h1>Game</h1>
        <canvas id="game-canvas" width="800" height="480" tabindex='1'/>
        <div id="fps-display"></div>
    </div>
</template>

<script>
    import { main } from './game/main.js'

    export default {
        name: 'Game',
        mounted() {
            main()
        }
    }    
</script>

<style scoped>
    
</style>