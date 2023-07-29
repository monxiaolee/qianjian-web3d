<template>
    <div class="unity-web__wrapper">
        <iframe width="100%" height="100%" frameborder="none" scrolling="no" src="http://127.0.0.1"></iframe>
    </div>
</template>
<script>

export default {
    data() {
        return {

        }
    },
    mounted() {
        window.addEventListener('fn', this.unityWatch)
    },
    methods: {
        unityWatch(e) {
            console.log('-------', e)
        }
    }
    
}
</script>
<style lang="scss" scoped>
.unity-web__wrapper{
    width: 1920px;
    height: 1080px;
}
</style>