<template>
    <div class="game-screen">
        <h1>Game</h1>
        <canvas id="game-canvas" width="800" height="480" tabindex='1'>
        </canvas>
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

    //typescript accessing the canvas goes here
    
</script>

<style scoped>

</style>