<template>
    <div class = "playground">
        <GameMap />
    </div>
</template>

<script>
import GameMap from '@/components/GameMap.vue';

export default {
    components: {
        GameMap,
    }
}

</script>

<style scoped>
div.playground {
    width: 60vw;
    height: 70vh;
    /* background: rgb(31, 76, 121); */
    margin: 40px auto;
}
</style>



