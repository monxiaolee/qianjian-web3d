<template>
<div class="scene01-wrapper">
    <canvas class="webgl"></canvas>
</div>
</template>
<script>
import Experience from './Experience/Experience.js'
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        const experience = new Experience(document.querySelector('canvas.webgl'))
    }
}
</script>
<style lang="scss" scoped>
.scene01-wrapper {
    width: 100%;
    height: 100%;
    .webgl {
        width: 100%;
        height: 100%;
    }
}
</style>