<template>
    <div class="game-screen">
        <div>WASD to move</div>
        <div id="fps-display"></div>
        <canvas id="game-canvas" width="800" height="480" tabindex='1'/>
        <canvas id="foreground-canvas" width="800" height="480" z-index='2'/>
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
    canvas {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
    }
</style>