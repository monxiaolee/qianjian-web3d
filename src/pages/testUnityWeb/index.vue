<template>
    <div class="unity-web__wrapper">
        <canvas id="unity-canvas" width=1920 height=1080 style="width: 1920px; height: 1080px; background: #231F20"></canvas>
    </div>
</template>
<script>

export default {
    data() {
        return {

        }
    },
    mounted() {
        var buildUrl = 'Build';
        var loaderUrl = buildUrl + '/WebGL.loader.js'
    }
}
</script>
<style lang="scss" scoped>
.unity-web__wrapper{
    width: 100%;
    height: 100%;
}
</style>