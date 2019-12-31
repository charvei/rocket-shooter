<template>
    <div class="app-header">
        <img class="header-logo" alt="Site logo" src="../assets/logo.png">
        <h1>
            Site
        </h1>
    </div>
</template>

<script>
    export default {
        name: 'AppHeader'
    }
</script>

<style scoped>
    .app-header {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .header-logo {
        height: 3em;
    }
</style>