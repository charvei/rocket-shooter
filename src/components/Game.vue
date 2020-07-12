<template>
    <div class="game-screen">
        <div>WASD to move</div>
        <div>space to shoot (proper physics to come)</div>
        <div id="fps-display"></div>
        <canvas id="game-canvas" width="1200" height="720" tabindex='1'/>
        <canvas id="foreground-canvas" width="1200" height="720" z-index='2'/>
    </div>
</template>

<script>
    import { main } from './game-dist/main.js'

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